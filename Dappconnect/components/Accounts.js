import React, { useState, useEffect } from "react";
import { View, Text, AsyncStorage, StyleSheet } from "react-native";

export default function Accounts() {
  const [accounts, setaccounts] = useState([]);

  const getAccounts = async () => {
    var acc = await AsyncStorage.getItem("accounts");
    acc = JSON.parse(acc);
    acc = acc.accounts;
    console.log(acc);
    setaccounts(acc);
  };

  useEffect(() => {
    getAccounts();
  },[]);

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
      {accounts.map((account,id) => {
        return (
          <View key={id}>
            <Text> Public Key : {account.publickey} </Text>
            <Text> Private Key : {account.privatekey} </Text>
            <Text> ----------------------------- </Text>
          </View>
        );
      })}
    </View>
  );
}
