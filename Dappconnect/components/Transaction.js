import React, { useEffect } from "react";
import { View, Text, Button, AsyncStorage } from "react-native";

export default function Transaction({ navigation }) {
  var tx = navigation.getParam("tx");
  var socket = navigation.getParam("socket");
  var web3 = navigation.getParam("web3");

  var txdata =
    "0xb384abef00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001";

  const acceptHandler = async () => {
    var id = JSON.parse(tx).id;
    var acc = await AsyncStorage.getItem("accounts");
    acc = JSON.parse(acc);
    acc = acc.accounts;
    const nonce = await web3.eth.getTransactionCount(acc[0].publickey);
    var privatekey = acc[0].privatekey;
    var signedTx = await web3.eth.accounts.signTransaction(
      JSON.parse(tx).tx,
      privatekey
    );
    console.log(signedTx);
    const sentTx = web3.eth.sendSignedTransaction(
      signedTx.raw || signedTx.rawTransaction
    );
    sentTx.on("receipt", (receipt) => {
      console.log("receipt ", receipt);
    });
    var data = { id };
    data.type = "voting"
    data.status = "accepted";
    socket.emit("message", JSON.stringify(data));
    navigation.goBack();
  };

  const rejectHandler = () => {
    var id = JSON.parse(tx).id;
    var data = { id };
    data.type = "voting";
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
