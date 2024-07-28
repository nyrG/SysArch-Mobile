// Notification.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notification = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Notification;