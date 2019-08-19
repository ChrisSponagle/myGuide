import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Alert, Linking, Button} from 'react-native';
import QRScanner from  './QRScanner';
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

class Home extends React.Component {
    state = {
       qrScannerView: false,
       scanButtonView: true
    };

    showScanner = () => {
        this.setState({
            qrScannerView: true,
            scanButtonView: false
        });
    }

    hideScanner = () => {
        this.setState({
            qrScannerView: false,
            scanButtonView: true
        });
    }

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', width: vw(100), height: vh(100), backgroundColor: '#FBFEF9' }}>
          {this.state.scanButtonView && 
          <TouchableOpacity  onPress={() => this.showScanner() } style={styles.qrButton}>
            <Text style={styles.qrText}>
                Scan QR Code
            </Text>
          </TouchableOpacity>
          }
            <View style={{alignSelf: 'center'}}>
            {this.state.qrScannerView && 
            <View  >
                <View style={{height: vh(100), width:vw(100)}}> 
                    <QRScanner navigation={this.props.navigation} hideScanner={this.hideScanner} style={{ alignSelf:'center'}}/>
                </View>
                <TouchableOpacity  onPress={() => this.hideScanner() } style={styles.cancelButton}>
                    <Text style={styles.cancelText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                </View> 
            }
            </View>
        </View>
      );
    } 
   
  }

  const styles = {
    qrButton: {
        backgroundColor: '#DBBB5C', 
        width: 235,
        height: 60,
        position: 'absolute',
        elevation: 3,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        top: 50
    },
    qrText: {
        // fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 30,
        textAlign: 'center',
        color: '#FBFEF9',
        alignSelf: 'center'
    },
    cancelButton: {
        backgroundColor: '#8B94A3', 
        width: 100,
        height: 50,
        position: 'absolute',
        elevation: 2,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        zIndex: 10,
        bottom: 100
    },
    cancelText: {
        // fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        textAlign: 'center',
        color: '#FBFEF9',
        alignSelf: 'center'
    },
    modal: {
        height: 270, 
        width: 300, 
        backgroundColor: '#FBFEF9', 
        alignSelf: 'center', 
        borderRadius: 5
    },
    modalText: {
        fontSize: 20,
        marginLeft: 20,
        marginTop: 20
    },
    modalButton: {
        width: 50, 
        height: 50, 
        backgroundColor: '#00A7E1', 
        borderRadius: 5, 
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'flex-end',
        marginRight: 20
    },
    modalButtonText: {
        color: '#FBFEF9', 
        alignSelf: 'center', 
        fontSize: 20
    },
};

  export default Home;