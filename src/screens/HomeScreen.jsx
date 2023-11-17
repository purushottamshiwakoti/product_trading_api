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
        "https://pra-ten.vercel.app/api/products"
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
          <Appbar.Action icon="home" onPress={() => {}} color="red" />
          <Appbar.Content
            title={name && name}
            style={{ alignItems: "center" }}
            color="red"
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
              uri: "https://www.india-briefing.com/news/wp-content/uploads/2017/03/India-Brefing-Starting-an-Export-Import-Business-in-India.jpg",
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
