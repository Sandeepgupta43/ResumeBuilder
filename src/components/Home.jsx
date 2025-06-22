import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Home() {
  const { userData } = useContext(UserContext);

  // Helper function to render arrays of objects
  const renderArrayData = (array, title) => {
    if (!array || array.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
          {title}
        </h3>
        <div className="space-y-4">
          {array.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(item, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Format skills display
  const renderSkills = () => {
    if (!userData.skills) return null;

    const skillsList =
      typeof userData.skills === "string"
        ? userData.skills.split(/\s*,\s*|\s*;\s*|\n/)
        : userData.skills;

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {skillsList.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Render basic info section
  const renderBasicInfo = () => (
    <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Name:</span>{" "}
            {userData.name || "Not provided"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Email:</span>{" "}
            {userData.email || "Not provided"}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Phone:</span>{" "}
            {userData.phone || "Not provided"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Location:</span>{" "}
            {userData.location || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Profile</h1>
          <p className="text-gray-600">A comprehensive overview of your professional details</p>
        </div>

        {renderBasicInfo()}
        {userData.skills && renderSkills()}
        {userData.workExperience && renderArrayData(userData.workExperience, "Work Experience")}
        {userData.projects && renderArrayData(userData.projects, "Projects")}
        {userData.education && renderArrayData(userData.education, "Education")}
        {userData.certifications && renderArrayData(userData.certifications, "Certifications")}
        {userData.extracurricular && renderArrayData(userData.extracurricular, "Extracurricular Activities")}
      </div>
    </div>
  );
}

export default Home;