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
          className="shadow-[3px_3px_0_black] text-[#371A70] bg-[#FFD21F] px-4 py-2 font-semibold hover:bg-yellow-300 transition cursor-pointer"
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
