import React, { useState, useEffect } from "react";
import { View, Text, Button, AsyncStorage, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

export default function ImportAccounts() {
  const [hasPermission, sethasPermission] = useState(null);
  const [scanned, setscanned] = useState(false);
  const [scannedData, setscannedData] = useState("");

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    sethasPermission(status === "granted");
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setscanned(true);
    setscannedData(data);
    data = JSON.parse(data);
    var newAccount = {};
    newAccount.publickey = data.publickey;
    newAccount.privatekey = data.privatekey;
    var accounts = await AsyncStorage.getItem("accounts");
    if(accounts === null){
        const acc = [];
        var tempObj = {};
        tempObj.accounts = acc;
        accounts = JSON.stringify(tempObj);
    }
    accounts = JSON.parse(accounts);
    accounts.accounts.push(newAccount);
    accounts = JSON.stringify(accounts);
    await AsyncStorage.setItem("accounts", accounts);
  };

  const scanQr = () => {
    setscanned(false);
  };

  useEffect(() => {
    getPermissionsAsync();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });

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
        <Text> Grant permission to camera </Text>
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
    </View>
  );
}
