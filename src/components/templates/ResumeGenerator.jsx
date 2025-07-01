import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

const ResumeGenerator = ({ userData, templates, selectedTemplate }) => {
  const [renderKey, setRenderKey] = useState(0);

  // Re-render when template changes
  useEffect(() => {
    setRenderKey((prev) => prev + 1);
  }, [selectedTemplate]);

  const TemplateEntry = templates[selectedTemplate];

  if (!TemplateEntry || typeof TemplateEntry.component !== "function") {
    return (
      <div className="text-red-600 text-sm">
        Invalid or missing template: <strong>{selectedTemplate}</strong>
      </div>
    );
  }

  const TemplateComponent = TemplateEntry.component;

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <div className="flex ">
        <PDFDownloadLink
          key={`${selectedTemplate}-${renderKey}`}
          document={<TemplateComponent userData={userData} />}
          fileName={`${userData?.personal?.name || "resume"}_${selectedTemplate}.pdf`}
          className="shadow-[3px_3px_0_black] text-[#371A70] hover:bg-yellow-300 px-4 py-2 font-semibold transition cursor-pointer"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ResumeGenerator;
