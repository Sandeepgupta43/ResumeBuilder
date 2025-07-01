import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { CustomUserContext } from '@/context/CustomUserContext';

const ModernProfessionalTemplate = ({ isCustom = false }) => {
  const { userData } = useContext(UserContext);
  const {customUserData} = useContext(CustomUserContext);

  const data = isCustom ? customUserData : userData;

  const formatSkills = () => {
    const skills = Array.isArray(data.skills)
      ? data.skills
      : (data.skills || '').split(/,|•|\n/).map(s => s.trim()).filter(Boolean);
    return skills;
  };

  return (
    <div className="w-[210mm] h-[297mm] mx-auto p-10 bg-white text-gray-800 font-sans">
      {/* Header */}
      <div className="border-b border-blue-200 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-1">{data.name}</h1>
        <p className="text-lg text-gray-700">{data.title}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
          {data.email && <span className="flex items-center">✉️ {data.email}</span>}
          {data.phone && <span className="flex items-center">📞 {data.phone}</span>}
          {data.location && <span className="flex items-center">📍 {data.location}</span>}
          {data.website && (
            <a href={data.website} className="flex items-center text-blue-600 hover:underline">🌐 {data.website.replace(/^https?:\/\//, '')}</a>
          )}
          {data.github && (
            <a href={data.github} className="flex items-center text-blue-600 hover:underline">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          )}
          {data.linkedIn && (
            <a href={data.linkedIn} className="flex items-center text-blue-600 hover:underline">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex">
        {/* Left column - 60% width */}
        <div className="w-3/5 pr-6">
          {/* Summary */}
          {data.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-2 border-b border-blue-200 pb-1">PROFILE</h2>
              <p className="text-sm leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {data.workExperience?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-2 border-b border-blue-200 pb-1">EXPERIENCE</h2>
              {data.workExperience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-sm">{exp.role}</h3>
                    <p className="text-xs text-gray-600">{exp.startDate} – {exp.endDate}</p>
                  </div>
                  <p className="text-sm italic mb-1">
                    {exp.company} {exp.project && `• ${exp.project}`}
                  </p>
                  <ul className="list-disc text-sm ml-5 space-y-1">
                    {exp.bullets?.map((b, j) => (
                      <li key={j} className="leading-snug">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column - 40% width */}
        <div className="w-2/5 pl-2">
          {/* Skills */}
          {formatSkills().length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-2 border-b border-blue-200 pb-1">SKILLS</h2>
              <div className="space-y-2">
                {formatSkills().map((skill, i) => (
                  <div key={i} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2"></span>
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-2 border-b border-blue-200 pb-1">EDUCATION</h2>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between">
                    <p className="font-semibold text-sm">{edu.degree}</p>
                    <p className="text-xs text-gray-600">{edu.startDate} – {edu.endDate}</p>
                  </div>
                  <p className="text-sm">{edu.institution}</p>
                  {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Additional Sections */}
          {data.certifications?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-2 border-b border-blue-200 pb-1">CERTIFICATIONS</h2>
              {data.certifications.map((cert, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold text-sm">{cert.name}</p>
                  <p className="text-xs">{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          )}

          {data.languages?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-2 border-b border-blue-200 pb-1">LANGUAGES</h2>
              <div className="space-y-1">
                {data.languages.map((lang, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{lang.language}</span>
                    <span className="text-gray-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernProfessionalTemplate;