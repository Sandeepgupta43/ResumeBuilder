import { createContext, useState } from "react";

export const CustomUserContext = createContext();

export const CustomUserProvider = ({ children }) => {
  const [customUserData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedIn: "",
    github: "",
    location: "",
    summary: "",
    skills: "",
    workExperience: [],
    projects: [],
    education: [],
    certifications: [],
    extracurriculars: [],
  });

  return (
    <CustomUserContext.Provider value={{ customUserData, setUserData }}>
      {children}
    </CustomUserContext.Provider>
  );
};
