import React, { useContext, useEffect, useState } from "react";
import ResumePreview from "@/components/ResumePreview";
import PersonalDetails from "@/components/PersonalDetails";
import WorkExperience from "@/components/WorkExperience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import { Card } from "@/components/ui/card";
import Extracurriculars from "@/components/Extracurriculars";
import MyPdf from "@/PdfFile/MyPdf";
import PdfParser from "@/components/PdfParser";
import Certifications from "@/components/Certifications";
import { UserContext } from "@/context/UserContext";
import toast from "react-hot-toast";

const TABS = [
    "Personal",
    "Experience",
    "Education",
    "Skills",
    "Projects",
    "ExtraCurricular",
    "Certifications",
];

function Layout({ isCustom = false }) {
    const [activeTab, setActiveTab] = useState("Personal");
    const [selectedTemplate, setSelectedTemplate] =
        useState("modernProfessional");
    const [previewMode, setPreviewMode] = useState(false);
    const { userData, setUserData } = useContext(UserContext);
    const [errors, setErrors] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const localUserData = localStorage.getItem("userData");
        if (localUserData) {
            try {
                const parsedData = JSON.parse(localUserData);
                setUserData(parsedData);
            } catch (error) {
                console.error(
                    "Error parsing user data from localStorage:",
                    error
                );
            }
        }
    }, [setUserData]);

    const renderTabContent = () => {
        switch (activeTab) {
            case "Personal":
                return <PersonalDetails isCustom={isCustom} />;
            case "Experience":
                return <WorkExperience isCustom={isCustom} />;
            case "Education":
                return <Education isCustom={isCustom} />;
            case "Skills":
                return <Skills isCustom={isCustom} />;
            case "Projects":
                return <Projects isCustom={isCustom} />;
            case "ExtraCurricular":
                return <Extracurriculars isCustom={isCustom} />;
            case "Certifications":
                return <Certifications isCustom={isCustom} />;
            default:
                return null;
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!userData.name.trim()) {
            newErrors.name = "Full Name is required";
        }

        if (!userData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!userData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(userData.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        if (!userData.linkedIn.trim()) {
            newErrors.linkedIn = "LinkedIn profile is required";
        }

        if (!userData.location.trim()) {
            newErrors.location = "City is required";
        }

        if (!userData.summary.trim()) {
            newErrors.summary = "Summary is required";
        }

        return newErrors;
    };

    const handleSave = () => {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            toast.error("Please fix validation errors before saving.");
            return;
        }
        try {
            localStorage.setItem("userData", JSON.stringify(userData));
            toast.success("User data saved successfully!");
        } catch (err) {
            console.error("Failed to save:", err);
        }
    };

    const togglePreviewMode = () => {
        setPreviewMode(!previewMode);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Mobile Preview Toggle */}
                {isMobile && (
                    <div className="mb-4 flex justify-center">
                        <button
                            onClick={togglePreviewMode}
                            className="shadow-[3px_3px_0_black] text-[#371A70] hover:bg-yellow-300 border px-4 py-2 font-semibold text-sm bg-white transition cursor-pointer"
                        >
                            {previewMode ? "Show Editor" : "Show Preview"}
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form Panel */}
                    <div
                        className={`${previewMode && isMobile ? "hidden" : ""}`}
                    >
                        <Card className="p-4 sm:p-6">
                            {/* Template Selector */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex flex-row items-center gap-2 sm:gap-4">
                                    {/* Template Selector */}
                                    <div className="flex items-center gap-2">
                                        <label
                                            htmlFor="templateSelect"
                                            className="text-sm sm:text-base font-semibold text-gray-800 whitespace-nowrap"
                                        >
                                            Template:
                                        </label>
                                        <select
                                            id="templateSelect"
                                            value={selectedTemplate}
                                            onChange={(e) =>
                                                setSelectedTemplate(
                                                    e.target.value
                                                )
                                            }
                                            className={`min-w-[120px] shadow-[2px_2px_0_black] sm:shadow-[3px_3px_0_black] 
                 text-[#371A70] hover:bg-yellow-300 px-3 py-1 sm:px-4 sm:py-2 
                 font-semibold text-sm sm:text-base bg-white transition cursor-pointer`}
                                        >
                                            <option value="modernProfessional">
                                                Professional
                                            </option>
                                            <option value="modern">
                                                Modern
                                            </option>
                                            <option value="classic">
                                                Classic
                                            </option>
                                            <option value="simple">
                                                Simple
                                            </option>
                                        </select>
                                    </div>

                                    {/* PDF Download Button */}
                                    <div className="flex-shrink-0">
                                        <MyPdf
                                            isCustom={isCustom}
                                            selectedTemplate={selectedTemplate}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <PdfParser isCustom={isCustom} />
                            </div>

                            {/* Tabs */}
                            <div
                                className="flex overflow-x-auto space-x-2 border-b pb-2 mb-4 mt-4"
                                style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                }}
                            >
                                <style jsx>{`
                                    div::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}</style>

                                {TABS.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-3 py-2 rounded-t-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                                            activeTab === tab
                                                ? "bg-white border border-b-0 border-gray-300 text-black"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="bg-gray-50 border rounded-md p-4 sm:p-6">
                                {renderTabContent()}
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="submit"
                                    onClick={handleSave}
                                    className="cursor-pointer shadow-[3px_3px_0_black] text-[#371A70] bg-[#FFD21F] px-4 py-2 font-semibold hover:bg-yellow-300 transition"
                                >
                                    Save
                                </button>
                            </div>
                        </Card>
                    </div>

                    {/* Preview Panel */}
                    <div
                        className={`${
                            !previewMode && isMobile ? "hidden" : ""
                        }`}
                    >
                        <Card className="p-2 sm:p-6 flex justify-center items-start overflow-auto">
                            <div
                                className="w-full"
                                style={{
                                    maxWidth: "794px",
                                    height: isMobile ? "auto" : "1123px",
                                    transform: isMobile
                                        ? "scale(1)"
                                        : "scale(0.8)",
                                    transformOrigin: "top left",
                                }}
                            >
                                <ResumePreview
                                    selectedTemplate={selectedTemplate}
                                    isCustom={isCustom}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
