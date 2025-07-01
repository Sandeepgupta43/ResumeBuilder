import { UseUserData } from "./UseUserData";

const Education = ({ isCustom = false }) => {
    const { userData, setUserData } = UseUserData(isCustom);

    // Handle education changes
    const handleEducationChange = (index, field, value) => {
        const updatedEducation = [...userData.education];
        updatedEducation[index] = {
            ...updatedEducation[index],
            [field]: value,
        };
        setUserData((prev) => ({
            ...prev,
            education: updatedEducation,
        }));
    };

    // Add new education entry
    const addEducation = () => {
        setUserData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                {
                    institution: "",
                    degree: "",
                    fieldOfStudy: "",
                    startDate: "",
                    endDate: "",
                    gpa: "",
                    description: "",
                },
            ],
        }));
    };

    // Remove education entry
    const removeEducation = (index) => {
        setUserData((prev) => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="mt-6 sm:mt-8">
            <h2 className="font-semibold text-gray-900 text-lg sm:text-xl mb-4 sm:mb-6">
                Education
            </h2>

            {/* Education List */}
            {userData.education?.map((edu, eduIndex) => (
                <div
                    className="border border-gray-300 rounded-lg p-4 sm:p-6 mt-4"
                    key={eduIndex}
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-x-6 sm:gap-y-8">
                        {/* Institution Name */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`institution-${eduIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Institution Name
                            </label>
                            <input
                                id={`institution-${eduIndex}`}
                                name="institution"
                                type="text"
                                value={edu.institution || ""}
                                onChange={(e) =>
                                    handleEducationChange(
                                        eduIndex,
                                        "institution",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* Degree/Certification */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`degree-${eduIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Degree/Certification
                            </label>
                            <input
                                id={`degree-${eduIndex}`}
                                name="degree"
                                type="text"
                                value={edu.degree || ""}
                                onChange={(e) =>
                                    handleEducationChange(
                                        eduIndex,
                                        "degree",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* GPA */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`gpa-${eduIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                GPA
                            </label>
                            <input
                                id={`gpa-${eduIndex}`}
                                name="gpa"
                                type="text"
                                value={edu.gpa || ""}
                                onChange={(e) =>
                                    handleEducationChange(
                                        eduIndex,
                                        "gpa",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* Start Date */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`start-date-${eduIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Start Date
                            </label>
                            <input
                                id={`start-date-${eduIndex}`}
                                name="startDate"
                                type="month"
                                value={edu.startDate || ""}
                                onChange={(e) =>
                                    handleEducationChange(
                                        eduIndex,
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
                                htmlFor={`end-date-${eduIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                End Date
                            </label>
                            <input
                                id={`end-date-${eduIndex}`}
                                name="endDate"
                                type="month"
                                value={edu.endDate || ""}
                                onChange={(e) =>
                                    handleEducationChange(
                                        eduIndex,
                                        "endDate",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Remove Education Button */}
                    <div className="mt-4 sm:mt-6 text-right">
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm sm:text-base font-medium px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 w-full sm:w-auto"
                            type="button"
                            onClick={() => removeEducation(eduIndex)}
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
                            Remove Education
                        </button>
                    </div>
                </div>
            ))}

            {/* Add Education Button */}
            <button
                type="button"
                onClick={addEducation}
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
                Add Education
            </button>
        </div>
    );
};

export default Education;
