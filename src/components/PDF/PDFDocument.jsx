import React from 'react';
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
  return (
  <Document title="REPLACE">
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1
          Grant Name
          Pi, research team etc
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