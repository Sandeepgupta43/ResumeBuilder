import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Home() {
  const { userData } = useContext(UserContext);

  // Helper function to render arrays of objects
  const renderArrayData = (array, title) => {
    if (!array || array.length === 0) return <p><strong>{title}:</strong> Not available</p>;
    
    return (
      <div className="mb-4">
        <strong>{title}:</strong>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          {array.map((item, index) => (
            <li key={index} className="text-sm">
              {JSON.stringify(item, null, 2)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Format skills display
  const renderSkills = () => {
    if (!userData.skills) return <p><strong>Skills:</strong> Not available</p>;
    
    const skillsList = typeof userData.skills === 'string' 
      ? userData.skills.split(/\s*,\s*|\s*;\s*|\n/) 
      : userData.skills;
    
    return (
      <div className="mb-4">
        <strong>Skills:</strong>
        <div className="flex flex-wrap gap-2 mt-1">
          {skillsList.map((skill, index) => (
            <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Resume Information</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Name:</strong> {userData.name || "Not available"}</p>
          <p><strong>Email:</strong> {userData.email || "Not available"}</p>
          <p><strong>Phone:</strong> {userData.phone || "Not available"}</p>
        </div>
        
        {renderSkills()}
        
        {renderArrayData(userData.workExperience, "Work Experience")}
        {renderArrayData(userData.projects, "Projects")}
        {renderArrayData(userData.education, "Education")}
        {renderArrayData(userData.certifications, "Certificates")}
        {renderArrayData(userData.extracurricular, "Extracurricular Activities")}
      </div>
    </div>
  );
}

export default Home;