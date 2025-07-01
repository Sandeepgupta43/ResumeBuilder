import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";

// Register fonts if needed
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://fonts.cdnfonts.com/s/14098/Helvetica.woff" },
    { src: "https://fonts.cdnfonts.com/s/14098/Helvetica-Bold.woff", fontWeight: "bold" },
    { src: "https://fonts.cdnfonts.com/s/14098/Helvetica-Oblique.woff", fontStyle: "italic" },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#2d3748", // Dark gray-blue
    color: "#f7fafc",
    padding: 25,
  },
  mainContent: {
    width: "70%",
    padding: 30,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#ffffff",
  },
  title: {
    fontSize: 12,
    color: "#cbd5e0",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2d3748",
    borderBottomWidth: 1,
    borderBottomColor: "#3182ce",
    paddingBottom: 3,
  },
  sidebarSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
    color: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#4a5568",
    paddingBottom: 3,
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
  },
  skillItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  skillBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#63b3ed",
    marginRight: 6,
    marginTop: 5,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  company: {
    fontSize: 10,
    fontStyle: "italic",
    marginBottom: 3,
  },
  date: {
    fontSize: 9,
    color: "#718096",
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletPoint: {
    width: 10,
    fontSize: 12,
  },
  bulletText: {
    fontSize: 10,
  },
  link: {
    color: "#63b3ed",
    textDecoration: "none",
  },
  educationItem: {
    marginBottom: 10,
  },
  educationDegree: {
    fontWeight: "bold",
    fontSize: 10,
  },
  educationInstitution: {
    fontSize: 10,
  },
  educationDate: {
    fontSize: 9,
    color: "#a0aec0",
  },
  certificationItem: {
    marginBottom: 8,
  },
  certificationTitle: {
    fontWeight: "bold",
    fontSize: 10,
  },
  certificationDate: {
    fontSize: 9,
    color: "#a0aec0",
  },
});

const ModernResumeTemplate = ({ userData }) => {
  const formatSkills = () => {
    return Array.isArray(userData.skills)
      ? userData.skills
      : (userData.skills || "").split(/,|•|\n/).map(s => s.trim()).filter(Boolean);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Dark Sidebar */}
        <View style={styles.sidebar}>
          {/* Name and Title */}
          <Text style={styles.name}>{userData.name}</Text>
          {userData.title && <Text style={styles.title}>{userData.title}</Text>}

          {/* Contact Information */}
          <Text style={styles.sidebarSectionTitle}>CONTACT</Text>
          {userData.email && (
            <View style={styles.contactItem}>
              <Text>{userData.email}</Text>
            </View>
          )}
          {userData.phone && (
            <View style={styles.contactItem}>
              <Text>{userData.phone}</Text>
            </View>
          )}
          {userData.location && (
            <View style={styles.contactItem}>
              <Text>{userData.location}</Text>
            </View>
          )}
          {userData.linkedIn && (
            <View style={styles.contactItem}>
              <Link src={userData.linkedIn} style={styles.link}>
                LinkedIn
              </Link>
            </View>
          )}
          {userData.github && (
            <View style={styles.contactItem}>
              <Link src={userData.github} style={styles.link}>
                GitHub
              </Link>
            </View>
          )}

          {/* Skills */}
          <Text style={styles.sidebarSectionTitle}>SKILLS</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {formatSkills().map((skill, i) => (
              <View key={i} style={{ width: "50%", marginBottom: 6 }}>
                <View style={styles.skillItem}>
                  <View style={styles.skillBullet} />
                  <Text style={{ fontSize: 9 }}>{skill}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Education */}
          {userData.education?.length > 0 && (
            <>
              <Text style={styles.sidebarSectionTitle}>EDUCATION</Text>
              {userData.education.map((edu, i) => (
                <View key={i} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  <Text style={styles.educationInstitution}>{edu.institution}</Text>
                  {edu.gpa && <Text style={styles.educationDate}>GPA: {edu.gpa}</Text>}
                  <Text style={styles.educationDate}>
                    {edu.startDate} – {edu.endDate}
                  </Text>
                </View>
              ))}
            </>
          )}
        </View>

        {/* Light Main Content */}
        <View style={styles.mainContent}>
          {/* Profile Summary */}
          {userData.summary && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.sectionTitle}>PROFILE</Text>
              <Text style={{ fontSize: 10 }}>{userData.summary}</Text>
            </View>
          )}

          {/* Work Experience */}
          {userData.workExperience?.length > 0 && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
              {userData.workExperience.map((exp, i) => (
                <View key={i} style={{ marginBottom: 12 }}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>{exp.role}</Text>
                    <Text style={styles.date}>
                      {exp.startDate} – {exp.endDate}
                    </Text>
                  </View>
                  <Text style={styles.company}>
                    {exp.company} {exp.project && `• ${exp.project}`}
                  </Text>
                  <View style={{ marginTop: 4 }}>
                    {exp.bullets?.map((b, j) => (
                      <View key={j} style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {userData.projects?.length > 0 && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.sectionTitle}>PROJECTS</Text>
              {userData.projects.map((proj, i) => (
                <View key={i} style={{ marginBottom: 12 }}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>{proj.name}</Text>
                    <Text style={styles.date}>
                      {proj.startDate} – {proj.endDate}
                    </Text>
                  </View>
                  <View style={{ marginTop: 4 }}>
                    {proj.bullets?.map((b, j) => (
                      <View key={j} style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {userData.certifications?.length > 0 && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {userData.certifications.map((cert, i) => (
                  <View key={i} style={{ width: "50%", marginBottom: 8 }}>
                    <View style={{ borderLeftWidth: 2, borderLeftColor: "#3182ce", paddingLeft: 6 }}>
                      <Text style={styles.certificationTitle}>{cert.title}</Text>
                      <Text style={styles.certificationDate}>Issued: {cert.issueDate}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Extracurriculars */}
          {userData.extracurriculars?.length > 0 && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.sectionTitle}>ACTIVITIES</Text>
              {userData.extracurriculars.map((activity, i) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 10 }}>{activity.title}</Text>
                  <Text style={{ fontSize: 9 }}>{activity.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ModernResumeTemplate;