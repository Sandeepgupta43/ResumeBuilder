import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CustomUserContext } from "../context/CustomUserContext";
import { UseUserData } from "./UseUserData";

const WorkExperience = ({ isCustom = false }) => {
    const { userData, setUserData } = UseUserData(isCustom);
    const [workExpBulSize, setWorkExpBulSize] = useState([]);

    // Initialize work experience from userData
    useEffect(() => {
        if (userData.workExperience && userData.workExperience.length > 0) {
            setWorkExpBulSize(
                userData.workExperience.map((exp) =>
                    exp.bullets ? exp.bullets.length : 0
                )
            );
        }
    }, [userData.workExperience]);

    // Handle work experience changes
    const handleWorkExpChange = (index, field, value) => {
        const updatedWorkExp = [...userData.workExperience];
        updatedWorkExp[index] = {
            ...updatedWorkExp[index],
            [field]: value,
        };
        setUserData((prev) => ({
            ...prev,
            workExperience: updatedWorkExp,
        }));
    };

    // Handle bullet point changes
    const handleBulletChange = (expIndex, bulletIndex, value) => {
        const updatedWorkExp = [...userData.workExperience];
        const updatedBullets = [...updatedWorkExp[expIndex].bullets];
        updatedBullets[bulletIndex] = value;

        updatedWorkExp[expIndex] = {
            ...updatedWorkExp[expIndex],
            bullets: updatedBullets,
        };

        setUserData((prev) => ({
            ...prev,
            workExperience: updatedWorkExp,
        }));
    };

    // Add new work experience
    const addWorkExperience = () => {
        setWorkExpBulSize((prev) => [...prev, 0]);
        setUserData((prev) => ({
            ...prev,
            workExperience: [
                ...prev.workExperience,
                {
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    currentlyWorking: false,
                    location: "",
                    bullets: [],
                },
            ],
        }));
    };

    // Remove work experience
    const removeWorkExperience = (index) => {
        setWorkExpBulSize((prev) => prev.filter((_, i) => i !== index));
        setUserData((prev) => ({
            ...prev,
            workExperience: prev.workExperience.filter((_, i) => i !== index),
        }));
    };

    // Add bullet point
    const addBulletPoint = (expIndex) => {
        setWorkExpBulSize((prev) => {
            const newBullets = [...prev];
            newBullets[expIndex] += 1;
            return newBullets;
        });

        setUserData((prev) => {
            const updatedWorkExp = [...prev.workExperience];
            updatedWorkExp[expIndex] = {
                ...updatedWorkExp[expIndex],
                bullets: [...updatedWorkExp[expIndex].bullets, ""],
            };
            return {
                ...prev,
                workExperience: updatedWorkExp,
            };
        });
    };

    // Remove bullet point
    const removeBulletPoint = (expIndex, bulletIndex) => {
        setWorkExpBulSize((prev) => {
            const newBullets = [...prev];
            newBullets[expIndex] -= 1;
            return newBullets;
        });

        setUserData((prev) => {
            const updatedWorkExp = [...prev.workExperience];
            updatedWorkExp[expIndex] = {
                ...updatedWorkExp[expIndex],
                bullets: updatedWorkExp[expIndex].bullets.filter(
                    (_, i) => i !== bulletIndex
                ),
            };
            return {
                ...prev,
                workExperience: updatedWorkExp,
            };
        });
    };

    // Move bullet point up
    const moveBulletUp = (expIndex, bulletIndex) => {
        if (bulletIndex === 0) return; // Can't move first item up

        setUserData((prev) => {
            const updatedWorkExp = [...prev.workExperience];
            const bullets = [...updatedWorkExp[expIndex].bullets];

            // Swap current bullet with previous one
            [bullets[bulletIndex - 1], bullets[bulletIndex]] = [
                bullets[bulletIndex],
                bullets[bulletIndex - 1],
            ];

            updatedWorkExp[expIndex] = {
                ...updatedWorkExp[expIndex],
                bullets,
            };

            return {
                ...prev,
                workExperience: updatedWorkExp,
            };
        });
    };

    // Move bullet point down
    const moveBulletDown = (expIndex, bulletIndex) => {
        const bullets = userData.workExperience[expIndex].bullets;
        if (bulletIndex === bullets.length - 1) return; // Can't move last item down

        setUserData((prev) => {
            const updatedWorkExp = [...prev.workExperience];
            const bullets = [...updatedWorkExp[expIndex].bullets];

            // Swap current bullet with next one
            [bullets[bulletIndex], bullets[bulletIndex + 1]] = [
                bullets[bulletIndex + 1],
                bullets[bulletIndex],
            ];

            updatedWorkExp[expIndex] = {
                ...updatedWorkExp[expIndex],
                bullets,
            };

            return {
                ...prev,
                workExperience: updatedWorkExp,
            };
        });
    };

    return (
        <div className="mt-6 sm:mt-8">
            <h2 className="font-semibold text-gray-900 text-lg sm:text-xl mb-4 sm:mb-6">
                Work Experience
            </h2>

            {/* Work Experience List */}
            {userData.workExperience?.map((exp, expIndex) => (
                <div
                    className="border border-gray-300 rounded-lg p-4 sm:p-6 mt-4"
                    key={expIndex}
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-x-6 sm:gap-y-8">
                        {/* Company Name */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`company-name-${expIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Company Name
                            </label>
                            <input
                                id={`company-name-${expIndex}`}
                                name="company"
                                type="text"
                                value={exp.company || ""}
                                onChange={(e) =>
                                    handleWorkExpChange(
                                        expIndex,
                                        "company",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* Role Title */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`role-title-${expIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Role Title
                            </label>
                            <input
                                id={`role-title-${expIndex}`}
                                name="role"
                                type="text"
                                value={exp.role || ""}
                                onChange={(e) =>
                                    handleWorkExpChange(
                                        expIndex,
                                        "role",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* Start Date */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`start-date-${expIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Start Date
                            </label>
                            <input
                                id={`start-date-${expIndex}`}
                                name="startDate"
                                type="month"
                                value={exp.startDate || ""}
                                onChange={(e) =>
                                    handleWorkExpChange(
                                        expIndex,
                                        "startDate",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* End Date */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`end-date-${expIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                End Date
                            </label>
                            <input
                                id={`end-date-${expIndex}`}
                                name="endDate"
                                type="month"
                                value={
                                    exp.currentlyWorking
                                        ? ""
                                        : exp.endDate || ""
                                }
                                onChange={(e) =>
                                    handleWorkExpChange(
                                        expIndex,
                                        "endDate",
                                        e.target.value
                                    )
                                }
                                disabled={exp.currentlyWorking}
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                            <div className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    id={`current-${expIndex}`}
                                    name="currentlyWorking"
                                    checked={exp.currentlyWorking || false}
                                    onChange={(e) =>
                                        handleWorkExpChange(
                                            expIndex,
                                            "currentlyWorking",
                                            e.target.checked
                                        )
                                    }
                                    className="mr-2 h-4 w-4"
                                />
                                <label
                                    htmlFor={`current-${expIndex}`}
                                    className="text-sm sm:text-base text-gray-700"
                                >
                                    Currently work here
                                </label>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`location-${expIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Location
                            </label>
                            <input
                                id={`location-${expIndex}`}
                                name="location"
                                type="text"
                                value={exp.location || ""}
                                onChange={(e) =>
                                    handleWorkExpChange(
                                        expIndex,
                                        "location",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="mt-4 sm:mt-6">
                        <label className="block text-base sm:text-lg font-medium text-gray-900 mb-2">
                            Bullet Points
                        </label>

                        {exp.bullets?.map((bullet, bulletIndex) => (
                            <div
                                key={bulletIndex}
                                className="flex items-start gap-2 mb-3"
                            >
                                <textarea
                                    className="flex-1 min-h-[80px] border bg-white px-3 py-2 text-sm sm:text-base rounded-md border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                                    placeholder="Enter a bullet point"
                                    rows="3"
                                    value={bullet}
                                    onChange={(e) =>
                                        handleBulletChange(
                                            expIndex,
                                            bulletIndex,
                                            e.target.value
                                        )
                                    }
                                />
                                <div className="flex flex-col gap-1">
                                    <button
                                        className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 p-2 border border-gray-300 bg-white hover:bg-gray-50 ${
                                            bulletIndex === 0
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                        type="button"
                                        onClick={() =>
                                            moveBulletUp(expIndex, bulletIndex)
                                        }
                                        disabled={bulletIndex === 0}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <path d="m5 12 7-7 7 7"></path>
                                            <path d="M12 19V5"></path>
                                        </svg>
                                    </button>
                                    <button
                                        className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 p-2 border border-gray-300 bg-white hover:bg-gray-50 ${
                                            bulletIndex ===
                                            exp.bullets.length - 1
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                        type="button"
                                        onClick={() =>
                                            moveBulletDown(
                                                expIndex,
                                                bulletIndex
                                            )
                                        }
                                        disabled={
                                            bulletIndex ===
                                            exp.bullets.length - 1
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <path d="M12 5v14"></path>
                                            <path d="m19 12-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <button
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 p-2 border border-gray-300 bg-white hover:bg-gray-50"
                                        type="button"
                                        onClick={() =>
                                            removeBulletPoint(
                                                expIndex,
                                                bulletIndex
                                            )
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            <line
                                                x1="10"
                                                x2="10"
                                                y1="11"
                                                y2="17"
                                            ></line>
                                            <line
                                                x1="14"
                                                x2="14"
                                                y1="11"
                                                y2="17"
                                            ></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            className="mt-3 sm:mt-4 inline-flex items-center justify-center rounded-md text-sm sm:text-base font-medium px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 w-full sm:w-auto"
                            type="button"
                            onClick={() => addBulletPoint(expIndex)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 mr-2"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M8 12h8"></path>
                                <path d="M12 8v8"></path>
                            </svg>
                            Add Bullet Point
                        </button>
                    </div>

                    {/* Remove Experience Button */}
                    <div className="mt-4 sm:mt-6 text-right">
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm sm:text-base font-medium px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 w-full sm:w-auto"
                            type="button"
                            onClick={() => removeWorkExperience(expIndex)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 mr-2"
                            >
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                <line x1="10" x2="10" y1="11" y2="17"></line>
                                <line x1="14" x2="14" y1="11" y2="17"></line>
                            </svg>
                            Remove Work Experience
                        </button>
                    </div>
                </div>
            ))}

            {/* Add Work Experience Button */}
            <button
                type="button"
                onClick={addWorkExperience}
                className="mt-4 sm:mt-5 inline-flex items-center justify-center rounded-md text-sm sm:text-base font-medium px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 w-full sm:w-auto"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12h8"></path>
                    <path d="M12 8v8"></path>
                </svg>
                Add Work Experience
            </button>
        </div>
    );
};

export default WorkExperience;
