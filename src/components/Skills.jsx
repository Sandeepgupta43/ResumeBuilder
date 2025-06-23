import React, { useState, useEffect } from 'react'
import { UseUserData } from './UseUserData';

function Skills({ isCustom = false }) {
    const [skill, setSkill] = useState('');
    const [skills, setSkills] = useState([]);
    const { userData, setUserData } = UseUserData(isCustom);

    // Initialize skills from userData if available
    useEffect(() => {
        if (userData.skills) {
            const initialSkills = typeof userData.skills === 'string'
                ? userData.skills.split(/\s*,\s*|\s*;\s*|\n/).filter(s => s.trim())
                : userData.skills;
            setSkills(initialSkills);
        }
    }, [userData]);


    const handleSkill = () => {
        if (skill.trim().length === 0) return;
        const newSkills = [...skills, skill.trim()];
        setSkills(newSkills);
        setSkill('');

        // Update userData context
        setUserData(prev => ({
            ...prev,
            skills: newSkills.join(', ')
        }));
    };
    
    return (
        <div className='mt-8'>
            <h2 className="font-semibold text-gray-900 text-xl mb-6">Skills</h2>
            <div className="flex gap-2">
                <input
                    className="flex h-10 w-full rounded-md border border-input bg-background 
                                    px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm 
                                    file:font-medium file:text-foreground placeholder:text-muted-foreground 
                                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                                    focus-visible:border-ring focus-visible:rounded-sm disabled:cursor-not-allowed 
                                    disabled:opacity-50 max-w-48"
                    placeholder="Enter a skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                />
                <button
                    className="p-2 inline-flex justify-center items-center gap-2.5 border-black bg-white outline-1 outline-offset-[-1px] outline-violet-200 text-black text-sm font-semibold shadow-[3px_3px_0_black] cursor-pointer"
                    type="button"
                    onClick={handleSkill}
                >
                    Add Skill
                </button>
            </div>
            <div className='flex gap-2 mb-2 flex-wrap mt-4'>
                {skills.map((data, index) => (
                    <div key={index} className='inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm py-1 px-2'>
                        {data}
                        {data.length > 0 && (
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium cursor-pointer 
                                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                                disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md ml-1 h-4 w-4 p-0"
                                type="button"
                                onClick={() => setSkills(prev => prev.filter((_, i) => i !== index))}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-x h-3 w-3">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </button>
                        )}


                    </div>
                ))}

            </div>
            <br />
        </div>
    )
}

export default Skills