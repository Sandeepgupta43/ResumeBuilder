// src/PdfFile/ResumeTemplate.jsx

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  section: { marginBottom: 15 },
  header: { textAlign: 'center', marginBottom: 20 },
  name: { fontSize: 20, fontWeight: 'bold' },
  contact: { fontSize: 10, color: 'grey',marginTop:10 },
  projectContainer:{display:'flex',justifyContent:'space-between'},
  sectionTitle: { fontSize: 13, marginBottom: 5, fontWeight: 'bold', color: '#1f2937', borderBottom: '1 solid #ccc' },
  bold: { fontWeight: 'bold' },
  bulletPoint: { marginLeft: 10,textAlign:'justify' },
  techStack: { fontStyle: 'italic' },
});

const ResumeTemplate = ({ userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.contact}>
          {userData.location} | {userData.phone} | {userData.email} |{' '}
          {userData.linkedIn && <Link src={userData.linkedIn}>LinkedIn</Link>} | {' '}
          {userData.github && <Link src={userData.github}>GitHub</Link>}

        </Text>
      </View>
      <hr />

      {/* Summary */}
      {userData.summary.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUMMARY</Text>
          <Text>{'\u2022'}{'   '}{userData.summary}</Text>
        </View>
      )}
      

      {/* Work Experience */}
      {userData.workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
          {userData.workExperience?.map((exp, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={styles.bold}>
                  {exp.company}, {exp.role} | {exp.project}
                  </Text>
                  <Text>{exp.startDate} – {exp.endDate}</Text>
              </View>
              
              
              {/* <Text style={styles.techStack}>Tech Stack – {exp.techStack}</Text> */}
              {exp.bullets?.map((bullet, j) => (
                <Text key={j} style={styles.bulletPoint}>• {'\u2022'}{'  '}{bullet}</Text>
              ))}
            </View>
          ))}
        </View>
      )}
      

      {/* Project  */}
      {userData.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project</Text>
          {userData.projects?.map((proj,i) => (
              <View key={i} style={{marginBottom:10}}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.bold}>{proj.name}</Text>
                    <Text>{proj.startDate} – {proj.endDate}</Text>
                  </View>
                  {proj.bullets?.map((bullet, j) => (
                    <Text
                      key={j}
                      style={styles.bulletPoint}
                    >
                      {'\u2022'}{'  '}{bullet}
                    </Text>
                  ))}

              </View>
          ))}
        </View>
      ) }
      

       {/* Skills */}
       {userData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <Text>
                {(Array.isArray(
                    userData.skills) ? userData.skills : userData.skills?.split(/,|•|\n/))
                .map(skill => skill.trim())
                .filter(skill => skill.length > 0)
                .join(', ')}
            </Text>
          </View>
       )}
      



      {/* Education */}
      {userData.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {userData.education?.map((edu, i) => (
            <Text key={i}>
              {edu.degree} - {edu.institution} | {edu.gpa}{' GPA'} | {edu.endDate} |
            </Text>
          ))}
        </View>
      )}
      

      {/* Certifications */}
      
      {userData.certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
          {userData.certifications.map((cert, i) => (
            <Text key={i}>• {cert.title} | {cert.issueDate}</Text>
          ))}
        </View>
      )}
      {userData.extracurriculars.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXTRACURRUCULARS</Text>
          {userData.extracurriculars.map((extr,i) => (
            <Text key={i}>• {extr.role} {' '} {extr.organization} {' '} {extr.startDate} {' '} {extr.endDate}</Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default ResumeTemplate;
