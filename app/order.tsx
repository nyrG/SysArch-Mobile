import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { fetchAllOrders } from "../service/ApiService";

// Define the Order interface
interface Order {
  id: string;
  stationName: string;
  quantity: number;
  price: number;
  orderDate: string;
  deliveryDate: string;
  status: string;
  deliveryAddress: {
    street: string;
    barangay: string;
    city: string;
    province: string;
  };
}

const DisplayOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  const getData = async () => {
    try {
      const fetchedOrders = await fetchAllOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>All Orders</Text>
        <View style={styles.underline} />
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.stationName || "N/A"}</Text>
            <Text style={styles.rowText}>{item.quantity ?? "N/A"}</Text>
            <Text style={styles.rowText}>{item.price ?? "N/A"}</Text>
            <Text style={styles.rowText}>{item.orderDate || "N/A"}</Text>
            <Text style={styles.rowText}>{item.deliveryDate || "N/A"}</Text>
            <Text style={styles.rowText}>{item.status || "N/A"}</Text>
            <Text style={styles.rowText}>
              {item.deliveryAddress
                ? `${item.deliveryAddress.street || ""}, ${
                    item.deliveryAddress.barangay || ""
                  }, ${item.deliveryAddress.city || ""}, ${
                    item.deliveryAddress.province || ""
                  }`
                : "N/A"}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.submit}
        onPress={() => router.push("/add-order")}
      >
        <Text style={styles.submitText}>Add Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get("window");
const isSmallScreen = width <= 768;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
  },
  underline: {
    height: 3,
    width: 60,
    backgroundColor: "#333",
    marginTop: 10,
    borderRadius: 2,
  },
  row: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  rowText: {
    fontSize: 16,
    color: "#333",
  },
  submit: {
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default DisplayOrders;
