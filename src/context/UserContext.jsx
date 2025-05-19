import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedIn:"",
    github:"",
    location:"",
    summary:"",
    skills: "",
    workExperience: [],
    projects: [],
    education: [],
    certifications: [],  
    extracurriculars: []  
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};