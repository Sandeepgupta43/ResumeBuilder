import { useState } from "react";
import TemplateSelector from "./TemplateSelector";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

const ResumeGenerator = ({ userData, templates }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(
    Object.keys(templates)[0]
  );
  const [renderKey, setRenderKey] = useState(0);

  const TemplateComponent = templates[selectedTemplate].component;
  const DocumentComponent = () => <TemplateComponent userData={userData} />;

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <TemplateSelector
        templates={templates}
        selectedTemplate={selectedTemplate}
        onTemplateChange={(t) => {
          setSelectedTemplate(t);
          setRenderKey((k) => k + 1);
        }}
      />
      <div className="flex  mt-4">
        <PDFDownloadLink
          key={`${selectedTemplate}-${renderKey}`} 
          document={<DocumentComponent />}
          fileName={`${userData?.name || "resume"}_${selectedTemplate}.pdf`}
          className="inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium 
                                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                                border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>

      <PDFViewer key={`${selectedTemplate}-${renderKey}`}>
        <TemplateComponent userData={userData} />
      </PDFViewer>

      
    </div>
  );
};

export default ResumeGenerator;
