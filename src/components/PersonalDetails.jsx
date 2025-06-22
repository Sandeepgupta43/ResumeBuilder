import React, { useState } from 'react'
import { UseUserData } from './UseUserData'

function PersonalDetails({ isCustom = false }) {
    const { userData, setUserData } = UseUserData(isCustom);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const validate = () => {
        const newErrors = {};

        if (!userData.name.trim()) {
            newErrors.name = 'Full Name is required';
        }

        if (!userData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!userData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(userData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        if (!userData.linkedIn.trim()) {
            newErrors.linkedIn = 'LinkedIn profile is required';
        }

        if (!userData.location.trim()) {
            newErrors.location = 'City is required';
        }

        if (!userData.summary.trim()) {
            newErrors.summary = 'Summary is required';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);


    };

    return (
        <div className="mt-8">
            <form onSubmit={handleSubmit}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-lg font-medium text-gray-900">
                            Full Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="first-name"
                                name="name"
                                type="text"
                                value={userData.name}
                                onChange={handleInputChange}
                                autoComplete="given-name"
                                className={`block w-full  bg-white px-3 py-1.5 text-base text-gray-900 
                                    outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                                    focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-lg font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                type="email"
                                autoComplete="email"
                                className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="LinkedIn" className="block text-lg font-medium text-gray-900">
                            LinkedIn
                        </label>
                        <div className="mt-2">
                            <input
                                id="LinkedIn"
                                name="linkedIn"
                                value={userData.linkedIn}
                                onChange={handleInputChange}
                                type="text"
                                autoComplete="given-name"
                                className={`block w-full  bg-white px-3 py-1.5 text-base text-gray-900 
                                    outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                                    focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors.linkedIn && <p className="text-red-500 text-sm mt-1">{errors.linkedIn}</p>}

                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="ph-number" className="block text-lg font-medium text-gray-900">
                            Phone Number
                        </label>
                        <div className="mt-2">
                            <input
                                id="ph-number"
                                name="phone"
                                onChange={handleInputChange}
                                value={userData.phone}
                                autoComplete="given-name"
                                className={`block w-full  bg-white px-3 py-1.5 text-base text-gray-900 
                                    outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                                    focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="github" className="block text-lg font-medium text-gray-900">
                            GitHub
                        </label>
                        <div className="mt-2">
                            <input
                                id="github"
                                name="github"
                                onChange={handleInputChange}
                                value={userData.github}
                                type="text"
                                autoComplete="given-name"
                                className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="location" className="block text-lg font-medium text-gray-900">
                            City
                        </label>
                        <div className="mt-2">
                            <input
                                id="location"
                                name="location"
                                onChange={handleInputChange}
                                value={userData.location}
                                type="text"
                                autoComplete="given-name"
                                className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}

                        </div>
                    </div>

                </div>

                <div className="col-span-full mt-3">
                    <label htmlFor="summary" className="block text-lg font-medium text-gray-900">
                        Summary
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="summary"
                            name="summary"
                            onChange={handleInputChange}
                            value={userData.summary}
                            rows={3}
                            className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"

                        />
                        {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}

                    </div>
                </div><br />
                <button
                    type="submit"
                    className="p-2 inline-flex justify-center items-center gap-2.5 border-black bg-white outline-1 outline-offset-[-1px] outline-violet-200 text-black text-sm font-semibold shadow-[3px_3px_0_black] cursor-pointer"
                >
                    Save
                </button>
            </form>
        </div>
    )
}

export default PersonalDetails