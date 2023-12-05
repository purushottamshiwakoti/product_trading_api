import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Avatar,
  Button,
  Card,
  Text,
  Appbar,
  TextInput,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import useAUthStore from "../hooks/useAuth";

const ProductDetail = ({ route }) => {
  const { itemId } = route.params;
  const { id, name, logout } = useAUthStore();
  const [text, setText] = React.useState("");
  const [product, setProduct] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://electronics-gray.vercel.app/api/products/${itemId}`
        );
        const { product } = response.data;
        setProduct(product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const navigation = useNavigation();

  const handleBuy = async () => {
    try {
      const response = await axios.post(
        "https://electronics-gray.vercel.app/api/purchase",
        {
          productId: itemId,
          userId: id,
        }
      );
      const { message } = response.data;
      alert(message);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
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
        {product && (
          <Card style={{ marginTop: 10 }}>
            <Card.Cover source={{ uri: product.image }} />
            <Card.Content>
              <Text
                variant="titleLarge"
                style={{ marginTop: 10, fontSize: 14 }}
              >
                {product.name}
              </Text>
              <Text
                variant="bodyMedium"
                style={{ marginBottom: 10, fontSize: 12 }}
              >
                {product.description}
              </Text>
            </Card.Content>
            <View style={{ margin: 20 }}>
              <Button
                mode="outlined"
                style={{ marginTop: 20 }}
                onPress={handleBuy}
              >
                Buy Now
              </Button>
            </View>
          </Card>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default ProductDetail;
