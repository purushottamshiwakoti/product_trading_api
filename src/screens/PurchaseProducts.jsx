import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import useAUthStore from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import axios from "axios";

const PurchaseProducts = () => {
  const { id, name, logout } = useAUthStore();
  console.log(id);
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `https://electronics-gray.vercel.app/api/purchase/${id}`
      );
      const { purchase } = response.data;
      setProducts(purchase);
    };
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Appbar.Header>
          <Appbar.Action
            icon="home"
            onPress={() => {
              navigation.navigate("Home");
            }}
            color="red"
          />
          <Appbar.Content
            title={name && name}
            style={{ alignItems: "center" }}
            color="red"
          />
          <Appbar.Action
            icon="book"
            color="red"
            onPress={() => {
              navigation.navigate("PurchasedProduct");
            }}
          />

          <Appbar.Action
            icon="logout"
            color="red"
            onPress={() => {
              logout();
            }}
          />
        </Appbar.Header>
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 20 }}>Purchased Items</Text>
          {products &&
            products.map((product) => (
              <Card style={{ marginTop: 10 }} key={product.id}>
                <Card.Cover source={{ uri: product.product.image }} />
                <Card.Content>
                  <Text
                    variant="titleLarge"
                    style={{ marginTop: 10, fontSize: 14, fontWeight: "700" }}
                  >
                    {product.product.name}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{ marginBottom: 10, fontSize: 12 }}
                    numberOfLines={2}
                  >
                    {product.product.description}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{ marginBottom: 10, fontSize: 12 }}
                    numberOfLines={2}
                  >
                    PurchasedOn: {product.createdAt.split("T")[0]}
                  </Text>
                </Card.Content>
              </Card>
            ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PurchaseProducts;
