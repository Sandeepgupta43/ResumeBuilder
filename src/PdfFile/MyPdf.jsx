import React, { useContext } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ResumeTemplate from "../components/ResumeTemplate";

import { UseUserData } from "../components/UseUserData";

const MyPdf = ({ isCustom = false }) => {
  const { userData } = UseUserData(isCustom);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
      {/* Download Link */}
      <PDFDownloadLink
        document={<ResumeTemplate userData={userData} />}
        fileName="resume.pdf"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow"
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
      </PDFDownloadLink>

      {/* PDF Preview */}
      <div className="w-full max-w-6xl h-[80vh] border border-gray-300 shadow-md">
        <PDFViewer width="100%" height="100%" showToolbar>
          <ResumeTemplate userData={userData} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default MyPdf;
