import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { UseUserData } from "../components/UseUserData";
import ResumeTemplate from "../components/templates/ResumeTemplate";
import ModernResumeTemplate from "../components/templates/ModernResumeTemplate";
import ClassicResumeTemplate from "../components/templates/ClassicResumeTemplate";
import ProfessionalResumeTemplate from "../components/templates/ProfessionalResumeTemplate";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorDisplay from "../components/common/ErrorDisplay";
import { useMediaQuery } from "../hooks/useMediaQuery.js";

const TEMPLATES = {
  classic: {
    component: ClassicResumeTemplate,
  },
  modern: {
    component: ModernResumeTemplate,
  },
  simple: {
    component: ResumeTemplate,
  },
  professional: {
    component: ProfessionalResumeTemplate,
  },
};

const mapTemplateKey = {
  modernProfessional: "professional",
};

const MyPdf = ({ isCustom = false, selectedTemplate }) => {
  const { userData, isLoading, error } = UseUserData(isCustom);
  const [isDownloading, setIsDownloading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const resolvedTemplate = mapTemplateKey[selectedTemplate] || selectedTemplate;

  const handleDownloadClick = async () => {
    const TemplateComponent = TEMPLATES[resolvedTemplate]?.component;

    if (!TemplateComponent || !userData) {
      alert("Missing template or data");
      return;
    }

    try {
      setIsDownloading(true);
      
      // Show loading state for at least 500ms to prevent flash
      const minLoadingTime = Promise.all([
        new Promise(resolve => setTimeout(resolve, 500)),
        pdf(<TemplateComponent userData={userData} />).toBlob()
      ]);

      const blob = await minLoadingTime.then(([, blob]) => blob);
      saveAs(blob, `${userData.name || 'resume'}_${new Date().toISOString().slice(0, 10)}.pdf`);
      
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("PDF generation failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) return <LoadingSpinner size={isMobile ? "small" : "medium"} />;
  if (error) return <ErrorDisplay error={error} compact={isMobile} />;

  return (
    <div className="w-full flex justify-center items-center p-2 sm:p-4">
      <button
        onClick={handleDownloadClick}
        disabled={isDownloading || isLoading}
        className={`shadow-[2px_2px_0_black] sm:shadow-[3px_3px_0_black] text-[#371A70] hover:bg-yellow-300 px-3 py-1 sm:px-4 sm:py-2 font-semibold transition cursor-pointer
          ${isDownloading ? "opacity-75 cursor-not-allowed" : ""}
          ${isMobile ? "text-sm" : "text-base"}`}
        aria-label={isDownloading ? "Generating PDF" : "Download Resume"}
      >
        {isDownloading ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner size="small" />
            {isMobile ? "Generating..." : "Generating PDF..."}
          </span>
        ) : (
          <>
            {isMobile ? "Download" : "Download Resume"}
          </>
        )}
      </button>
    </div>
  );
};

export default MyPdf;