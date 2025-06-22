import React, { useContext, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?worker";
import { UserContext } from "../context/UserContext";
import { GoogleGenAI } from "@google/genai";
import toast,{Toaster} from "react-hot-toast";

GlobalWorkerOptions.workerPort = new pdfjsWorker();
const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_Api_key});

const PdfParser = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const { setUserData, userData } = useContext(UserContext);
  const [loading,setLoading] = useState(false);
  

  const customPrompt = `Extract and structure the following resume information in JSON format exactly as specified below. Include only these fields with precise formatting:

    {
        "name": "Full Name",
        "email": "email@example.com",
        "phone": "1234567890",
        "linkedIn": "URL or empty string",
        "github": "URL or empty string",
        "location": "City, State",
        "summary": "2-3 sentence professional summary",
        "skills": "Comma-separated list of technical skills",
        "workExperience": [
            {
                "company": "Company Name",
                "role": "Job Title",
                "startDate": "YYYY-MM",
                "endDate": "YYYY-MM or empty if current",
                "currentlyWorking": true/false,
                "location": "City, State or Remote",
                "bullets": [
                    "Bullet point 1",
                    "Bullet point 2"
                ]
            }
        ],
        "projects": [
            {
                "name": "Project Name",
                "description": "Brief description or empty",
                "startDate": "YYYY-MM",
                "endDate": "YYYY-MM or empty if ongoing",
                "currentlyWorking": true/false,
                "technologies": "Comma-separated tech stack",
                "bullets": [
                    "Key achievement 1",
                    "Key achievement 2"
                ]
            }
        ],
        "education": [
            {
                "institution": "School Name",
                "degree": "Degree Name",
                "fieldOfStudy": "Major or empty",
                "startDate": "YYYY-MM",
                "endDate": "YYYY-MM",
                "gpa": "X.X or empty",
                "description": "Details or empty"
            }
        ],
        "certifications": [],
        "extracurriculars": [
            {
                "organization": "Org Name or empty",
                "role": "Brief description",
                "startDate": "YYYY-MM or empty",
                "endDate": "YYYY-MM or empty",
                "currentlyActive": true/false,
                "location": "City or empty",
                "bullets": []
            }
        ]
    }

    Important rules:
    1. Dates must be in YYYY-MM format only
    2. Empty fields should be empty strings ("") or empty arrays ([])
    3. Skills must be a single comma-separated string
    4. All bullet points must start with action verbs
    5. Summary should be 2-3 concise sentences
    6. Only include verified information from the resume text
    7. Maintain consistent JSON structure even for missing fields
    8. Convert all duration formats to YYYY-MM format
    9. For current positions/projects, set currentlyWorking: true
    10. Never include markdown formatting in the response

    Here is the resume text to parse:
    `

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleParseClick = async () => {
    setLoading(true);
  if (!selectedFile) {
    setLoading(false);
    toast.error("Please select a PDF file first.");
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

      const query = `${customPrompt}\n${extractedText}`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: query }] }]
      });
      const result = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // parse (with fallback)
    const parsed = JSON.parse(result);
    const resumeData = parsed.resume || parsed;
    //console.log(resumeData);

    // map into your context shape
    const userDataUpdate = {
      name:        resumeData.name || "",
      email:       resumeData.email || "",
      phone:       resumeData.phone || "",
      linkedIn:    resumeData.linkedIn || "",
      github:      resumeData.github || "",
      location:    resumeData.location || "",
      summary:     resumeData.summary || "",
      skills:      resumeData.skills.split(',') || "",
      workExperience: (resumeData.workExperience || []).map(exp => ({
        company:          exp.company || "",
        role:             exp.role || "",
        startDate:        exp.startDate || "",
        endDate:          exp.endDate || "",
        currentlyWorking: exp.currentlyWorking || false,
        location:         exp.location || "",
        bullets:          exp.bullets || []
      })),
      projects: (resumeData.projects || []).map((proj) => ({
            name: proj.name || "",
            description: proj.description || "",
            startDate: proj.startDate || "",
            endDate: proj.endDate || "",
            currentlyWorking: proj.currentlyWorking || false,
            technologies: proj.technologies || "",
            bullets: proj.bullets || []
          })),
          education: (resumeData.education || []).map((edu) => ({
            institution: edu.institution || "",
            degree: edu.degree || "",
            fieldOfStudy: edu.fieldOfStudy || "",
            startDate: edu.startDate || "",
            endDate: edu.endDate === "2025-00" ? "2025-05" : edu.endDate,
            gpa: edu.gpa || "",
            description: edu.description || ""
          })),
          certifications: resumeData.certifications || [],
          extracurriculars: (resumeData.extracurriculars || []).map((activity) => ({
            organization: activity.organization || "",
            role: activity.role || "",
            startDate: activity.startDate || "",
            endDate: activity.endDate || "",
            currentlyActive: activity.currentlyActive || false,
            location: activity.location || "",
            bullets: activity.bullets || []
          }))
      
    };

    setUserData(userDataUpdate);
    setText(extractedText);
    setLoading(false);
    toast.success("Resume parsed successfully!");
  } catch (error) {
    console.error("Error parsing PDF:", error);
    alert(`Error parsing PDF: ${error.message}. Please try another file.`);
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
          disabled={loading || !selectedFile}

        >
          {loading ? "Please wait...":"Parse Resume"}

        </button>
      </div>
      <Toaster />
    </>
  );
};

export default PdfParser;