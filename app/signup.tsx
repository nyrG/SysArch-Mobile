import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { createAccount } from "../service/ApiService";
import Notification from "./notification";

interface FormData {
  email: string;
  password: string;
  phoneNum: string;
  type: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  address: {
    street: string;
    barangay: string;
    city: string;
    province: string;
  };
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    phoneNum: "",
    type: "",
    name: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    address: {
      street: "",
      barangay: "",
      city: "",
      province: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };

      if (name.startsWith("name.")) {
        const key = name.split(".")[1] as keyof FormData["name"];
        newFormData.name[key] = value;
      } else if (name.startsWith("address.")) {
        const key = name.split(".")[1] as keyof FormData["address"];
        newFormData.address[key] = value;
      } else {
        (newFormData as any)[name] = value;
      }

      return newFormData;
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await createAccount(formData);
      setNotification({
        isVisible: true,
        message: "Account successfully created",
      });
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setNotification({
        isVisible: true,
        message: `Account creation failed: ${errorMessage}`,
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(
        () => setNotification({ isVisible: false, message: "" }),
        3000
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Sign Up</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.inputs}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account Information</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888" // Placeholder text color
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => handleChange("email", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888" // Placeholder text color
                secureTextEntry
                onChangeText={(text) => handleChange("password", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#888" // Placeholder text color
                keyboardType="phone-pad"
                onChangeText={(text) => handleChange("phoneNum", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Type (owner/customer)"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) => handleChange("type", text)}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) => handleChange("name.firstName", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Middle Name"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) => handleChange("name.middleName", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) => handleChange("name.lastName", text)}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Address Information</Text>
              <TextInput
                style={styles.input}
                placeholder="Street"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) => handleChange("address.street", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Barangay"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) => handleChange("address.barangay", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) => handleChange("address.city", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Province"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) => handleChange("address.province", text)}
              />
            </View>
            <TouchableOpacity
              style={styles.submit}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitText}>
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
      />
    </KeyboardAvoidingView>
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
    marginTop: 50,
    marginBottom: 100,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  underline: {
    height: 2,
    width: 50,
    backgroundColor: "#333",
    marginTop: 8,
  },
  inputs: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
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
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SignUp;
