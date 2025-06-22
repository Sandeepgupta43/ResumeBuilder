import { useState } from "react";
import TemplateSelector from "./TemplateSelector";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

const ResumeGenerator = ({ userData, templates }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(Object.keys(templates)[0]);
  const [renderKey, setRenderKey] = useState(0);

  const TemplateComponent = templates[selectedTemplate].component;

  if (!userData) return <p className="text-red-600">No user data available.</p>;

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <TemplateSelector
        templates={templates}
        selectedTemplate={selectedTemplate}
        onTemplateChange={(t) => {
          setSelectedTemplate(t);
          setRenderKey((k) => k + 1); // Force re-render for PDF
        }}
      />

      <div className="flex mt-4">
        <PDFDownloadLink
          key={`${selectedTemplate}-${renderKey}`}
          document={<TemplateComponent userData={userData} />}
          fileName={`${userData?.name || "resume"}_${selectedTemplate}.pdf`}
          className="inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium 
            ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
            border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>

      <div className="border border-gray-300 rounded shadow overflow-hidden h-[90vh]">
        <PDFViewer key={`${selectedTemplate}-${renderKey}`} style={{ width: "100%", height: "100%" }}>
          <TemplateComponent userData={userData} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default ResumeGenerator;
