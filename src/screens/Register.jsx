import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Appbar, Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import useAUthStore from "../hooks/useAuth";

const Register = () => {
  const navigation = useNavigation();
  const { setUserName, setUserEmail, setId } = useAUthStore();
  const [email, setEmail] = React.useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const handleRegister = async () => {
    try {
      console.log(email, password, name);
      setError(false);
      const response = await axios.post(
        "https://electronics-gray.vercel.app/api/register",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const { user } = response.data;
        alert("Successfully registered");
        navigation.navigate("Home");
        setError(false);
        setUserName(user.name);
        setUserEmail(user.email);
        setId(user.id);
      } else {
        setError(true);
        setPassword("");
      }
      console.log(user);
    } catch (error) {
      setError(true);
      setPassword("");

      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Appbar.Header>
          <Appbar.Content title="Register" />
        </Appbar.Header>
        <View style={{ backgroundColor: "white" }}>
          <View style={{ marginLeft: 10, marginRight: 10, marginTop: 100 }}>
            <Text
              style={{ textAlign: "center", fontSize: 18, marginBottom: 15 }}
            >
              Register New Account
            </Text>
            {error && (
              <Text style={{ color: "red", fontSize: 15 }}>
                Something went wrong
              </Text>
            )}
            <TextInput
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />
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
              secureTextEntry
            />
            <Button
              mode="outlined"
              style={{ marginTop: 15 }}
              onPress={() => handleRegister()}
              disabled={password.length < 1}
            >
              Register
            </Button>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text>Already have an Account?</Text>
                  <Text
                    style={{ fontWeight: "bold", marginLeft: 2 }}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Login Here
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Register;
