import React from 'react';
import { useSelector } from 'react-redux';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
function PDFDocument () {

  const grantInfo = useSelector((store) => store.reviewer.reviewGrantReducer);

  return (
  <Document title={`IonE_Mini_Grant_ID_${grantInfo.id}`}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Grant Info:
          Title: {grantInfo.project_title}
          Principal Investigator: {grantInfo.principal_investigator}
          {/* Team Members: 
          {
            for (let i=0; i< grantInfo.additional_team_members.length; i++) {
              if (grantInfo.additional_team_members[i][0].team_member !== "") {
                ///
              }
            }
          } */}
          Cycle
        </Text>
      </View>
      <View style={styles.section}>
        <Text>
          Abstract
        </Text>
      </View>
    </Page>
  </Document>
  )
};

export default PDFDocument