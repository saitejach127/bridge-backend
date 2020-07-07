import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  const importHandler = () => {
    navigation.navigate("ImportAccounts");
  };

  const loginHandler = () => {
    navigation.navigate("Login");
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
      <Button title="Login" onPress={loginHandler}></Button>
      <Button title="List Accounts" onPress={accountsHandler}></Button>
    </View>
  );
}
