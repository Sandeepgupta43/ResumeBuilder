import { useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { UseUserData } from "./UseUserData";

const Extracurriculars = ({ isCustom = false }) => {
    const { userData, setUserData } = UseUserData(isCustom);
    const [bulletCounts, setBulletCounts] = useState([]);

    // Initialize extracurriculars from userData
    useEffect(() => {
        if (userData.extracurriculars && userData.extracurriculars.length > 0) {
            setBulletCounts(
                userData.extracurriculars.map((activity) =>
                    activity.bullets ? activity.bullets.length : 0
                )
            );
        }
    }, [userData.extracurriculars, setUserData]);

    // Handle extracurricular changes
    const handleExtracurricularChange = (index, field, value) => {
        const updatedActivities = [...userData.extracurriculars];
        updatedActivities[index] = {
            ...updatedActivities[index],
            [field]: value,
        };
        setUserData((prev) => ({
            ...prev,
            extracurriculars: updatedActivities,
        }));
    };

    // Handle bullet point changes
    const handleBulletChange = (activityIndex, bulletIndex, value) => {
        const updatedActivities = [...userData.extracurriculars];
        const updatedBullets = [...updatedActivities[activityIndex].bullets];
        updatedBullets[bulletIndex] = value;

        updatedActivities[activityIndex] = {
            ...updatedActivities[activityIndex],
            bullets: updatedBullets,
        };

        setUserData((prev) => ({
            ...prev,
            extracurriculars: updatedActivities,
        }));
    };

    // Add new extracurricular activity
    const addExtracurricular = () => {
        setBulletCounts((prev) => [...prev, 0]);
        setUserData((prev) => ({
            ...prev,
            extracurriculars: [
                ...prev.extracurriculars,
                {
                    organization: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    currentlyActive: false,
                    location: "",
                    bullets: [],
                },
            ],
        }));
    };

    // Remove extracurricular activity
    const removeExtracurricular = (index) => {
        setBulletCounts((prev) => prev.filter((_, i) => i !== index));
        setUserData((prev) => ({
            ...prev,
            extracurriculars: prev.extracurriculars.filter(
                (_, i) => i !== index
            ),
        }));
    };

    // Add bullet point
    const addBulletPoint = (activityIndex) => {
        setBulletCounts((prev) => {
            const newCounts = [...prev];
            newCounts[activityIndex] += 1;
            return newCounts;
        });

        setUserData((prev) => {
            const updatedActivities = [...prev.extracurriculars];
            updatedActivities[activityIndex] = {
                ...updatedActivities[activityIndex],
                bullets: [...updatedActivities[activityIndex].bullets, ""],
            };
            return {
                ...prev,
                extracurriculars: updatedActivities,
            };
        });
    };

    // Remove bullet point
    const removeBulletPoint = (activityIndex, bulletIndex) => {
        setBulletCounts((prev) => {
            const newCounts = [...prev];
            newCounts[activityIndex] -= 1;
            return newCounts;
        });

        setUserData((prev) => {
            const updatedActivities = [...prev.extracurriculars];
            updatedActivities[activityIndex] = {
                ...updatedActivities[activityIndex],
                bullets: updatedActivities[activityIndex].bullets.filter(
                    (_, i) => i !== bulletIndex
                ),
            };
            return {
                ...prev,
                extracurriculars: updatedActivities,
            };
        });
    };

    // Move bullet point up
    const moveBulletUp = (activityIndex, bulletIndex) => {
        if (bulletIndex === 0) return;

        setUserData((prev) => {
            const updatedActivities = [...prev.extracurriculars];
            const bullets = [...updatedActivities[activityIndex].bullets];

            [bullets[bulletIndex - 1], bullets[bulletIndex]] = [
                bullets[bulletIndex],
                bullets[bulletIndex - 1],
            ];

            updatedActivities[activityIndex] = {
                ...updatedActivities[activityIndex],
                bullets,
            };

            return {
                ...prev,
                extracurriculars: updatedActivities,
            };
        });
    };

    // Move bullet point down
    const moveBulletDown = (activityIndex, bulletIndex) => {
        const bullets = userData.extracurriculars[activityIndex].bullets;
        if (bulletIndex === bullets.length - 1) return;

        setUserData((prev) => {
            const updatedActivities = [...prev.extracurriculars];
            const bullets = [...updatedActivities[activityIndex].bullets];

            [bullets[bulletIndex], bullets[bulletIndex + 1]] = [
                bullets[bulletIndex + 1],
                bullets[bulletIndex],
            ];

            updatedActivities[activityIndex] = {
                ...updatedActivities[activityIndex],
                bullets,
            };

            return {
                ...prev,
                extracurriculars: updatedActivities,
            };
        });
    };

    return (
        <div className="mt-6 sm:mt-8">
            <h2 className="font-semibold text-gray-900 text-lg sm:text-xl mb-4 sm:mb-6">
                Extracurricular Activities
            </h2>

            {/* Activities List */}
            {userData.extracurriculars?.map((activity, activityIndex) => (
                <div
                    className="border border-gray-300 rounded-lg p-4 sm:p-6 mt-4"
                    key={activityIndex}
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-x-6 sm:gap-y-8">
                        {/* Organization Name */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`organization-${activityIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Organization Name
                            </label>
                            <input
                                id={`organization-${activityIndex}`}
                                name="organization"
                                type="text"
                                value={activity.organization || ""}
                                onChange={(e) =>
                                    handleExtracurricularChange(
                                        activityIndex,
                                        "organization",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* Your Role */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`role-${activityIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Your Role
                            </label>
                            <input
                                id={`role-${activityIndex}`}
                                name="role"
                                type="text"
                                value={activity.role || ""}
                                onChange={(e) =>
                                    handleExtracurricularChange(
                                        activityIndex,
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
                                htmlFor={`start-date-${activityIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Start Date
                            </label>
                            <input
                                id={`start-date-${activityIndex}`}
                                name="startDate"
                                type="month"
                                value={activity.startDate || ""}
                                onChange={(e) =>
                                    handleExtracurricularChange(
                                        activityIndex,
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
                                htmlFor={`end-date-${activityIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                End Date
                            </label>
                            <input
                                id={`end-date-${activityIndex}`}
                                name="endDate"
                                type="month"
                                value={
                                    activity.currentlyActive
                                        ? ""
                                        : activity.endDate || ""
                                }
                                onChange={(e) =>
                                    handleExtracurricularChange(
                                        activityIndex,
                                        "endDate",
                                        e.target.value
                                    )
                                }
                                disabled={activity.currentlyActive}
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                            <div className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    id={`current-${activityIndex}`}
                                    name="currentlyActive"
                                    checked={activity.currentlyActive || false}
                                    onChange={(e) =>
                                        handleExtracurricularChange(
                                            activityIndex,
                                            "currentlyActive",
                                            e.target.checked
                                        )
                                    }
                                    className="mr-2 h-4 w-4"
                                />
                                <label
                                    htmlFor={`current-${activityIndex}`}
                                    className="text-sm sm:text-base text-gray-700"
                                >
                                    Currently active
                                </label>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`location-${activityIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Location
                            </label>
                            <input
                                id={`location-${activityIndex}`}
                                name="location"
                                type="text"
                                value={activity.location || ""}
                                onChange={(e) =>
                                    handleExtracurricularChange(
                                        activityIndex,
                                        "location",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Key Contributions */}
                    <div className="mt-4 sm:mt-6">
                        <label className="block text-base sm:text-lg font-medium text-gray-900 mb-2">
                            Key Contributions
                        </label>

                        {activity.bullets?.map((bullet, bulletIndex) => (
                            <div
                                key={bulletIndex}
                                className="flex items-start gap-2 mb-3"
                            >
                                <textarea
                                    className="flex-1 min-h-[80px] border bg-white px-3 py-2 text-sm sm:text-base rounded-md border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                                    placeholder="Describe your contribution"
                                    rows="3"
                                    value={bullet}
                                    onChange={(e) =>
                                        handleBulletChange(
                                            activityIndex,
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
                                            moveBulletUp(
                                                activityIndex,
                                                bulletIndex
                                            )
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
                                            activity.bullets.length - 1
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                        type="button"
                                        onClick={() =>
                                            moveBulletDown(
                                                activityIndex,
                                                bulletIndex
                                            )
                                        }
                                        disabled={
                                            bulletIndex ===
                                            activity.bullets.length - 1
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
                                                activityIndex,
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
                            onClick={() => addBulletPoint(activityIndex)}
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
                            Add Contribution
                        </button>
                    </div>

                    {/* Remove Activity Button */}
                    <div className="mt-4 sm:mt-6 text-right">
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm sm:text-base font-medium px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 w-full sm:w-auto"
                            type="button"
                            onClick={() => removeExtracurricular(activityIndex)}
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
                            Remove Activity
                        </button>
                    </div>
                </div>
            ))}

            {/* Add Activity Button */}
            <button
                type="button"
                onClick={addExtracurricular}
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
                Add Activity
            </button>
        </div>
    );
};

export default Extracurriculars;
