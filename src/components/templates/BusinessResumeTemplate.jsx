import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
    color: "#000",
  },
  header: {
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contact: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 4,
    columnGap: 10,
    fontSize: 10,
    marginBottom: 15,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
    color: "#333",
  },
  sectionContent: {
    marginBottom: 15,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    marginTop: 4,
  },
  skillItem: {
    marginRight: 8, 
    fontSize: 10,
  },
  experienceItem: {
    marginBottom: 15,
  },
  company: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  position: {
    fontStyle: "italic",
    marginBottom: 3,
  },
  date: {
    fontSize: 10,
    color: "#555",
    marginBottom: 5,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  major: {
    fontStyle: "italic",
    marginBottom: 3,
  },
});

const BusinessResumeTemplate = ({ userData }) => {
  // Convert skills string to array (assumes comma-separated)
  const skillsArray = Array.isArray(userData.skills)
    ? userData.skills
    : typeof userData.skills === "string" && userData.skills.trim() !== ""
    ? userData.skills.split(",").map((s) => s.trim())
    : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{userData.name}</Text>
          <View style={styles.contact}>
            {userData.phone && <Text>{userData.phone}</Text>}
            {userData.email && <Text>{userData.email}</Text>}
            {userData.linkedIn && <Text>{userData.linkedIn}</Text>}
            {userData.github && <Text>{userData.github}</Text>}
            {userData.location && <Text>{userData.location}</Text>}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Summary */}
        {userData.summary && (
          <>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text>{userData.summary}</Text>
            </View>
            <View style={styles.divider} />
          </>
        )}

        {/* Skills */}
        {skillsArray.length > 0 && (
          <>
            <View>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsRow}>
                {skillsArray.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    • {skill}
                    {index < skillsArray.length - 1 ? "   " : ""}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.divider} />
          </>
        )}
        {/* Work Experience */}
        {userData.workExperience.length > 0 && (
          <>
            <View>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {userData.workExperience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.position}>{exp.role}</Text>
                  <Text style={styles.date}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                  <Text>{exp.description}</Text>
                </View>
              ))}
            </View>
            <View style={styles.divider} />
          </>
        )}

        {/* Education */}
        {userData.education.length > 0 && (
          <>
            <View>
              <Text style={styles.sectionTitle}>Education</Text>
              {userData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  {edu.major && (
                    <Text style={styles.major}>Major: {edu.major}</Text>
                  )}
                  <Text>{edu.institution}</Text>
                </View>
              ))}
            </View>
            <View style={styles.divider} />
          </>
        )}

        {/* Certifications */}
        {userData.certifications.length > 0 && (
          <>
            <View>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {userData.certifications.map((cert, index) => (
                <Text key={index}>• {cert.title}</Text>
              ))}
            </View>
            <View style={styles.divider} />
          </>
        )}

        {/* Extracurriculars */}
        {userData.extracurriculars.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Extracurricular Activities</Text>
            {userData.extracurriculars.map((activity, index) => (
              <Text key={index}>• {activity}</Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default BusinessResumeTemplate;
