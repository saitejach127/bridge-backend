import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, AsyncStorage, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

export default function ({navigation}) {
  const [hasPermission, sethasPermission] = useState(null);
  const [scanned, setscanned] = useState(true);
  const [scannedData, setscannedData] = useState("");

  var socket = navigation.getParam("socket");

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    sethasPermission(status === "granted");
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setscanned(true);
    console.log("Joining Room ", data);
    setscannedData(data);
    socket.emit("joinRoom", {id:data});
    socket.on("message", (d) => {
        console.log(d);
    });
    var accounts = await AsyncStorage.getItem("accounts");
    accounts = JSON.parse(accounts);
    var buf = {};
    buf.id = data;
    buf.account = accounts.accounts[0];
    buf.type = "account";
    socket.emit("message",JSON.stringify(buf));
  };

  const scanQr = () => {
    setscanned(false);
  };

  const sendSomething = () => {
      socket.emit("message", JSON.stringify({id:scannedData, "some" : Math.random()}))
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  useEffect(() => {
    getPermissionsAsync();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text> Asking for Permission </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text> Please Grant permission to camera </Text>
      </View>
    );
  }

  if (scanned === false) {
    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Scan the Qr code to import Account</Text>
      <Text>{scannedData}</Text>
      <Button title="Scan Qr" onPress={scanQr}></Button>
      <Button title="Send Something" onPress={sendSomething }></Button>
    </View>
  );
}
