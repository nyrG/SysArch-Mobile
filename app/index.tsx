import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { loginAccount } from "../service/ApiService";
import { AxiosError } from "axios";
import Notification from "./notification"; // Import the Notification component

// Define an interface for the expected response data
interface LoginResponse {
  Message?: string;
}

// Define a type for the notification state
interface NotificationState {
  message: string;
  isVisible: boolean;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<NotificationState>({
    message: "",
    isVisible: false,
  });

  // Ensure the message parameter is typed as a string
  const showNotification = (message: string) => {
    setNotification({ message, isVisible: true });
    setTimeout(() => setNotification({ message: "", isVisible: false }), 3000); // Hide after 3 seconds
  };

  const handleLogin = async () => {
    try {
      // Ensure the API response conforms to the expected type
      const response = (await loginAccount({
        email,
        password,
      })) as LoginResponse;
      const message = response.Message || "Login successful!";
      showNotification(message);
    } catch (error) {
      // Cast the error to AxiosError to access response data
      const axiosError = error as AxiosError<{ Message?: string }>;
      const errorMessage = axiosError.response?.data.Message || "Login failed.";
      showNotification(errorMessage);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
          <View style={styles.underline} />
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.submit} onPress={handleLogin}>
            <Text style={styles.submitText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 600,
    width: "100%",
    padding: 40,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: "center",
    marginTop: 0,
    marginBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  underline: {
    height: 2,
    width: 50,
    backgroundColor: "#333",
    marginVertical: 8,
    alignSelf: "center",
  },
  inputs: {
    marginBottom: 20,
    alignSelf: "center",
    width: "100%",
  },
  input: {
    marginBottom: 15,
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
  },
  submit: {
    marginTop: 20,
    backgroundColor: "#333",
    fontSize: 16,
    color: "white",
    width: "100%",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Login;
