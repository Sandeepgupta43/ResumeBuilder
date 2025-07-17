import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { CustomUserContext } from '@/context/CustomUserContext';

function ModernResumeTemplate({ isCustom = false }) {
  const { userData } = useContext(UserContext);
  const {customUserData} = useContext(CustomUserContext);
  
    const data = isCustom ? customUserData : userData;
  

  const parsedSkills = Array.isArray(data.skills)
    ? data.skills
    : (data.skills || "").split(/,|•|\n/).map(s => s.trim()).filter(Boolean);

  return (
    <div className="w-[210mm] h-[297mm] mx-auto flex bg-white shadow-sm">
      {/* Sidebar - Dark Section */}
      <div className="w-1/3 bg-gray-800 text-white p-6 flex flex-col">
        {/* Profile Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          {data.title && <p className="text-gray-300 text-sm mt-1">{data.title}</p>}
        </div>

        {/* Contact Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-3">CONTACT</h2>
          <div className="space-y-2 text-sm">
            {data.email && <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {data.email}
            </div>}
            {data.phone && <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {data.phone}
            </div>}
            {data.location && <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {data.location}
            </div>}
            {data.linkedIn && <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <a href={data.linkedIn} className="text-blue-300 hover:underline">LinkedIn</a>
            </div>}
            {data.github && <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <a href={data.github} className="text-blue-300 hover:underline">GitHub</a>
            </div>}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-3">SKILLS</h2>
          <div className="grid grid-cols-2 gap-2">
            {parsedSkills.map((skill, i) => (
              <div key={i} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2"></span>
                <span className="text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        {data.education?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-3">EDUCATION</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-bold text-sm">{edu.degree}</h3>
                <p className="text-sm">{edu.institution}</p>
                <div className="text-xs mt-1 space-y-1">
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  <p>{edu.startDate} – {edu.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content - Light Section */}
      <div className="w-2/3 p-6">
        {/* Profile Summary */}
        {data.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">PROFILE</h2>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {data.workExperience?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">WORK EXPERIENCE</h2>
            {data.workExperience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{exp.role}</h3>
                  <span className="text-xs text-gray-600">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between text-sm italic mb-1">
                  <span>{exp.company}</span>
                  {exp.project && <span>{exp.project}</span>}
                </div>
                <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                  {exp.bullets?.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">PROJECTS</h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{proj.name}</h3>
                  <span className="text-xs text-gray-600">{proj.startDate} – {proj.endDate}</span>
                </div>
                <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                  {proj.bullets?.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {data.certifications?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">CERTIFICATIONS</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.certifications.map((cert, i) => (
                <div key={i} className="border-l-2 border-blue-500 pl-2">
                  <h3 className="font-semibold text-sm">{cert.title}</h3>
                  <p className="text-xs text-gray-600">Issued: {cert.issueDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Extracurriculars */}
        {data.extracurriculars?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 mb-1">EXTRACURRICULARS</h2>
            {data.extracurriculars.map((extr, i) => (
              <p key={i}>• {extr.role} at {extr.organization} ({extr.startDate} – {extr.endDate})</p>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default ModernResumeTemplate;