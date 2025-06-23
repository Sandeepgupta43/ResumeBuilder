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
          className="shadow-[3px_3px_0_black] text-[#371A70] hover:bg-yellow-300 px-4 py-2  font-semibold transition cursor-pointer "
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
