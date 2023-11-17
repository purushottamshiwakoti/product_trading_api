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

const ProductDetail = ({ route }) => {
  const { itemId } = route.params;
  console.log(itemId);
  const [text, setText] = React.useState("");
  const [product, setProduct] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://pra-ten.vercel.app/api/products/${itemId}`
        );
        const { product } = response.data;
        setProduct(product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  console.log({ product });

  const navigation = useNavigation();
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
            color="red"
          />
          <Appbar.Content
            title="Trader"
            style={{ alignItems: "center" }}
            color="red"
          />
          <Appbar.Action icon="bell" color="red" onPress={() => {}} />
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
              <TextInput
                label="Bid Price"
                value={text}
                mode="outlined"
                onChangeText={(text) => setText(text)}
                keyboardType="number-pad"
              />
              <Button
                mode="outlined"
                style={{ marginTop: 20 }}
                disabled={text == ""}
                onPress={() => {
                  alert("Bid submitted successfully");
                  navigation.navigate("Home");
                }}
              >
                Submit
              </Button>
            </View>
          </Card>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default ProductDetail;
