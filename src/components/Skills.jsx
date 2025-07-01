import React, { useState, useEffect } from "react";
import { UseUserData } from "./UseUserData";

function Skills({ isCustom = false }) {
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const { userData, setUserData } = UseUserData(isCustom);

    // Initialize skills from userData if available
    useEffect(() => {
        if (userData.skills) {
            const initialSkills =
                typeof userData.skills === "string"
                    ? userData.skills
                          .split(/\s*,\s*|\s*;\s*|\n/)
                          .filter((s) => s.trim())
                    : userData.skills;
            setSkills(initialSkills);
        }
    }, [userData]);

    const handleSkill = () => {
        if (skill.trim().length === 0) return;
        const newSkills = [...skills, skill.trim()];
        setSkills(newSkills);
        setSkill("");

        // Update userData context
        setUserData((prev) => ({
            ...prev,
            skills: newSkills.join(", "),
        }));
    };

    return (
        <div className="mt-6 sm:mt-8">
            <h2 className="font-semibold text-gray-900 text-lg sm:text-xl mb-4 sm:mb-6">
                Skills
            </h2>

            {/* Skill Input */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                    className="flex h-10 w-full sm:max-w-48 rounded-md border border-gray-300 bg-white 
                 px-3 py-2 text-sm sm:text-base placeholder:text-gray-400
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter a skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                />
                <button
                    className="inline-flex justify-center items-center gap-2 h-10 px-4 py-2 border border-black 
                bg-white text-black text-sm sm:text-base font-semibold shadow-[2px_2px_0_black] 
                sm:shadow-[3px_3px_0_black] hover:bg-gray-50 transition-all cursor-pointer"
                    type="button"
                    onClick={handleSkill}
                >
                    Add Skill
                </button>
            </div>

            {/* Skills List */}
            <div className="flex gap-2 flex-wrap mt-3 sm:mt-4">
                {skills.map((data, index) => (
                    <div
                        key={index}
                        className="inline-flex items-center rounded-full bg-gray-100 text-gray-800 
                                 text-sm sm:text-base py-1 px-3 hover:bg-gray-200 transition-colors"
                    >
                        {data}
                        <button
                            className="ml-1.5 rounded-full p-0.5 hover:bg-gray-300 transition-colors"
                            type="button"
                            onClick={() =>
                                setSkills((prev) =>
                                    prev.filter((_, i) => i !== index)
                                )
                            }
                            aria-label={`Remove ${data} skill`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                            >
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Skills;
