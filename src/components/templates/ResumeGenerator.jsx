import { useState } from "react";
import TemplateSelector from "./TemplateSelector";
import { PDFViewer } from "@react-pdf/renderer";

// components/ResumeGenerator.jsx
const ResumeGenerator = ({ userData, templates }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(Object.keys(templates)[0]);
  const [renderKey, setRenderKey] = useState(0);
  
  const TemplateComponent = templates[selectedTemplate].component;

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <TemplateSelector 
        templates={templates}
        selectedTemplate={selectedTemplate}
        onTemplateChange={(t) => {
          setSelectedTemplate(t);
          setRenderKey(k => k + 1);
        }}
      />
      
      <PDFViewer key={`${selectedTemplate}-${renderKey}`}>
        <TemplateComponent userData={userData} />
      </PDFViewer>
    </div>
  );
};

export default ResumeGenerator;