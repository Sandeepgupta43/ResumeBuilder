import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Optional: Helvetica fallback since Google-hosted font might not work in PDF
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v15/Helvetica.ttf' },
    { src: 'https://fonts.gstatic.com/s/helvetica/v15/Helvetica-Bold.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10.5,
    lineHeight: 1.5,
    color: '#000',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    borderBottomStyle: 'solid',
    paddingBottom: 10,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'normal',
  },
  lastNameBold: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 11,
    marginTop: 4,
    color: '#555',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    marginTop: 10,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#444',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    borderBottomStyle: 'solid',
    paddingBottom: 4,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  leftColumn: {
    width: '48%',
  },
  rightColumn: {
    width: '48%',
  },
  educationItem: {
    marginBottom: 8,
  },
  school: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  degree: {
    fontStyle: 'italic',
    marginBottom: 2,
  },
  date: {
    fontSize: 9,
    color: '#777',
  },
  skillItem: {
    marginBottom: 3,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  company: {
    fontStyle: 'italic',
    marginBottom: 2,
  },
  bulletPoint: {
    marginLeft: 8,
    marginBottom: 2,
  },
});

const ProfessionalResumeTemplate = ({ userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {userData.name.split(' ')[0]} <Text style={styles.lastNameBold}>{userData.name.split(' ')[1]}</Text>
        </Text>
        <Text style={styles.title}>{userData.title}</Text>
        <View style={styles.contactRow}>
          <Text>{userData.phone}</Text>
          <Text>{userData.email}</Text>
          <Text>{userData.address}</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text>{userData.summary}</Text>
      </View>

      {/* Two-column layout */}
      <View style={styles.twoColumn}>
        {/* Left: Education + Skills + Certifications */}
        <View style={styles.leftColumn}>
          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {userData.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.school}>{edu.institution}</Text>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.date}>{edu.startDate} - {edu.endDate}</Text>
              </View>
            ))}
          </View>

          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {userData.skills.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>• {skill}</Text>
            ))}
          </View>

          {/* Certifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {userData.certifications.map((cert, index) => (
              <Text key={index} style={styles.skillItem}>• {cert.title}</Text>
            ))}
          </View>
        </View>

        {/* Right: Professional Experience */}
        <View style={styles.rightColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {userData.workExperience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{exp.role}</Text>
                <Text style={styles.company}>{exp.company} | {exp.startDate} - {exp.endDate}</Text>
                {exp.bullets.map((bullet, bulletIndex) => (
                  <Text key={bulletIndex} style={styles.bulletPoint}>• {bullet}</Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ProfessionalResumeTemplate;
