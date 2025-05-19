import React, { useContext, useEffect, useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { UserContext } from '../context/UserContext';
import { CustomUserContext } from '../context/CustomUserContext';
import CustomMyPdf from '../PdfFile/CustomMyPdf';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_Api_key });

function CustomJob() {
    const [input, setInput] = useState('');
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState('');
    const [improvementSummary, setImprovementSummary] = useState('');
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    
    const { setUserData: setCustomUserData, customUserData } = useContext(CustomUserContext);

    useEffect(() => {
    const data = localStorage.getItem("userData");
        if (data) {
            try {
                setUserData(JSON.parse(data));
            } catch (e) {
                console.error("Failed to parse userData", e);
            }
        }
    }, []);

    

    const customPrompt = `
        Analyze the job description and my resume. Return two things:
        1. A brief summary of the key improvements made to my resume (as plain text).
        2. The improved resume in JSON format.
        Respond in the following format:

        <ImprovementSummary>
        ...summary here...
        </ImprovementSummary>

        <ImprovedResumeJSON>
        ...JSON here...
        </ImprovedResumeJSON>
    `;

    const extractSections = (text) => {
        try {
            // First try to parse the entire response as JSON
            const jsonResponse = JSON.parse(text.replace(/```json/g, '').replace(/```/g, ''));
            return {
                summary: jsonResponse.ImprovementSummary || '',
                json: JSON.stringify(jsonResponse.ImprovedResumeJSON || {})
            };
        } catch (e) {
            // Fallback to regex parsing if direct JSON parse fails
            const summaryMatch = text.match(/<ImprovementSummary>([\s\S]*?)<\/ImprovementSummary>/);
            const jsonMatch = text.match(/<ImprovedResumeJSON>([\s\S]*?)<\/ImprovedResumeJSON>/);
            
            return {
                summary: summaryMatch ? summaryMatch[1].trim() : '',
                json: jsonMatch ? jsonMatch[1].trim() : ''
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResult('');
        setImprovementSummary('');
        
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setIsLoading(false);
            return;
        }

        try {
            const query = `${customPrompt}\nResume: ${JSON.stringify(userData)}\nJob Description: ${input.trim()}`;
            
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [{ role: "user", parts: [{ text: query }] }]
            });

            const rawText = response.text;
            setResult(rawText);
            console.log("Raw AI Response:", rawText);

            const { summary, json } = extractSections(rawText);
            

            setImprovementSummary(summary);

            if (json) {
                try {
                    const parsed = JSON.parse(json);
                    setCustomUserData(parsed);
                    alert("Enhanced resume saved successfully!");
                } catch (jsonError) {
                    console.error("JSON parsing error:", jsonError);
                    setResult("We received your enhanced resume but had trouble formatting it. The summary is available above.");
                }
            } else {
                setResult("No valid resume data found in the response.");
            }
        } catch (err) {
            console.error("AI/Parsing error:", err);
            setResult("An error occurred while processing your request. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!input.trim()) {
            newErrors.input = 'Please enter job description.';
        }
        return newErrors;
    };

    const cleanJsonText = (rawText) => {
        // Remove leading/trailing non-JSON text like markdown
        const start = rawText.indexOf('{');
        const end = rawText.lastIndexOf('}');
        return rawText.slice(start, end + 1);
    };
    

    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">Custom Job Description</h1>
                <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
                    <textarea
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
                            ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none
                            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                            disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
                        placeholder="Paste your job description here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                    {errors.input && <p className="text-red-500 text-sm">{errors.input}</p>}
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm 
                            font-medium ring-offset-background bg-green-400 cursor-pointer transition-colors focus-visible:outline-none 
                            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                            disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground 
                            hover:bg-primary/90 h-10 px-4 py-2 w-full"
                        type="submit"
                    >
                        Generate ATS Resume
                    </button>
                </form>

                {improvementSummary && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4 rounded-md shadow-sm">
                        <h2 className="font-bold text-blue-800 mb-2">Key Improvements by AI:</h2>
                        <p className="text-blue-700 whitespace-pre-wrap">{improvementSummary}</p>
                    </div>
                )}

            </div>
            <div>
                <CustomMyPdf userData={customUserData}/>
            </div>
        </>
    );
}

export default CustomJob;