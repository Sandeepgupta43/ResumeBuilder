import React, { useContext, useEffect, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?worker";
import { UserContext } from "../context/UserContext";

GlobalWorkerOptions.workerPort = new pdfjsWorker();

const parseResumeData = (text) => {
  // Basic information
  const nameMatch = text.match(/^(?:Page \d+:\s*\n)?([A-Z][A-Za-z\s]+[A-Za-z])(?=\s|$)/m);
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  const phoneMatch = text.match(/(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/);
  
  // Sections
  const skillsMatch = text.match(/(?:TECHNICAL\s*)?SKILLS\s*:?\s*([\s\S]*?)(?=WORK\s*EXPERIENCE|EDUCATION|PROJECTS|ACHIEVEMENTS|CERTIFICATIONS|EXTRACURRICULAR|$)/i);
  const workExpMatch = text.match(/(?:WORK\s*)?EXPERIENCE\s*:?\s*([\s\S]*?)(?=EDUCATION|PROJECTS|ACHIEVEMENTS|CERTIFICATIONS|EXTRACURRICULAR|SKILLS|$)/i);
  const educationMatch = text.match(/EDUCATION\s*:?\s*([\s\S]*?)(?=WORK|PROJECTS|ACHIEVEMENTS|CERTIFICATIONS|EXTRACURRICULAR|SKILLS|$)/i);
  const projectMatch = text.match(/PROJECTS\s*:?\s*([\s\S]*?)(?=WORK|EDUCATION|ACHIEVEMENTS|CERTIFICATIONS|EXTRACURRICULAR|SKILLS|$)/i);
  const achievementsMatch = text.match(/ACHIEVEMENTS\s*:?\s*([\s\S]*?)(?=WORK|EDUCATION|PROJECTS|CERTIFICATIONS|EXTRACURRICULAR|SKILLS|$)/i);
  const certificatesMatch = text.match(/(?:CERTIFICATIONS|CERTIFICATES)\s*:?\s*([\s\S]*?)(?=WORK|EDUCATION|PROJECTS|ACHIEVEMENTS|EXTRACURRICULAR|SKILLS|$)/i);
  const extracurricularMatch = text.match(/(?:EXTRACURRICULAR\s*ACTIVITIES|ACTIVITIES)\s*:?\s*([\s\S]*?)(?=WORK|EDUCATION|PROJECTS|ACHIEVEMENTS|CERTIFICATIONS|SKILLS|$)/i);

  return {
    name: nameMatch?.[1]?.trim() || "Not found",
    email: emailMatch?.[0] || "Not found",
    phone: phoneMatch?.[0] || "Not found",
    skills: skillsMatch?.[1]?.trim() || "Not found",
    workExperience: workExpMatch?.[1]?.trim() || "Not found",
    education: educationMatch?.[1]?.trim() || "Not found",
    projects: projectMatch?.[1]?.trim() || "Not found",
    achievements: achievementsMatch?.[1]?.trim() || "Not found",
    certificates: certificatesMatch?.[1]?.trim() || "Not found",
    extracurricular: extracurricularMatch?.[1]?.trim() || "Not found"
  };
};

// Helper: "Feb 2024" → "2024-02"
function convertToISO(monthYear) {
  if (!monthYear) return "";
  
  const months = {
    jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
    jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12"
  };

  const [mon, year] = monthYear.split(" ");
  if (!mon || !year) return "";
  
  const month = months[mon.toLowerCase().slice(0, 3)];
  return `${year}-${month}`;
}

// Parse work experience entries
function parseWorkExperience(raw) {
  if (!raw || typeof raw !== 'string') return [];
  
  // Split into individual experiences
  const experiences = raw.split(/(?=\n\s*(?:[A-Z][a-z]+ [A-Z][a-z]+|\w+ \d{4}))/)
    .map(exp => exp.trim())
    .filter(exp => exp.length > 0);

  return experiences.map(exp => {
    // Split into lines and filter out empty ones
    const lines = exp.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return null;

    // First line typically contains role, company, and dates
    const firstLine = lines[0];
    const roleCompanyMatch = firstLine.match(/^(.*?)\s*(?:\||at|@)\s*(.*?)\s*(?:\||-|–|—|to|\s)\s*(.*)$/i);
    
    let role = "", company = "", dateRange = "";
    if (roleCompanyMatch) {
      role = roleCompanyMatch[1]?.trim() || "";
      company = roleCompanyMatch[2]?.trim() || "";
      dateRange = roleCompanyMatch[3]?.trim() || "";
    } else {
      // Fallback if the pattern doesn't match
      const parts = firstLine.split(/\s{2,}/);
      role = parts[0]?.trim() || "";
      company = parts[1]?.trim() || "";
      dateRange = parts[2]?.trim() || "";
    }

    const [startDateRaw, endDateRaw] = dateRange.split(/\s*(?:-|–|—|to)\s*/).map(s => s.trim());
    const startDate = convertToISO(startDateRaw);
    const currentlyWorking = endDateRaw?.toLowerCase().includes("present") || false;
    const endDate = currentlyWorking ? "" : convertToISO(endDateRaw);

    // Remaining lines are bullet points
    const bullets = lines.slice(1)
      .map(line => line.replace(/^[•\-*\s]+/, '').trim())
      .filter(line => line.length > 0);

    return {
      company,
      role,
      startDate,
      endDate,
      currentlyWorking,
      location: "", // Can be enhanced to extract location if present
      bullets,
    };
  }).filter(exp => exp !== null);
}

// Parse education entries
function parseEducation(raw) {
  if (!raw || typeof raw !== 'string') return [];
  
  // Split into individual education entries
  const entries = raw.split(/(?=\n\s*(?:[A-Z][a-z]+ [A-Z][a-z]+|\w+ \d{4}))/)
    .map(entry => entry.trim())
    .filter(entry => entry.length > 0);

  return entries.map(entry => {
    const lines = entry.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return null;

    // First line typically contains institution and degree
    const firstLine = lines[0];
    const institutionDegreeMatch = firstLine.match(/^(.*?)\s*(?:\||,|:|\s-\s)\s*(.*?)\s*(?:\||-|–|—|to|\s)\s*(.*)$/i);
    
    let institution = "", degree = "", dates = "", gpa = "";
    if (institutionDegreeMatch) {
      institution = institutionDegreeMatch[1]?.trim() || "";
      degree = institutionDegreeMatch[2]?.trim() || "";
      dates = institutionDegreeMatch[3]?.trim() || "";
    } else {
      // Fallback if the pattern doesn't match
      const parts = firstLine.split(/\s{2,}/);
      institution = parts[0]?.trim() || "";
      degree = parts[1]?.trim() || "";
      dates = parts[2]?.trim() || "";
    }

    // Try to extract GPA if present
    const gpaMatch = entry.match(/(?:GPA|Grade):?\s*([0-9.]+\s*\/?\s*[0-9.]*)/i);
    gpa = gpaMatch?.[1]?.trim() || "";

    // Parse dates if present
    const [startDateRaw, endDateRaw] = dates.split(/\s*(?:-|–|—|to)\s*/).map(s => s.trim());
    const startDate = convertToISO(startDateRaw);
    const endDate = convertToISO(endDateRaw);

    return {
      institution,
      degree,
      startDate,
      endDate,
      gpa,
    };
  }).filter(entry => entry !== null);
}

// Parse project entries
function parseProjects(raw) {
  if (!raw || typeof raw !== 'string') return [];

  // Split into individual projects
  const projects = raw.split(/(?=\n\s*(?:[A-Z].+? - \w+ \d{4}))/)
    .map(proj => proj.trim())
    .filter(proj => proj.length > 0);

  return projects.map(proj => {
    const lines = proj.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return null;

    const firstLine = lines[0];
    const [title, dateRangeRaw] = firstLine.split(/\s+-\s+/);
    const name = title.trim();
    const [startDateRaw, endDateRaw] = (dateRangeRaw || "").split(/\s*(?:-|–|—|to)\s*/).map(s => s.trim());

    const startDate = convertToISO(startDateRaw);
    const endDate = convertToISO(endDateRaw);
    const currentlyWorking = endDateRaw?.toLowerCase().includes("present") || false;

    // Last line often contains technologies
    let technologies = [];
    const techLine = lines.find(l => /Tech\s*Stack|Technologies/i.test(l));
    if (techLine) {
      const techMatch = techLine.match(/:\s*(.*)/);
      technologies = techMatch?.[1]?.split(/[,;]\s*/).map(t => t.trim()) || [];
    }

    // Extract bullet points (excluding the first line and tech stack line)
    const bullets = lines.slice(1)
      .filter(line => !/Tech\s*Stack|Technologies/i.test(line))
      .map(line => line.replace(/^[•\-*\s]+/, '').trim())
      .filter(line => line.length > 0);

    return {
      name,
      startDate,
      endDate,
      currentlyWorking,
      technologies,
      bullets,
    };
  }).filter(proj => proj !== null);
}


// Parse certificates
function parseCertificates(raw) {
  if (!raw || typeof raw !== 'string') return [];
  
  // Split into individual certificates
  const certificates = raw.split(/(?=\n\s*(?:[A-Z][a-z]+ [A-Z][a-z]+|\w+ \d{4}|Certificate|[\"'].*?[\"']))/)
    .map(cert => cert.trim())
    .filter(cert => cert.length > 0);

  return certificates.map(cert => {
    const lines = cert.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return null;

    // First line typically contains certificate name
    const name = lines[0].trim();
    
    // Try to extract issuer and date if present
    let issuer = "", date = "";
    if (lines.length > 1) {
      const issuerMatch = lines[1].match(/(?:by|from)\s*(.*?)(?:\s*-\s*(.*))?$/i);
      if (issuerMatch) {
        issuer = issuerMatch[1]?.trim() || "";
        date = issuerMatch[2]?.trim() || "";
      } else {
        issuer = lines[1].trim();
      }
    }

    return {
      name,
      issuer,
      date,
    };
  }).filter(cert => cert !== null);
}

// Parse achievements
function parseAchievements(raw) {
  if (!raw || typeof raw !== 'string') return [];
  
  // Split into individual achievements
  return raw.split('\n')
    .map(line => line.replace(/^[•\-*\s]+/, '').trim())
    .filter(line => line.length > 0)
    .map(achievement => ({ description: achievement }));
}

// Parse extracurricular activities
function parseExtracurricular(raw) {
  if (!raw || typeof raw !== 'string') return [];
  
  // Split into individual activities
  const activities = raw.split(/(?=\n\s*(?:[A-Z][a-z]+ [A-Z][a-z]+|\w+ \d{4}|[\"'].*?[\"']))/)
    .map(act => act.trim())
    .filter(act => act.length > 0);

  return activities.map(act => {
    const lines = act.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return null;

    // First line typically contains activity name and optionally role/dates
    const firstLine = lines[0];
    const activityMatch = firstLine.match(/^(.*?)\s*(?:\||\(|\[|\s-\s|\s:\s)\s*(.*)$/);
    
    let name = "", details = "";
    if (activityMatch) {
      name = activityMatch[1]?.trim() || "";
      details = activityMatch[2]?.trim() || "";
    } else {
      name = firstLine.trim();
    }

    // Try to extract role if present
    const roleMatch = details.match(/(?:Role|Position):?\s*(.*)/i);
    const role = roleMatch?.[1]?.trim() || "";

    // Try to extract dates if present
    const dateMatch = details.match(/(\w+ \d{4})\s*(?:-|–|—|to)\s*(\w+ \d{4}|Present)/i);
    const startDate = dateMatch?.[1] ? convertToISO(dateMatch[1]) : "";
    const endDate = dateMatch?.[2] ? convertToISO(dateMatch[2]) : "";

    // Remaining lines are description
    const description = lines.slice(1)
      .map(line => line.replace(/^[•\-*\s]+/, '').trim())
      .filter(line => line.length > 0)
      .join('\n');

    return {
      name,
      role,
      startDate,
      endDate,
      description,
    };
  }).filter(act => act !== null);
}

const PdfParser = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const { setUserData, userData } = useContext(UserContext);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleParseClick = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file first.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async function () {
      try {
        const typedArray = new Uint8Array(this.result);
        const pdf = await getDocument({ data: typedArray }).promise;
        let extractedText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str).join(" ");
          extractedText += `\n\nPage ${pageNum}:\n${strings}`;
        }

        const resumeData = parseResumeData(extractedText);
        
        // Parse all sections
        const parsedData = {
          ...resumeData,
          workExperience: parseWorkExperience(resumeData.workExperience),
          education: parseEducation(resumeData.education),
          projects: parseProjects(resumeData.projects),
          achievements: parseAchievements(resumeData.achievements),
          certificates: parseCertificates(resumeData.certificates),
          extracurricular: parseExtracurricular(resumeData.extracurricular),
        };

        setText(extractedText);
        setUserData(prev => ({
          ...prev,
          ...parsedData
        }));
        
        console.log("Parsed Resume Data:", parsedData);
        console.log("Extreacted data : ",extractedText);
      } catch (error) {
        console.error("Error parsing PDF:", error);
        alert("Error parsing PDF. Please try another file.");
      }
    };

    fileReader.readAsArrayBuffer(selectedFile);
  };

  return (
    <>
      <h1 className="font-semibold font-stretch-150%">Import information from existing resume</h1>
      <div className="flex items-center space-x-4 mt-2">
        {/* Styled File Input */}
        <label
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 
          rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
        >
          <span>Upload PDF Resume</span>
          <input
            type="file"
            accept=".pdf"
            className="sr-only"
            onChange={handleFileSelect}
          />
        </label>

        {/* Parse Button */}
        <button
          onClick={handleParseClick}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer
          ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
          disabled:opacity-50 bg-amber-900 text-white hover:bg-amber-800 h-10 px-4 py-2"
          type="button"
        >
          Parse Resume
        </button>
      </div>
    </>
  );
};

export default PdfParser;