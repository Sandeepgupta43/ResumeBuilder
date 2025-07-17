import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";

// Register fonts
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
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#1a365d",
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#bee3f8",
    paddingBottom: 12,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2b6cb0",
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: "#4a5568",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
  },
  twoColumn: {
    flexDirection: "row",
    marginTop: 8,
  },
  leftColumn: {
    width: "60%",
    paddingRight: 16,
  },
  rightColumn: {
    width: "40%",
    paddingLeft: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2b6cb0",
    borderBottomWidth: 1,
    borderBottomColor: "#bee3f8",
    paddingBottom: 4,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  jobRole: {
    fontWeight: "bold",
    fontSize: 10,
  },
  jobDate: {
    fontSize: 8,
    color: "#718096",
  },
  jobCompany: {
    fontSize: 10,
    fontStyle: "italic",
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 10,
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
    fontSize: 9,
  },
  skillItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  skillBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2b6cb0",
    marginRight: 6,
    marginTop: 3,
  },
  educationItem: {
    marginBottom: 8,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  educationDegree: {
    fontWeight: "bold",
    fontSize: 9,
  },
  educationInstitution: {
    fontSize: 9,
  },
  educationGPA: {
    fontSize: 8,
    color: "#718096",
  },
  certificationItem: {
    marginBottom: 6,
  },
  certificationName: {
    fontWeight: "bold",
    fontSize: 9,
  },
  certificationDetails: {
    fontSize: 8,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  languageName: {
    fontSize: 9,
  },
  languageProficiency: {
    fontSize: 8,
    color: "#718096",
  },
  link: {
    color: "#3182ce",
    textDecoration: "none",
  },
});

const ModernProfessionalTemplate = ({ userData }) => {
  const formatSkills = () => {
    return Array.isArray(userData.skills)
      ? userData.skills
      : (userData.skills || '').split(/,|•|\n/).map(s => s.trim()).filter(Boolean);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{userData.name}</Text>
          {userData.title && <Text style={styles.title}>{userData.title}</Text>}
          
          <View style={styles.contactRow}>
            {userData.email && (
              <View style={styles.contactItem}>
                <Text>✉️ {userData.email}</Text>
              </View>
            )}
            {userData.phone && (
              <View style={styles.contactItem}>
                <Text>📞 {userData.phone}</Text>
              </View>
            )}
            {userData.location && (
              <View style={styles.contactItem}>
                <Text>📍 {userData.location}</Text>
              </View>
            )}
            {userData.website && (
              <View style={styles.contactItem}>
                <Text>🌐 {userData.website.replace(/^https?:\/\//, '')}</Text>
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
          </View>
        </View>

        {/* Two-column layout */}
        <View style={styles.twoColumn}>
          {/* Left column - 60% width */}
          <View style={styles.leftColumn}>
            {/* Profile Summary */}
            {userData.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>PROFILE</Text>
                <Text style={{ fontSize: 9 }}>{userData.summary}</Text>
              </View>
            )}

            {/* Work Experience */}
            {userData.workExperience?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>EXPERIENCE</Text>
                {userData.workExperience.map((exp, i) => (
                  <View key={i} style={{ marginBottom: 12 }}>
                    <View style={styles.jobHeader}>
                      <Text style={styles.jobRole}>{exp.role}</Text>
                      <Text style={styles.jobDate}>
                        {exp.startDate} – {exp.endDate}
                      </Text>
                    </View>
                    <Text style={styles.jobCompany}>
                      {exp.company} {exp.project && `• ${exp.project}`}
                    </Text>
                    <View style={styles.bulletList}>
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

            {/* Extracurriculars */}
            {userData.extracurriculars?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>EXTRACURRICULARS</Text>
                {userData.extracurriculars.map((extr, i) => (
                  <Text key={i} style={{ fontSize: 9, marginBottom: 4 }}>
                    • {extr.role} at {extr.organization} ({extr.startDate} – {extr.endDate})
                  </Text>
                ))}
              </View>
            )}
          </View>

          {/* Right column - 40% width */}
          <View style={styles.rightColumn}>
            {/* Skills */}
            {formatSkills().length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>SKILLS</Text>
                <View>
                  {formatSkills().map((skill, i) => (
                    <View key={i} style={styles.skillItem}>
                      <View style={styles.skillBullet} />
                      <Text style={{ fontSize: 9 }}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Education */}
            {userData.education?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>EDUCATION</Text>
                {userData.education.map((edu, i) => (
                  <View key={i} style={styles.educationItem}>
                    <View style={styles.educationHeader}>
                      <Text style={styles.educationDegree}>{edu.degree}</Text>
                      <Text style={styles.jobDate}>
                        {edu.startDate} – {edu.endDate}
                      </Text>
                    </View>
                    <Text style={styles.educationInstitution}>
                      {edu.institution}
                    </Text>
                    {edu.gpa && (
                      <Text style={styles.educationGPA}>GPA: {edu.gpa}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {userData.certifications?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
                {userData.certifications.map((cert, i) => (
                  <View key={i} style={styles.certificationItem}>
                    <Text style={styles.certificationName}>{cert.name}</Text>
                    <Text style={styles.certificationDetails}>
                      {cert.issuer} • {cert.date}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {userData.languages?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>LANGUAGES</Text>
                {userData.languages.map((lang, i) => (
                  <View key={i} style={styles.languageItem}>
                    <Text style={styles.languageName}>{lang.language}</Text>
                    <Text style={styles.languageProficiency}>
                      {lang.proficiency}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ModernProfessionalTemplate;