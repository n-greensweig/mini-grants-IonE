import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold', // or another bold font
  },
  content: {
    fontSize: 12,
  },
});

// Create Document Component
function PDFDocument({ grantInfo }) {
  if (!grantInfo || typeof grantInfo !== 'object' || !grantInfo.hasOwnProperty('id')) {
    return (
      <Document title="Invalid Grant Info">
        <Page size="A4">
          <Text>Error: Invalid Grant Info Please reach out to the Admin</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document title={`IonE_Mini_Grant_ID_${grantInfo.id}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Grant Info:</Text>
          <Text style={styles.content}>
            Title: {grantInfo.project_title}{'\n'}
            Principal Investigator: {grantInfo.principal_investigator}{'\n'}
            Team Members: {grantInfo.additional_team_members.map((teamMember, index) => (
              teamMember[0].team_member !== '' ? teamMember[0].team_member + ', ' : ''
            ))}{'\n'}
            Cycle: {grantInfo.cycle}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Abstract:</Text>
          <Text style={styles.content}>{grantInfo.abstract}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Proposal Narrative:</Text>
          <Text style={styles.content}>{grantInfo.proposal_narrative}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default PDFDocument;