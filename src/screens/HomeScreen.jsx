import { View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button, Card, Text, Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAUthStore from "../hooks/useAuth";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const { name, logout } = useAUthStore();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        "https://electronics-gray.vercel.app/api/products"
      );
      const { products } = response.data;
      setProducts(products);
    };
    fetchProducts();
  }, []);
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
        <View style={{ marginTop: 20, margin: 10 }}>
          <Image
            source={{
              uri: "data:image/jpeg;base64,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",
            }}
            style={{ width: "100%", height: 200, borderRadius: 20 }}
          />
          <View style={{ margin: 20 }}>
            <Text style={{ fontSize: 20, color: "red" }}>All Products</Text>
            {products &&
              products.map((product) => (
                <Card style={{ marginTop: 10 }} key={product.id}>
                  <Card.Cover source={{ uri: product.image }} />
                  <Card.Content>
                    <Text
                      variant="titleLarge"
                      style={{ marginTop: 10, fontSize: 14, fontWeight: "700" }}
                    >
                      {product.name}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={{ marginBottom: 10, fontSize: 12 }}
                      numberOfLines={2}
                    >
                      {product.description}
                    </Text>
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      onPress={() =>
                        navigation.navigate("ProductDetail", {
                          itemId: product.id,
                        })
                      }
                    >
                      View Product
                    </Button>
                  </Card.Actions>
                </Card>
              ))}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
