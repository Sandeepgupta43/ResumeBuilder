import React, { useContext } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ResumeTemplate from '../components/ResumeTemplate';
import { CustomUserContext } from '../context/CustomUserContext';

const CustomMyPdf = () => {
  const { customUserData } = useContext(CustomUserContext);
  const sampleUserData = {
  name: "Aakash Sahu",
  email: "sahu.Sivyansh@gmail.com",
  phone: "+91-000005220",
  linkedIn: "https://www.linkedin.com/in/divyansh-sahu-70809817a/",
  github: "https://www.linkedin.com/in/divyansh-sahu-70809817a/", // Not found in the resume
  location: "Bangalore, India",
  summary: "Results-driven Data Engineer with 3.6 years of experience in ETL orchestration, data pipeline automation, and big data processing. Skilled in data modeling, data warehousing, and performance tuning to drive actionable business insights. Proficient in PySpark, Databricks, SQL, Python, Delta Lake, and Azure Data Factory (ADF).",
  skills: [
    "Python",
    "MySQL",
    "Apache Spark",
    "PySpark",
    "Delta Lake",
    "Azure Data Factory (ADF)",
    "Azure Databricks",
    "Azure Data Lake Storage (ADLS)",
    "Power BI",
    "Jira",
    "Incremental Loads",
    "Change Data Capture (CDC)",
    "Data Lineage",
    "Data Security",
    "Medallion Architecture",
    "Data Partitioning",
    "Indexing",
    "Optimization",
    "Agile Development",
    "Collaboration",
    "Teamwork",
    "Problem-Solving"
  ],
  workExperience: [
    {
      company: "Capgemini",
      location: "Bangalore",
      role: "Senior Software Engineer [D.E.]",
      project: "Customer Transactions Analytics",
      duration: "July 2023 – Present",
      startDate:"July 2023",
      endDate:"Present",
      bullets: [
        "Designing and implementing a scalable data pipeline using ADF, Databricks, and ADLS, following the Medallion Architecture, improving data accessibility by 60%.",
        "Developing incremental data ingestion pipelines from Azure SQL DB to ADLS using ADF.",
        "Leveraging Databricks (PySpark) for data cleansing and transformation.",
        "Creating aggregated datasets, reducing reporting latency by 60%.",
        "Optimizing data storage and retrieval using Parquet and indexing.",
        "Automating ETL workflows, eliminating 85% of manual data processing."
      ]
    },
    {
      company: "Capgemini",
      location: "Bangalore",
      role: "Software Engineer [D.E.]",
      project: "Data Migration and Transformations",
      duration: "Dec 2021 – June 2023",
      startDate:"Dec 2021",
      endDate:"June 2023",
      bullets: [
        "Migrated data from DB2 to Databricks Delta Tables.",
        "Designed and implemented migration strategies using PySpark.",
        "Performed data transformations and validation in Databricks.",
        "Developed and optimized ETL workflows.",
        "Ensured data governance, security, and compliance."
      ]
    }
  ],
  education: [
    {
      degree: "M.Tech in CSE",
      institution: "Vellore Institute of Technology, Vellore",
      gpa: "75.4%",
      endDate: "July 2021"
    },
    {
      degree: "B.Tech in IT",
      institution: "IMS Engineering College, Ghaziabad",
      gpa: "72.32%",
      endDate: "June 2019"
    }
  ],
  certifications: [
    {
      title: "Master’s in Data Science with Power BI",
      description: "9-month Intensive Industry Program",
      issuer: "Console Flare"
    },
    {
      title: "MySQL Certification",
      issuer: "HackerRank"
    },
    {
      title: "Python Industry Program",
      description: "2-month course",
      issuer: "Coding Ninjas"
    }
  ],
  extracurriculars: [] // None listed in resume
};

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
      {/* Download Link */}
      <PDFDownloadLink
        document={<ResumeTemplate userData={customUserData} />}
        fileName="resume.pdf"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow"
      >
        {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
      </PDFDownloadLink>

      {/* PDF Preview */}
      <div className="w-full max-w-6xl h-[80vh] border border-gray-300 shadow-md">
        <PDFViewer width="100%" height="100%" showToolbar>
          <ResumeTemplate userData={customUserData} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default CustomMyPdf;
