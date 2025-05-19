import { useContext, useEffect, useState } from 'react';
import PdfParser from './PdfParser';
import { UserContext } from '../context/UserContext';
import WorkExperience from './WorkExperience';
import Projects from './Projects';
import Education from './Education';
import Certifications from './Certifications';
import Extracurriculars from './Extracurriculars';
import MyPdf from '../PdfFile/MyPdf';


export default function From() {
    const [skill,setSkill] = useState('');
    const [skills,setSkills] = useState([]);
    const [isVisible,setIsVisible] = useState(false);
    const [errors,setErrors] = useState({});

    const {userData,setUserData} = useContext(UserContext);

    // Initialize skills from userData if available
    useEffect(() => {
        if (userData.skills) {
        const initialSkills = typeof userData.skills === 'string' 
            ? userData.skills.split(/\s*,\s*|\s*;\s*|\n/).filter(s => s.trim())
            : userData.skills;
        setSkills(initialSkills);
        }
    }, [userData]);

    useEffect(() => {
        const localUserData = localStorage.getItem("userData");
        if(localUserData) {
            try {
                const parsedData = JSON.parse(localUserData);
                setUserData(parsedData);
            } catch(error) {
                console.error('Error parsing user data from localStorage:',error);
            }
        }
    },[setUserData])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!userData.name.trim()) {
        newErrors.name = 'Full Name is required';
        } 

        if (!userData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!userData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(userData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        if (!userData.linkedIn.trim()) {
            newErrors.linkedIn = 'LinkedIn profile is required';
        }

        if (!userData.location.trim()) {
            newErrors.location = 'City is required';
        }

        if (!userData.summary.trim()) {
            newErrors.summary = 'Summary is required';
        }

        return newErrors;
    };


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
    const removeSkill = (index) => {
        const newSkills = skills.filter((_, i) => i !== index);
        setSkills(newSkills);
        
        // Update userData context
        setUserData(prev => ({
        ...prev,
        skills: newSkills.join(', ')
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();  
        const validationErrors = validate();
        setErrors(validationErrors);
        
        
    };

    const handleSave = () => {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            alert("Please fix validation errors before saving.");
            return;
        }
        try {
            localStorage.setItem('userData', JSON.stringify(userData));
            alert('User data saved successfully!');
        } catch (err) {
            console.error('Failed to save:', err);
        }
    };
    
  return (
    <div className="flex justify-center items-center mt-10 mb-10">
        <div className='w-3xl  p-4 ' >
            <div className="space-y-12">
                <h2 className="font-bold text-gray-900 text-2xl">Resume</h2>

                {/* <div className="flex items-center space-x-4">
                    <label 
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 
                                rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                        <span>
                            Upload PDF Resume
                        </span>
                        <input 
                            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 
                                    text-sm file:border-0 file:bg-transparent file:text-sm 
                                    file:font-medium file:text-foreground placeholder:text-muted-foreground 
                                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                                    focus-visible:border-ring focus-visible:rounded-sm disabled:cursor-not-allowed 
                                    disabled:opacity-50 sr-only w-auto" 
                            accept=".pdf" 
                            type="file" />
                    </label>
                    <button 
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer
                                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                                disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                                border bg-amber-900 text-white " 
                        type="submit" 
                        disabled="">
                        Parse Resume
                    </button>
                </div> */}
                <PdfParser />
                <hr/>
                <button 
                    className="inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium 
                                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                                border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    onClick={() => setIsVisible(!isVisible)}
                    >
                {isVisible ? 'Hide Preview' : 'Preview Resume'}
                </button>

                {isVisible && <MyPdf userData={userData}/>}

                <form onSubmit={handleSubmit}>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-lg font-medium text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                id="first-name"
                                name="name"
                                type="text"
                                value={userData.name}
                                onChange={handleInputChange}
                                autoComplete="given-name"
                                className={`block w-full  bg-white px-3 py-1.5 text-base text-gray-900 
                                    outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                                    focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.name ?"border-red-500" : "border-gray-300"}`}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-lg font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    type="email"
                                    autoComplete="email"
                                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="LinkedIn" className="block text-lg font-medium text-gray-900">
                                LinkedIn
                            </label>
                            <div className="mt-2">
                                <input
                                id="LinkedIn"
                                name="linkedIn"
                                value={userData.linkedIn}
                                onChange={handleInputChange}
                                type="text"
                                autoComplete="given-name"
                                className={`block w-full  bg-white px-3 py-1.5 text-base text-gray-900 
                                    outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                                    focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.name ?"border-red-500" : "border-gray-300"}`}
                                />
                                {errors.linkedIn && <p className="text-red-500 text-sm mt-1">{errors.linkedIn}</p>}

                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="ph-number" className="block text-lg font-medium text-gray-900">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                id="ph-number"
                                name="phone"
                                onChange={handleInputChange}
                                value={userData.phone}
                                autoComplete="given-name"
                                className={`block w-full  bg-white px-3 py-1.5 text-base text-gray-900 
                                    outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                                    focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.phone ?"border-red-500" : "border-gray-300"}`}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="github" className="block text-lg font-medium text-gray-900">
                                GitHub
                            </label>
                            <div className="mt-2">
                                <input
                                id="github"
                                name="github"
                                onChange={handleInputChange}
                                value={userData.github}
                                type="text"
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="location" className="block text-lg font-medium text-gray-900">
                                City
                            </label>
                            <div className="mt-2">
                                <input
                                id="location"
                                name="location"
                                onChange={handleInputChange}
                                value={userData.location}
                                type="text"
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}

                            </div>
                        </div>

                    </div>
                    
                    <div className="col-span-full mt-3">
                        <label htmlFor="summary" className="block text-lg font-medium text-gray-900">
                            Summary
                        </label>
                        <div className="mt-2">
                            <textarea
                            id="summary"
                            name="summary"
                            onChange={handleInputChange}
                            value={userData.summary}
                            rows={3}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            defaultValue={''}
                            />
                            {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}

                        </div>
                    </div><br/>
                    <button 
                        type="submit"
                        className="mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer
                            ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                            focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                            disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
                            border"
                    >
                        Save 
                    </button>
                </form>

                <hr/>

                {/* <h2 className="font-semibold text-gray-900 text-xl mb-6">Work Experience</h2> */}
                <WorkExperience />
                
                <hr/>

                <Projects />

                <hr/>

                <Education />

                <hr/>

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
                        className="inline-flex items-center justify-center bg-amber-950 text-white cursor-pointer whitespace-nowrap rounded-md text-sm font-medium 
                            ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                            focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                            disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" 
                        type="button"
                        onClick={handleSkill}
                    >
                        Add Skill
                    </button>
                </div>
                <div className='flex gap-2 mb-2 flex-wrap'>
                    {skills.map((data,index) => (
                        <div key={index} className='inline-flex bg-gray-200 items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm py-1 px-2'>
                            {data}
                            {data.length > 0 && (
                                <button 
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium cursor-pointer 
                                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                                disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md ml-1 h-4 w-4 p-0"
                            type="button"
                            onClick={() => setSkills(prev => prev.filter((_,i) => i !== index))}
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
                <br/>
                <hr/>

                <Certifications />
                
                <hr/>
                <Extracurriculars />
                
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900">
                    Cancel
                    </button>
                    <button
                    type="submit"
                    onClick={handleSave}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Save
                    </button>
                </div>
            </div>
        </div>
    </div>
    
  )
}
