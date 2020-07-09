import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import io from "socket.io-client";
const Web3 = require("web3");

var socket = io.connect("http://192.168.43.242:5000");
var web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://bcnode1.assetmonk.io"
  )
);

export default function Home({ navigation }) {
  socket.on("transaction", (tx) => {
    navigation.navigate("Transaction", {
      socket: socket,
      tx: JSON.stringify(tx),
      web3 : web3
    });
  });

  const importHandler = () => {
    navigation.navigate("ImportAccounts");
  };

  const loginHandler = () => {
    navigation.navigate("Login", { socket: socket });
  };

  const accountsHandler = () => {
    navigation.navigate("Accounts");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Button title="Import Account" onPress={importHandler}></Button>
      <Text></Text>
      <Button title="Login" onPress={loginHandler}></Button>
      <Text></Text>
      <Button title="List Accounts" onPress={accountsHandler}></Button>
    </View>
  );
}
