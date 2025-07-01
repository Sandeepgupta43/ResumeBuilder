import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { CustomUserContext } from '@/context/CustomUserContext';

const ClassicResumeTemplate = ({ isCustom = false }) => {
  const { userData } = useContext(UserContext);
  const {customUserData} = useContext(CustomUserContext);

  const data = isCustom ? customUserData : userData;


  const skillsArray = Array.isArray(data.skills)
    ? data.skills
    : (data.skills || '').split(/,|•|\n/).map((s) => s.trim()).filter(Boolean);

  return (
    <div className="w-[210mm] h-[297mm] mx-auto p-10 bg-white text-black text-[12pt] leading-snug font-serif">
      {/* Header */}
      <div className="text-center border-b border-black pb-3 mb-6">
        <h1 className="text-[18pt] font-bold tracking-wider">{data.name}</h1>
        <div className="flex justify-center flex-wrap gap-x-4 mt-1 text-[11pt]">
          {data.location && <span>{data.location}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.email && <span>{data.email}</span>}
          {data.linkedIn && (
            <a href={data.linkedIn} className="text-blue-700 underline">LinkedIn</a>
          )}
          {data.github && (
            <a href={data.github} className="text-blue-700 underline">GitHub</a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-[14pt] font-bold border-b border-gray-400 mb-2">SUMMARY</h2>
          <p className="text-justify">{data.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - 2/3 width */}
        <div className="col-span-2">
          {/* Experience */}
          {data.workExperience?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-[14pt] font-bold border-b border-gray-400 mb-2">PROFESSIONAL EXPERIENCE</h2>
              {data.workExperience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold">{exp.role}</h3>
                    <span className="text-[11pt] italic">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="flex justify-between italic text-[11pt] mb-1">
                    <span>{exp.company}</span>
                    {exp.project && <span>{exp.project}</span>}
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.bullets?.map((b, j) => (
                      <li key={j} className="text-justify">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-[14pt] font-bold border-b border-gray-400 mb-2">PROJECTS</h2>
              {data.projects.map((proj, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold">{proj.name}</h3>
                    <span className="text-[11pt] italic">{proj.startDate} – {proj.endDate}</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {proj.bullets?.map((b, j) => (
                      <li key={j} className="text-justify">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column - 1/3 width */}
        <div className="col-span-1">
          {/* Education */}
          {data.education?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-[14pt] font-bold border-b border-gray-400 mb-2">EDUCATION</h2>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="italic">{edu.institution}</p>
                  <div className="text-[11pt] space-y-1 mt-1">
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    <p>Graduated: {edu.endDate}</p>
                    {edu.description && <p className="mt-1">{edu.description}</p>}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skillsArray.length > 0 && (
            <section className="mb-6">
              <h2 className="text-[14pt] font-bold border-b border-gray-400 mb-2">TECHNICAL SKILLS</h2>
              <div className="grid grid-cols-1 gap-2">
                {skillsArray.map((s, i) => (
                  <div key={i} className="flex items-start">
                    <span className="inline-block w-1 h-1 mt-2 mr-2 bg-black rounded-full"></span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-[14pt] font-bold border-b border-gray-400 mb-2">CERTIFICATIONS</h2>
              {data.certifications.map((cert, i) => (
                <div key={i} className="mb-2">
                  <p>• {cert.title}</p>
                  <p className="text-[10pt] text-gray-600">Issued: {cert.issueDate}</p>
                </div>
              ))}
            </section>
          )}

          {/* Extracurriculars */}
          {data.extracurriculars?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-[14pt] font-bold border-b border-gray-400 mb-2">ACTIVITIES</h2>
              {data.extracurriculars.map((ext, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold">{ext.role}</p>
                  <p className="text-[11pt]">{ext.organization}</p>
                  <p className="text-[10pt] text-gray-600">{ext.startDate} – {ext.endDate}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassicResumeTemplate;