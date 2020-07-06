import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as Permissions from "expo-permissions";
import io from "socket.io-client";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: null,
    openCamera: false,
    scannedData : null,
    socket : null
  };

  componentDidMount() {
    this.connectToServer();
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
    });
  };

  startScan = () => {
    console.log("starting");
    this.setState({ scanned: false });
  };

  connectToServer = () =>{
    var socket = io.connect("http://localhost:5000");
    this.setState({socket});
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    if (scanned === false) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style = {
            StyleSheet.absoluteFillObject
          }
        />
      );
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Text>{this.state.scannedData}</Text>
      <Text>{this.state.socket.id}</Text>
        <Button title="Scan Qr" onPress={this.startScan}></Button>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData : data
    });
    console.log(this.state.socket);
    this.state.socket.emit("joinRoom", {id:this.state.scannedData});
  };
}
