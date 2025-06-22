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
    fontSize: 10,
    lineHeight: 1.4,
    color: "#333",
  },
  container: {
    flexDirection: "row",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: 20,
  },
  main: {
    width: "70%",
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  title: {
    fontSize: 12,
    color: "#ecf0f1",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
    borderBottom: "1px solid #3498db",
    paddingBottom: 3,
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#ecf0f1",
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 5,
  },
  skillItem: {
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    fontStyle: "italic",
    marginBottom: 3,
  },
  date: {
    fontSize: 9,
    color: "#7f8c8d",
    marginBottom: 5,
  },
  bulletPoint: {
    marginLeft: 10,
    marginBottom: 3,
  },
  link: {
    color: "#3498db",
    textDecoration: "none",
  },
});

const ModernResumeTemplate = ({ userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.name}>{userData.name}</Text>
          {userData.title && <Text style={styles.title}>{userData.title}</Text>}

          {/* Contact */}
          <Text style={styles.sidebarTitle}>CONTACT</Text>
          <Text style={styles.contactItem}>{userData.email}</Text>
          <Text style={styles.contactItem}>{userData.phone}</Text>
          <Text style={styles.contactItem}>{userData.location}</Text>
          {userData.linkedIn && (
            <Link style={{ ...styles.contactItem, ...styles.link }} src={userData.linkedIn}>
              LinkedIn
            </Link>
          )}
          {userData.github && (
            <Link style={{ ...styles.contactItem, ...styles.link }} src={userData.github}>
              GitHub
            </Link>
          )}

          {/* Skills */}
          <Text style={styles.sidebarTitle}>SKILLS</Text>
          {(Array.isArray(userData.skills)
            ? userData.skills
            : userData.skills?.split(/,|•|\n/)
          )
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0)
            .map((skill, i) => (
              <Text key={i} style={styles.skillItem}>
                • {skill}
              </Text>
            ))}

          {/* Education */}
          {userData.education.length > 0 && (
            <>
              <Text style={styles.sidebarTitle}>EDUCATION</Text>
              {userData.education?.map((edu, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>{edu.degree}</Text>
                  <Text>{edu.institution}</Text>
                  <Text>{edu.gpa} GPA</Text>
                  <Text>{edu.endDate}</Text>
                </View>
              ))}
            </>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Summary */}
          {userData.summary.length > 0 && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.sectionTitle}>PROFILE</Text>
              <Text>{userData.summary}</Text>
            </View>
          )}

          {/* Work Experience */}
          {userData.workExperience.length > 0 && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
              {userData.workExperience?.map((exp, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={styles.jobTitle}>{exp.role}</Text>
                  <Text style={styles.company}>
                    {exp.company} | {exp.project}
                  </Text>
                  <Text style={styles.date}>
                    {exp.startDate} – {exp.endDate}
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
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.sectionTitle}>PROJECTS</Text>
              {userData.projects?.map((proj, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={styles.jobTitle}>{proj.name}</Text>
                  <Text style={styles.date}>
                    {proj.startDate} – {proj.endDate}
                  </Text>
                  {proj.bullets?.map((bullet, j) => (
                    <Text key={j} style={styles.bulletPoint}>
                      • {bullet}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {userData.certifications.length > 0 && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
              {userData.certifications.map((cert, i) => (
                <View key={i} style={{ marginBottom: 5 }}>
                  <Text style={{ fontWeight: "bold" }}>{cert.title}</Text>
                  <Text>Issued: {cert.issueDate}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  </Document>
);

export default ModernResumeTemplate;
