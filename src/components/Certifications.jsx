import { UseUserData } from "./UseUserData";

const Certifications = ({ isCustom = false }) => {
    const { userData, setUserData } = UseUserData(isCustom);

    // Handle certification changes
    const handleCertificationChange = (index, field, value) => {
        const updatedCertifications = [...userData.certifications];
        updatedCertifications[index] = {
            ...updatedCertifications[index],
            [field]: value,
        };
        setUserData((prev) => ({
            ...prev,
            certifications: updatedCertifications,
        }));
    };

    // Add new certification
    const addCertification = () => {
        setUserData((prev) => ({
            ...prev,
            certifications: [
                ...prev.certifications,
                {
                    credentialId: "",
                    title: "",
                    link: "",
                    description: "",
                    issueDate: "",
                    expiryDate: "",
                },
            ],
        }));
    };

    // Remove certification
    const removeCertification = (index) => {
        setUserData((prev) => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="mt-6 sm:mt-8">
            <h2 className="font-semibold text-gray-900 text-lg sm:text-xl mb-4 sm:mb-6">
                Certifications
            </h2>

            {/* Certifications List */}
            {userData.certifications?.map((cert, certIndex) => (
                <div
                    className="border border-gray-300 rounded-lg p-4 sm:p-6 mt-4"
                    key={certIndex}
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-x-6 sm:gap-y-8">
                        {/* Credential ID */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`credential-id-${certIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Credential ID
                            </label>
                            <input
                                id={`credential-id-${certIndex}`}
                                name="credentialId"
                                type="text"
                                value={cert.credentialId || ""}
                                onChange={(e) =>
                                    handleCertificationChange(
                                        certIndex,
                                        "credentialId",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* Certification Title */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`title-${certIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Certification Title
                            </label>
                            <input
                                id={`title-${certIndex}`}
                                name="title"
                                type="text"
                                value={cert.title || ""}
                                onChange={(e) =>
                                    handleCertificationChange(
                                        certIndex,
                                        "title",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* Certification Link */}
                        <div className="sm:col-span-6">
                            <label
                                htmlFor={`link-${certIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Certification Link
                            </label>
                            <input
                                id={`link-${certIndex}`}
                                name="link"
                                type="url"
                                value={cert.link || ""}
                                onChange={(e) =>
                                    handleCertificationChange(
                                        certIndex,
                                        "link",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                                placeholder="https://example.com/certificate"
                            />
                        </div>

                        {/* Issue Date */}
                        <div className="sm:col-span-6 md:col-span-3">
                            <label
                                htmlFor={`issue-date-${certIndex}`}
                                className="block text-base sm:text-lg font-medium text-gray-900"
                            >
                                Issue Date
                            </label>
                            <input
                                id={`issue-date-${certIndex}`}
                                name="issueDate"
                                type="month"
                                value={cert.issueDate || ""}
                                onChange={(e) =>
                                    handleCertificationChange(
                                        certIndex,
                                        "issueDate",
                                        e.target.value
                                    )
                                }
                                className="mt-1 sm:mt-2 block w-full bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Remove Certification Button */}
                    <div className="mt-4 sm:mt-6 text-right">
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm sm:text-base font-medium px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 w-full sm:w-auto"
                            type="button"
                            onClick={() => removeCertification(certIndex)}
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
                            Remove Certification
                        </button>
                    </div>
                </div>
            ))}

            {/* Add Certification Button */}
            <button
                type="button"
                onClick={addCertification}
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
                Add Certification
            </button>
        </div>
    );
};

export default Certifications;
