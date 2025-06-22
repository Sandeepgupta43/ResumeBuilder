import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { UseUserData } from "../components/UseUserData";
import ResumeTemplate from "../components/templates/ResumeTemplate";
import ModernResumeTemplate from "../components/templates/ModernResumeTemplate";
import ClassicResumeTemplate from "../components/templates/ClassicResumeTemplate";
import ResumeGenerator from "../components/templates/ResumeGenerator";
import ProfessionalResumeTemplate from "../components/templates/ProfessionalResumeTemplate";
import BusinessResumeTemplate from '../components/templates/BusinessResumeTemplate'

const TEMPLATES = {
  classic: {
    component: ClassicResumeTemplate,
    name: "Classic",
    description: "Professional two-column layout",
    category: "Traditional"
  },
  modern: {
    component: ModernResumeTemplate,
    name: "Modern",
    description: "Contemporary design with sidebar",
    category: "Creative"
  },
  simple: {
    component: ResumeTemplate,
    name: "Simple",
    description: "Clean single-column format",
    category: "Minimal"
  },
  professional: {
    component: ProfessionalResumeTemplate,
    name: "Professional",
    description: "Corporate layout with clear sections",
    category: "Business"
  },
  business: {
    component: BusinessResumeTemplate,
    name: "Business",
    description: "Analytical layout with competencies grid",
    category: "Business"
  }
};

const MyPdf = ({ isCustom = false }) => {
  const { userData, isLoading, error } = UseUserData(isCustom);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 p-4">
      <ResumeGenerator userData={userData} templates={TEMPLATES} />
    </div>
  );
};

export default MyPdf;
