import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import ApiDisplay from './src/ApiDisplay';

// Main entry screen that hosts the ApiDisplay component
export default function App() {
  return (
    // SafeAreaView ensures content stays clear of device notches and status bars
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>API Users Directory</Text>

      {/* Renders the component responsible for fetching and displaying API data */}
      <ApiDisplay />
    </SafeAreaView>
  );
}

// Screen layout styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    padding: 16,
    color: '#111827',
  },
});