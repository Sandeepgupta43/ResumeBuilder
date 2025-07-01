import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { CustomUserContext } from "@/context/CustomUserContext";

const SimpleResumeTemplate = ({ isCustom = false }) => {
  const { userData } = useContext(UserContext);
  const {customUserData} = useContext(CustomUserContext);

  const data = isCustom ? customUserData : userData;


  const skillsArray = Array.isArray(data.skills)
    ? data.skills
    : (data.skills || "").split(/,|•|\n/).map((s) => s.trim()).filter(Boolean);

  return (
    <div className="max-w-[800px] mx-auto px-6 py-8 text-[14px] font-sans leading-relaxed text-gray-900 bg-white border border-gray-300">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-sm text-gray-600 mt-1">
          {data.location} | {data.phone} | {data.email}
          {data.linkedIn && (
            <> | <a href={data.linkedIn} className="text-blue-600 underline">LinkedIn</a></>
          )}
          {data.github && (
            <> | <a href={data.github} className="text-blue-600 underline">GitHub</a></>
          )}
        </p>
      </div>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-1">SUMMARY</h2>
          <p>• {data.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {data.workExperience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-1">WORK EXPERIENCE</h2>
          {data.workExperience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between font-semibold">
                <span>{exp.company}, {exp.role} | {exp.project}</span>
                <span>{exp.startDate} – {exp.endDate}</span>
              </div>
              <ul className="list-disc list-inside ml-4 mt-1">
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
          <h2 className="text-lg font-bold border-b border-gray-300 mb-1">PROJECTS</h2>
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between font-semibold">
                <span>{proj.name}</span>
                <span>{proj.startDate} – {proj.endDate}</span>
              </div>
              <ul className="list-disc list-inside ml-4 mt-1">
                {proj.bullets?.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skillsArray.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-1">SKILLS</h2>
          <p>{skillsArray.join(", ")}</p>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-1">EDUCATION</h2>
          {data.education.map((edu, i) => (
            <p key={i}>
              {edu.degree} - {edu.institution} | GPA: {edu.gpa} | {edu.endDate}
            </p>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-1">CERTIFICATIONS</h2>
          {data.certifications.map((cert, i) => (
            <p key={i}>• {cert.title} | {cert.issueDate}</p>
          ))}
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
  );
};

export default SimpleResumeTemplate;
