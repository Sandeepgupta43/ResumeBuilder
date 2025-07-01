import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { UseUserData } from "./UseUserData";

const Projects = ({ isCustom = false }) => {
    const { userData, setUserData } = UseUserData(isCustom);
    const [projectBulSize, setProjectBulSize] = useState([]);

    // Initialize projects from userData
    useEffect(() => {
        if (userData.projects && userData.projects.length > 0) {
            setProjectBulSize(
                userData.projects.map((proj) =>
                    proj.bullets ? proj.bullets.length : 0
                )
            );
        }
    }, [userData.projects]);

    // Handle project changes
    const handleProjectChange = (index, field, value) => {
        const updatedProjects = [...userData.projects];
        updatedProjects[index] = {
            ...updatedProjects[index],
            [field]: value,
        };
        setUserData((prev) => ({
            ...prev,
            projects: updatedProjects,
        }));
    };

    // Handle bullet point changes
    const handleBulletChange = (projIndex, bulletIndex, value) => {
        const updatedProjects = [...userData.projects];
        const updatedBullets = [...updatedProjects[projIndex].bullets];
        updatedBullets[bulletIndex] = value;

        updatedProjects[projIndex] = {
            ...updatedProjects[projIndex],
            bullets: updatedBullets,
        };

        setUserData((prev) => ({
            ...prev,
            projects: updatedProjects,
        }));
    };

    // Add new project
    const addProject = () => {
        setProjectBulSize((prev) => [...prev, 0]);
        setUserData((prev) => ({
            ...prev,
            projects: [
                ...prev.projects,
                {
                    name: "",
                    description: "",
                    startDate: "",
                    endDate: "",
                    currentlyWorking: false,
                    technologies: "",
                    bullets: [],
                },
            ],
        }));
    };

    // Remove project
    const removeProject = (index) => {
        setProjectBulSize((prev) => prev.filter((_, i) => i !== index));
        setUserData((prev) => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index),
        }));
    };

    // Add bullet point
    const addBulletPoint = (projIndex) => {
        setProjectBulSize((prev) => {
            const newBullets = [...prev];
            newBullets[projIndex] += 1;
            return newBullets;
        });

        setUserData((prev) => {
            const updatedProjects = [...prev.projects];
            updatedProjects[projIndex] = {
                ...updatedProjects[projIndex],
                bullets: [...updatedProjects[projIndex].bullets, ""],
            };
            return {
                ...prev,
                projects: updatedProjects,
            };
        });
    };

    // Remove bullet point
    const removeBulletPoint = (projIndex, bulletIndex) => {
        setProjectBulSize((prev) => {
            const newBullets = [...prev];
            newBullets[projIndex] -= 1;
            return newBullets;
        });

        setUserData((prev) => {
            const updatedProjects = [...prev.projects];
            updatedProjects[projIndex] = {
                ...updatedProjects[projIndex],
                bullets: updatedProjects[projIndex].bullets.filter(
                    (_, i) => i !== bulletIndex
                ),
            };
            return {
                ...prev,
                projects: updatedProjects,
            };
        });
    };

    // Move bullet point up
    const moveBulletUp = (projIndex, bulletIndex) => {
        if (bulletIndex === 0) return;

        setUserData((prev) => {
            const updatedProjects = [...prev.projects];
            const bullets = [...updatedProjects[projIndex].bullets];

            [bullets[bulletIndex - 1], bullets[bulletIndex]] = [
                bullets[bulletIndex],
                bullets[bulletIndex - 1],
            ];

            updatedProjects[projIndex] = {
                ...updatedProjects[projIndex],
                bullets,
            };

            return {
                ...prev,
                projects: updatedProjects,
            };
        });
    };

    // Move bullet point down
    const moveBulletDown = (projIndex, bulletIndex) => {
        const bullets = userData.projects[projIndex].bullets;
        if (bulletIndex === bullets.length - 1) return;

        setUserData((prev) => {
            const updatedProjects = [...prev.projects];
            const bullets = [...updatedProjects[projIndex].bullets];

            [bullets[bulletIndex], bullets[bulletIndex + 1]] = [
                bullets[bulletIndex + 1],
                bullets[bulletIndex],
            ];

            updatedProjects[projIndex] = {
                ...updatedProjects[projIndex],
                bullets,
            };

            return {
                ...prev,
                projects: updatedProjects,
            };
        });
    };

    return (
        <div className="mt-6 sm:mt-8">
            <h2 className="font-semibold text-gray-900 text-lg sm:text-xl mb-4 sm:mb-6">
                Projects
            </h2>

            {/* Projects List */}
            {userData.projects?.map((project, projIndex) => (
                <div
                    className="border border-gray-300 rounded-lg p-4 sm:p-6 mt-4"
                    key={projIndex}
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-x-6 sm:gap-y-8">
                        {/* Project Name */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`project-name-${projIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Project Name
                            </label>
                            <input
                                id={`project-name-${projIndex}`}
                                name="name"
                                type="text"
                                value={project.name || ""}
                                onChange={(e) =>
                                    handleProjectChange(
                                        projIndex,
                                        "name",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* Technologies Used */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`technologies-${projIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Technologies Used
                            </label>
                            <input
                                id={`technologies-${projIndex}`}
                                name="technologies"
                                type="text"
                                value={project.technologies || ""}
                                onChange={(e) =>
                                    handleProjectChange(
                                        projIndex,
                                        "technologies",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* Start Date */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`project-start-date-${projIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Start Date
                            </label>
                            <input
                                id={`project-start-date-${projIndex}`}
                                name="startDate"
                                type="month"
                                value={project.startDate || ""}
                                onChange={(e) =>
                                    handleProjectChange(
                                        projIndex,
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
                                htmlFor={`project-end-date-${projIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                End Date
                            </label>
                            <input
                                id={`project-end-date-${projIndex}`}
                                name="endDate"
                                type="month"
                                value={
                                    project.currentlyWorking
                                        ? ""
                                        : project.endDate || ""
                                }
                                onChange={(e) =>
                                    handleProjectChange(
                                        projIndex,
                                        "endDate",
                                        e.target.value
                                    )
                                }
                                disabled={project.currentlyWorking}
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                            <div className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    id={`current-project-${projIndex}`}
                                    name="currentlyWorking"
                                    checked={project.currentlyWorking || false}
                                    onChange={(e) =>
                                        handleProjectChange(
                                            projIndex,
                                            "currentlyWorking",
                                            e.target.checked
                                        )
                                    }
                                    className="mr-2 h-4 w-4"
                                />
                                <label
                                    htmlFor={`current-project-${projIndex}`}
                                    className="text-sm sm:text-base text-gray-700"
                                >
                                    Currently working on this
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="mt-4 sm:mt-6">
                        <label className="block text-base sm:text-lg font-medium text-gray-900 mb-2">
                            Bullet Points
                        </label>

                        {project.bullets?.map((bullet, bulletIndex) => (
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
                                            projIndex,
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
                                            moveBulletUp(projIndex, bulletIndex)
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
                                            project.bullets.length - 1
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                        type="button"
                                        onClick={() =>
                                            moveBulletDown(
                                                projIndex,
                                                bulletIndex
                                            )
                                        }
                                        disabled={
                                            bulletIndex ===
                                            project.bullets.length - 1
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
                                                projIndex,
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
                            onClick={() => addBulletPoint(projIndex)}
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

                    {/* Remove Project Button */}
                    <div className="mt-4 sm:mt-6 text-right">
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm sm:text-base font-medium px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 w-full sm:w-auto"
                            type="button"
                            onClick={() => removeProject(projIndex)}
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
                            Remove Project
                        </button>
                    </div>
                </div>
            ))}

            {/* Add Project Button */}
            <button
                type="button"
                onClick={addProject}
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
                Add Project
            </button>
        </div>
    );
};

export default Projects;
