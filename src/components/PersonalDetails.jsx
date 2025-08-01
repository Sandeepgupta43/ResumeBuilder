import React, { useState } from "react";
import { UseUserData } from "./UseUserData";
import { geminiHelper } from "@/utils/geminiHelper";
import toast from "react-hot-toast";

function PersonalDetails({ isCustom = false }) {
  const { userData, setUserData } = UseUserData(isCustom);
  const [errors, setErrors] = useState({});
  const [enhancing, setEnhancing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
  };

  const handleEnhanceSummary = async () => {
    if (!userData.summary.trim()) {
      return toast("Please enter a summary to enhance.");
    }
    setEnhancing(true);
    try {
      const prompt = `You are a professional resume editor. Improve and enhance 
                        the following summary to make it concise, professional, 
                        and impactful. Keep it 2-3 sentences max. And give me only summary don't give any reasone or anything 
                        Summary: ${userData.summary.trim()}`;
      const result = await geminiHelper(prompt);
      const cleaned = result.text
        .replace(/```(?:json)?/g, "")
        .replace(/^[\n]+|[\n]+$/g, "")
        .trim();
      toast.success("Summary Enhanced");
      setUserData((prev) => ({
        ...prev,
        summary: cleaned,
      }));
    } catch (err) {
      console.error("Enhancement error", err);
      toast.error("Failed to enhance summary. Please try again.");
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <div className="mt-4 sm:mt-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-x-6 sm:gap-y-8">
          {/* Full Name */}
          <div className="sm:col-span-6 md:col-span-3">
            <label htmlFor="first-name" className="block text-base sm:text-lg font-medium text-gray-900">
              Full Name
            </label>
            <div className="mt-1 sm:mt-2">
              <input
                id="first-name"
                name="name"
                type="text"
                value={userData.name}
                onChange={handleInputChange}
                autoComplete="given-name"
                className={`block w-full rounded-md border bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 
                            outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                            focus:-outline-offset-2 focus:outline-indigo-600 ${
                              errors.name ? "border-red-500" : "border-gray-300"
                            }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="sm:col-span-6 md:col-span-3">
            <label htmlFor="email" className="block text-base sm:text-lg font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-1 sm:mt-2">
              <input
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                type="email"
                autoComplete="email"
                className={`block w-full rounded-md border bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 
                            outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                            focus:-outline-offset-2 focus:outline-indigo-600 ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* LinkedIn */}
          <div className="sm:col-span-6 md:col-span-3">
            <label htmlFor="LinkedIn" className="block text-base sm:text-lg font-medium text-gray-900">
              LinkedIn
            </label>
            <div className="mt-1 sm:mt-2">
              <input
                id="LinkedIn"
                name="linkedIn"
                value={userData.linkedIn}
                onChange={handleInputChange}
                type="text"
                autoComplete="given-name"
                className={`block w-full rounded-md border bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 
                            outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                            focus:-outline-offset-2 focus:outline-indigo-600 ${
                              errors.linkedIn ? "border-red-500" : "border-gray-300"
                            }`}
              />
              {errors.linkedIn && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.linkedIn}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="sm:col-span-6 md:col-span-3">
            <label htmlFor="ph-number" className="block text-base sm:text-lg font-medium text-gray-900">
              Phone Number
            </label>
            <div className="mt-1 sm:mt-2">
              <input
                id="ph-number"
                name="phone"
                onChange={handleInputChange}
                value={userData.phone}
                autoComplete="given-name"
                className={`block w-full rounded-md border bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 
                            outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                            focus:-outline-offset-2 focus:outline-indigo-600 ${
                              errors.phone ? "border-red-500" : "border-gray-300"
                            }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* GitHub */}
          <div className="sm:col-span-6 md:col-span-3">
            <label htmlFor="github" className="block text-base sm:text-lg font-medium text-gray-900">
              GitHub
            </label>
            <div className="mt-1 sm:mt-2">
              <input
                id="github"
                name="github"
                onChange={handleInputChange}
                value={userData.github}
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          {/* City */}
          <div className="sm:col-span-6 md:col-span-3">
            <label htmlFor="location" className="block text-base sm:text-lg font-medium text-gray-900">
              City
            </label>
            <div className="mt-1 sm:mt-2">
              <input
                id="location"
                name="location"
                onChange={handleInputChange}
                value={userData.location}
                type="text"
                autoComplete="given-name"
                className={`block w-full rounded-md border bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 
                            outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                            focus:-outline-offset-2 focus:outline-indigo-600 ${
                              errors.location ? "border-red-500" : "border-gray-300"
                            }`}
              />
              {errors.location && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.location}</p>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 sm:mt-6">
          <label htmlFor="summary" className="block text-base sm:text-lg font-medium text-gray-900">
            Summary
          </label>
          <div className="mt-1 sm:mt-2">
            <textarea
              id="summary"
              name="summary"
              onChange={handleInputChange}
              value={userData.summary}
              rows={3}
              className={`block w-full rounded-md border bg-white px-3 py-1.5 text-sm sm:text-base text-gray-900 
                          outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                          focus:-outline-offset-2 focus:outline-indigo-600 ${
                            errors.summary ? "border-red-500" : "border-gray-300"
                          }`}
            />
            {errors.summary && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.summary}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleEnhanceSummary}
            disabled={enhancing}
            className="mt-2 px-3 py-1.5 text-sm sm:text-base bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 transition-colors"
          >
            {enhancing ? "Enhancing..." : "Enhance Summary"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;