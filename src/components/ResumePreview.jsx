import ModernResumeTemplate from "@/template/ModernResumeTemplate";
import ModernProfessionalTemplate from "@/template/ModernProfessionalTemplate";
import ClassicResumeTemplate from "@/template/ClassicResumeTemplate";
import SimpleResumeTemplate from "@/template/SimpleResumeTemplate";

const ResumePreview = ({ selectedTemplate, isCustom = false }) => {
  return (
    <div className="w-full">
      {selectedTemplate === "modernProfessional" && (
        <ModernProfessionalTemplate isCustom={isCustom} />
      )}
      {selectedTemplate === "modern" && (
        <div className="h-[90vh] border rounded shadow">
          <ModernResumeTemplate isCustom={isCustom} />
        </div>
      )}
      {selectedTemplate === "classic" && (
        <div className="h-[90vh] border rounded shadow">
          <ClassicResumeTemplate isCustom={isCustom} />
        </div>
      )}
      {selectedTemplate === "simple" && (
        <div className="h-[90vh] border rounded shadow">
          <SimpleResumeTemplate isCustom={isCustom} />
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
