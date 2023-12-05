import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Appbar, Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import useAUthStore from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const { setUserName, setUserEmail, setId } = useAUthStore();

  const handleLogin = async () => {
    try {
      console.log(email, password);
      setError(false);
      const response = await axios.post(
        "https://electronics-gray.vercel.app/api/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log({ response });
      if (response.status === 200) {
        console.log(response.data);
        const { findUser } = response.data;
        alert("Successfully logged in");
        navigation.navigate("Home");
        setError(false);
        setUserName(findUser.name);
        setUserEmail(findUser.email);
        setId(findUser.id);
      } else {
        setError(true);
        setPassword("");
      }
      console.log(findUser);
    } catch (error) {
      setError(true);
      setPassword("");

      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Appbar.Header>
        <Appbar.Content title="Login" />
      </Appbar.Header>
      <View style={{ backgroundColor: "white" }}>
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 100 }}>
          <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 15 }}>
            Login To Your Account
          </Text>
          {error && (
            <Text style={{ color: "red", fontSize: 15 }}>
              Invalid Crediantials
            </Text>
          )}
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            style={{ marginBottom: 10 }}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            mode="outlined"
          />
          <Button
            mode="outlined"
            style={{ marginTop: 15 }}
            onPress={() => handleLogin()}
          >
            Login
          </Button>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>Don't have an Account?</Text>
                <Text
                  style={{ fontWeight: "bold", marginLeft: 2 }}
                  onPress={() => navigation.navigate("Register")}
                >
                  Register Here
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
