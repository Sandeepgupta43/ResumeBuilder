import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Education = () => {
    const { userData, setUserData } = useContext(UserContext);

    // Initialize education from userData
    useEffect(() => {
        if (userData.education && userData.education.length === 0) {
            // Add an empty education entry if none exists
            // setUserData(prev => ({
            //     ...prev,
            //     education: [{
            //         institution: "",
            //         degree: "",
            //         fieldOfStudy: "",
            //         startDate: "",
            //         endDate: "",
            //         gpa: "",
            //         description: ""
            //     }]
            // }));
        }
    }, [userData.education, setUserData]);

    // Handle education changes
    const handleEducationChange = (index, field, value) => {
        const updatedEducation = [...userData.education];
        updatedEducation[index] = {
            ...updatedEducation[index],
            [field]: value
        };
        setUserData(prev => ({
            ...prev,
            education: updatedEducation
        }));
    };

    // Add new education entry
    const addEducation = () => {
        setUserData(prev => ({
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
                    description: ""
                }
            ]
        }));
    };

    // Remove education entry
    const removeEducation = (index) => {
        setUserData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="mt-8">
            <h2 className="font-semibold text-gray-900 text-xl mb-6">Education</h2>
            
            {/* Add Education Button */}
            <button
                type="button"
                onClick={addEducation}
                className="mb-6 inline-flex items-center justify-center whitespace-nowrap cursor-pointer 
                        rounded-md text-sm font-medium ring-offset-background transition-colors 
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                        focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                        border border-input bg-background hover:bg-accent hover:text-accent-foreground 
                        h-10 px-4 py-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                    strokeLinejoin="round" className="lucide lucide-plus-circle h-4 w-4 mr-2"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12h8"></path>
                    <path d="M12 8v8"></path>
                </svg>
                Add Education
            </button>

            {/* Education List */}
            {userData.education?.map((edu, eduIndex) => (
                <div className="border border-gray-300 rounded-lg p-6 mt-4" key={eduIndex}>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor={`institution-${eduIndex}`} className="block text-lg font-medium text-gray-900">
                                Institution Name
                            </label>
                            <input
                                id={`institution-${eduIndex}`}
                                name="institution"
                                type="text"
                                value={edu.institution || ""}
                                onChange={(e) => handleEducationChange(eduIndex, 'institution', e.target.value)}
                                className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={`degree-${eduIndex}`} className="block text-lg font-medium text-gray-900">
                                Degree/Certification
                            </label>
                            <input
                                id={`degree-${eduIndex}`}
                                name="degree"
                                type="text"
                                value={edu.degree || ""}
                                onChange={(e) => handleEducationChange(eduIndex, 'degree', e.target.value)}
                                className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* <div className="sm:col-span-3">
                            <label htmlFor={`field-of-study-${eduIndex}`} className="block text-lg font-medium text-gray-900">
                                Field of Study
                            </label>
                            <input
                                id={`field-of-study-${eduIndex}`}
                                name="fieldOfStudy"
                                type="text"
                                value={edu.fieldOfStudy || ""}
                                onChange={(e) => handleEducationChange(eduIndex, 'fieldOfStudy', e.target.value)}
                                className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div> */}

                        <div className="sm:col-span-3">
                            <label htmlFor={`gpa-${eduIndex}`} className="block text-lg font-medium text-gray-900">
                                GPA
                            </label>
                            <input
                                id={`gpa-${eduIndex}`}
                                name="gpa"
                                type="text"
                                value={edu.gpa || ""}
                                onChange={(e) => handleEducationChange(eduIndex, 'gpa', e.target.value)}
                                className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={`start-date-${eduIndex}`} className="block text-lg font-medium text-gray-900">
                                Start Date
                            </label>
                            <input
                                id={`start-date-${eduIndex}`}
                                name="startDate"
                                type="month"
                                value={edu.startDate || ""}
                                onChange={(e) => handleEducationChange(eduIndex, 'startDate', e.target.value)}
                                className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={`end-date-${eduIndex}`} className="block text-lg font-medium text-gray-900">
                                End Date
                            </label>
                            <input
                                id={`end-date-${eduIndex}`}
                                name="endDate"
                                type="month"
                                value={edu.endDate || ""}
                                onChange={(e) => handleEducationChange(eduIndex, 'endDate', e.target.value)}
                                className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div>

                        {/* <div className="sm:col-span-6">
                            <label htmlFor={`description-${eduIndex}`} className="block text-lg font-medium text-gray-900">
                                Description
                            </label>
                            <textarea
                                id={`description-${eduIndex}`}
                                name="description"
                                rows={3}
                                value={edu.description || ""}
                                onChange={(e) => handleEducationChange(eduIndex, 'description', e.target.value)}
                                className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            />
                        </div> */}
                    </div>

                    <div className="mt-6 text-right">
                        <button 
                            className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer
                                    rounded-md text-sm font-medium ring-offset-background transition-colors 
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                                    focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                                    hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" 
                            type="button"
                            onClick={() => removeEducation(eduIndex)}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                className="lucide lucide-trash2 h-4 w-4 mr-2"
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
        </div>
    );
};

export default Education;