import React, { useContext, useEffect, useState } from "react";
import { CustomUserContext } from "../context/CustomUserContext";
import WorkExperience from "../components/WorkExperience";
import Projects from "../components/Projects";
import Education from "../components/Education";
import MyPdf from "../PdfFile/MyPdf";
import Extracurriculars from "../components/Extracurriculars";
import Certifications from "../components/Certifications";
import PersonalDetails from "../components/PersonalDetails";
import Skills from "../components/Skills";
import toast from "react-hot-toast";
import { geminiHelper } from "@/utils/geminiHelper";
import Layout from "@/layout/Layout";

function CustomJob() {
    const [input, setInput] = useState("");
    const [errors, setErrors] = useState({});
    const [improvementSummary, setImprovementSummary] = useState("");
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { setCustomUserData, customUserData } = useContext(CustomUserContext);

    useEffect(() => {
        const data = localStorage.getItem("userData");
        if (data) {
            try {
                setUserData(JSON.parse(data));
            } catch (e) {
                console.error("Failed to parse userData", e);
            }
        }
    }, []);

    const customPrompt = `
        Analyze the job description and my resume. Return two things:
        1. A brief summary of the key improvements made to my resume (as plain text).
        2. The improved resume in JSON format.
        Respond in the following format:

        <ImprovementSummary>
        ...summary here...
        </ImprovementSummary>

        <ImprovedResumeJSON>
        ...JSON here...
        </ImprovedResumeJSON>
    `;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setImprovementSummary("");

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setIsLoading(false);
            return;
        }

        try {
            const query = `${customPrompt}\nResume: ${JSON.stringify(
                userData
            )}\nJob Description: ${input.trim()}`;

            const response = await geminiHelper(query);

            let rawText = response.text;

            // Improved parsing logic
            const extractFromResponse = (text) => {
                // Try to extract between XML-like tags first
                const summaryMatch = text.match(
                    /<ImprovementSummary>([\s\S]*?)<\/ImprovementSummary>/i
                );
                const jsonMatch = text.match(
                    /<ImprovedResumeJSON>([\s\S]*?)<\/ImprovedResumeJSON>/i
                );

                // Fallback to looking for JSON directly
                const jsonStart = text.indexOf("{");
                const jsonEnd = text.lastIndexOf("}") + 1;

                return {
                    summary:
                        summaryMatch?.[1]?.trim() ||
                        "Improvement summary not available",
                    json:
                        jsonMatch?.[1]?.trim() ||
                        (jsonStart !== -1
                            ? text.slice(jsonStart, jsonEnd)
                            : null),
                };
            };

            const { summary, json } = extractFromResponse(rawText);
            setImprovementSummary(summary);

            if (json) {
                try {
                    // Clean JSON string
                    const cleanedJson = json
                        .replace(/```json/g, "")
                        .replace(/```/g, "")
                        .trim();

                    const parsed = JSON.parse(cleanedJson);
                    setCustomUserData(parsed);
                    toast.success("Enhanced resume saved successfully!");
                    setIsLoading(false);
                    //alert("Enhanced resume saved successfully!");
                } catch (jsonError) {
                    console.error("JSON parsing error:", jsonError);
                    toast.error(
                        "We received your enhanced resume but had trouble formatting it. The summary is available above."
                    );
                }
            } else {
                toast.error("No valid resume data found in the response.");
            }
        } catch (err) {
            console.error("AI/Parsing error:", err);
            toast.error(
                "An error occurred while processing your request. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!input.trim()) {
            newErrors.input = "Please enter job description.";
        }
        return newErrors;
    };


    return (
        <div className="flex justify-center items-center mt-10 mb-10 flex-col">
            <div className="container mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row gap-8">
                {/* Left Side: Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full md:w-1/2 space-y-6"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Custom Job Description
                    </h1>

                    <textarea
                        className="w-full min-h-[200px] resize-none rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Paste your job description here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    {errors.input && (
                        <p className="text-sm text-red-600">{errors.input}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="p-2 w-full bg-violet-600 outline-1 outline-offset-[-1px] inline-flex justify-center items-center gap-2.5 border-black text-white text-sm font-semibold shadow-[3px_3px_0_black] cursor-pointe"
                    >
                        {isLoading
                            ? "Processing..."
                            : "Generate Enhanced Resume"}
                    </button>
                </form>

                {/* Right Side: Output */}
                <div className="w-full md:w-1/2">
                    {improvementSummary ? (
                        <div className="rounded-md border-l-4 border-blue-500 bg-blue-50 p-6 shadow-sm">
                            <h2 className="mb-3 text-lg font-semibold text-blue-800">
                                Key Improvements:
                            </h2>
                            <p className="whitespace-pre-wrap text-sm text-blue-700">
                                {improvementSummary}
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full min-h-[200px] text-gray-500 text-sm bg-gray-50 border border-dashed border-gray-300 rounded-md p-6">
                            No improvements yet. Paste a job description and
                            click "Generate Enhanced Resume".
                        </div>
                    )}
                </div>
            </div>

            <Layout isCustom={true}/>
            {/* {customUserData && (
                <div className="w-200">
                    <PersonalDetails isCustom={true} />
                    <hr />
                    <WorkExperience isCustom={true} />
                    <hr />

                    <Projects isCustom={true} />

                    <hr />

                    <Education isCustom={true} />

                    <hr />
                    <Skills isCustom={true} />

                    <hr />
                    <Certifications isCustom={true} />
                    <hr />

                    <Extracurriculars isCustom={true} />
                </div>
            )} */}
        </div>
    );
}

export default CustomJob;
