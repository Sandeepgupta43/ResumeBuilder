// src/PdfFile/ClassicResumeTemplate.jsx
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Times-Roman",
    lineHeight: 1.3,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    borderBottom: "1px solid #000",
    paddingBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Times-Bold",
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    marginTop: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Times-Bold",
    marginBottom: 5,
    borderBottom: "0.5px solid #000",
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  jobTitle: {
    fontWeight: "bold",
    fontFamily: "Times-Bold",
  },
  jobDate: {
    fontStyle: "italic",
  },
  company: {
    fontStyle: "italic",
    marginBottom: 5,
  },
  bulletPoint: {
    marginLeft: 10,
    marginBottom: 3,
  },
  twoColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  link: {
    color: "blue",
    textDecoration: "none",
  },
});

const ClassicResumeTemplate = ({ userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.contact}>
          {userData.location} | {userData.phone} | {userData.email} |{" "}
          {userData.linkedIn && (
            <Link style={styles.link} src={userData.linkedIn}>
              LinkedIn
            </Link>
          )}{" "}
          |{" "}
          {userData.github && (
            <Link style={styles.link} src={userData.github}>
              GitHub
            </Link>
          )}
        </Text>
      </View>

      {/* Summary */}
      {userData.summary.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUMMARY</Text>
          <Text>{userData.summary}</Text>
        </View>
      )}

      {/* Two Column Layout */}
      <View style={styles.twoColumn}>
        {/* Left Column */}
        <View style={styles.column}>
          {/* Work Experience */}
          {userData.workExperience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EXPERIENCE</Text>
              {userData.workExperience?.map((exp, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>{exp.role}</Text>
                    <Text style={styles.jobDate}>
                      {exp.startDate} – {exp.endDate}
                    </Text>
                  </View>
                  <Text style={styles.company}>
                    {exp.company} | {exp.project}
                  </Text>
                  {exp.bullets?.map((bullet, j) => (
                    <Text key={j} style={styles.bulletPoint}>
                      • {bullet}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {userData.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PROJECTS</Text>
              {userData.projects?.map((proj, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>{proj.name}</Text>
                    <Text style={styles.jobDate}>
                      {proj.startDate} – {proj.endDate}
                    </Text>
                  </View>
                  {proj.bullets?.map((bullet, j) => (
                    <Text key={j} style={styles.bulletPoint}>
                      • {bullet}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          {/* Education */}
          {userData.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              {userData.education?.map((edu, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>{edu.degree}</Text>
                  <Text>{edu.institution}</Text>
                  <Text>{edu.gpa} GPA</Text>
                  <Text>Graduated: {edu.endDate}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {userData.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SKILLS</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {(Array.isArray(userData.skills)
                  ? userData.skills
                  : userData.skills?.split(/,|•|\n/)
                )
                  .map((skill) => skill.trim())
                  .filter((skill) => skill.length > 0)
                  .map((skill, i) => (
                    <Text key={i} style={{ marginRight: 10, marginBottom: 5 }}>
                      • {skill}
                    </Text>
                  ))}
              </View>
            </View>
          )}

          {/* Certifications */}
          {userData.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
              {userData.certifications.map((cert, i) => (
                <View key={i} style={{ marginBottom: 5 }}>
                  <Text>• {cert.title}</Text>
                  <Text style={{ fontSize: 9 }}>Issued: {cert.issueDate}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Extracurriculars */}
          {userData.extracurriculars.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ACTIVITIES</Text>
              {userData.extracurriculars.map((extr, i) => (
                <Text key={i} style={{ marginBottom: 3 }}>
                  • {extr.role} at {extr.organization} ({extr.startDate} –{" "}
                  {extr.endDate})
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  </Document>
);

export default ClassicResumeTemplate;