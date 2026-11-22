import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

// Public REST API endpoint returning a JSON array of sample users
const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function ApiDisplay() {
  // State to store the fetched list of user objects
  const [users, setUsers] = useState([]);
  // State to track whether the network request is currently in progress
  const [loading, setLoading] = useState(true);
  // State to store an error message if the request fails
  const [error, setError] = useState(null);

  // Trigger the data fetch once when the component first mounts (empty dependency array [])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Perform a GET request to the external API
        const response = await fetch(API_URL);

        // Check for HTTP-level errors (e.g., 404 or 500) since fetch() only rejects on network failure
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response body as JSON and save it to state
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        // Catch network errors or thrown HTTP errors and store a readable message
        setError(err.message || 'Failed to fetch data from the API.');
      } finally {
        // Stop the loading indicator regardless of whether the fetch succeeded or failed
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Renders each individual user item inside the FlatList
  const renderUserItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.detail}>Email: {item.email}</Text>
      <Text style={styles.detail}>Company: {item.company?.name}</Text>
    </View>
  );

  // Display a loading spinner and message while waiting for the API response
  if (loading) {
    return (
      <View style={styles.centerBox}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.statusText}>Loading...</Text>
      </View>
    );
  }

  // Display an error message if the network request failed
  if (error) {
    return (
      <View style={styles.centerBox}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  // Render the fetched list of users once loading completes with no errors
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderUserItem}
      contentContainerStyle={styles.listContent}
    />
  );
}

// Component styles
const styles = StyleSheet.create({
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    color: '#374151',
  },
  errorText: {
    fontSize: 15,
    color: '#dc2626',
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 2,
  },
});