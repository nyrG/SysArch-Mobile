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
} from "react-native";
import { createOrder } from "../service/ApiService";
import Notification from "./notification";

interface OrderData {
  deliveryAddress: {
    barangay: string;
    city: string;
    province: string;
    street: string;
  };
  deliveryDate: string;
  orderDate: string;
  price: number;
  quantity: number;
  stationName: string;
  status: string;
  userId: string;
}

const AddOrder = () => {
  const [orderData, setOrderData] = useState<OrderData>({
    deliveryAddress: {
      barangay: "",
      city: "",
      province: "",
      street: "",
    },
    deliveryDate: "",
    orderDate: "",
    price: 0,
    quantity: 0,
    stationName: "",
    status: "",
    userId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  const handleChange = (name: string, value: string) => {
    setOrderData((prevOrderData) => {
      if (name.startsWith("deliveryAddress.")) {
        const key = name.split(".")[1] as keyof OrderData["deliveryAddress"];
        return {
          ...prevOrderData,
          deliveryAddress: {
            ...prevOrderData.deliveryAddress,
            [key]: value,
          },
        };
      }
      return {
        ...prevOrderData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await createOrder(orderData);
      setNotification({
        isVisible: true,
        message: "Order successfully created",
      });
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setNotification({
        isVisible: true,
        message: `Order creation failed: ${errorMessage}`,
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
            <Text style={styles.headerText}>Create New Order</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.inputs}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Station Name"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) => handleChange("stationName", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                placeholderTextColor="#888" // Placeholder text color
                keyboardType="numeric"
                onChangeText={(text) => handleChange("quantity", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                placeholderTextColor="#888" // Placeholder text color
                keyboardType="numeric"
                onChangeText={(text) => handleChange("price", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Status"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) => handleChange("status", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="User ID"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) => handleChange("userId", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Street"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) =>
                  handleChange("deliveryAddress.street", text)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Barangay"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) =>
                  handleChange("deliveryAddress.barangay", text)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) =>
                  handleChange("deliveryAddress.city", text)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Province"
                placeholderTextColor="#888" // Placeholder text color
                onChangeText={(text) =>
                  handleChange("deliveryAddress.province", text)
                }
              />
            </View>
            <TouchableOpacity
              style={styles.submit}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitText}>
                {isSubmitting ? "Submitting..." : "Submit Order"}
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

export default AddOrder;
