import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
    fontSize: 10.5,
    lineHeight: 1.6,
    color: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  nameTitleBlock: {
    flexDirection: "column",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 11,
    marginTop: 2,
  },
  contactBlock: {
    textAlign: "right",
    fontSize: 9,
    lineHeight: 1.4,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  jobBlock: {
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jobRoleCompany: {
    fontWeight: "bold",
  },
  jobLocation: {
    fontStyle: "italic",
    fontSize: 9,
  },
  bullet: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 2,
  },
  smallDate: {
    fontSize: 9,
    color: "#555",
  },
});

const ProfessionalResumeTemplate = ({ userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.nameTitleBlock}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.title}>{userData.title}</Text>
        </View>
        <View style={styles.contactBlock}>
          <Text>{userData.email}</Text>
          <Text>{userData.phone}</Text>
          <Text>{userData.address}</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text>{userData.summary}</Text>
      </View>

      {/* Work Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Experience</Text>
        {userData.workExperience.map((exp, index) => (
          <View key={index} style={styles.jobBlock}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobRoleCompany}>
                {exp.role}, {exp.company}
              </Text>
              <Text style={styles.smallDate}>
                {exp.startDate} - {exp.endDate}
              </Text>
            </View>
            {exp.location && (
              <Text style={styles.jobLocation}>{exp.location}</Text>
            )}
            {exp.bullets.map((b, i) => (
              <Text key={i} style={styles.bullet}>
                • {b}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {/* Projects */}
      {userData.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {userData.projects.map((proj, i) => (
            <View key={i} style={styles.jobBlock}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>{proj.name}</Text>
                <Text style={styles.smallDate}>
                  {proj.startDate} – {proj.endDate}
                </Text>
              </View>
              {proj.bullets?.map((bullet, j) => (
                <Text key={j} style={styles.bullet}>
                  • {bullet}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Core Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Skills</Text>
        <Text>{userData.skills.join(", ")}</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {userData.education.map((edu, index) => (
          <View key={index} style={styles.jobBlock}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobRoleCompany}>{edu.institution}</Text>
              <Text style={styles.smallDate}>
                {edu.startDate} - {edu.endDate}
              </Text>
            </View>
            <Text>{edu.degree}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ProfessionalResumeTemplate;
