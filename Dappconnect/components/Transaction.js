import React, { useEffect } from "react";
import { View, Text, Button, AsyncStorage } from "react-native";

export default function Transaction({ navigation }) {
  var tx = navigation.getParam("tx");
  var socket = navigation.getParam("socket");
  var web3 = navigation.getParam("web3");

  const acceptHandler = async () => {
    var id = JSON.parse(tx).id;
    var acc = await AsyncStorage.getItem("accounts");
    acc = JSON.parse(acc);
    acc = acc.accounts;
    var privatekey = acc[0].privatekey;
    var signedTx = await web3.eth.accounts
    .signTransaction(
      {
        to: "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55",
        value: "1000000000",
        gas: 2000000,
        gasPrice: "234567897654321",
        nonce: 0,
        chainId: 1,
      },
      privatekey
    )
    console.log(signedTx);
    var data = { id };
    data.status = "accepted";
    socket.emit("message", JSON.stringify(data));
    navigation.goBack();
  };

  const rejectHandler = () => {
    var id = JSON.parse(tx).id;
    var data = { id };
    data.status = "rejected";
    socket.emit("message", JSON.stringify(data));
    navigation.goBack();
  };

  return (
    <View>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text>{tx}</Text>
      <Text></Text>
      <Text></Text>
      <Button title="Accept" onPress={acceptHandler} />
      <Text></Text>
      <Button title="Reject" onPress={rejectHandler} />
    </View>
  );
}
