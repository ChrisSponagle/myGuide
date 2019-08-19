import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Alert, Linking, Button} from 'react-native';
// import QRScanner from  './QRScanner';
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import MediaPlayer from './mediaPlayer'

class SearchSites extends React.Component {
    state = {
       qrScannerView: false,
       isModalVisible: false,
       selectedLanguage: '',
    };
    
    componentDidMount() {
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        
      return (
        <View style={{ flex: 1, justifyContent: 'flex-start', width: vw(100), height: vh(100), backgroundColor: '#FBFEF9' }}>
            <MediaPlayer/>
        </View>
      );
    } 
   
  }

  const styles = {
    qrText: {
        // fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 45,
        textAlign: 'center',
        color: 'black',
        alignSelf: 'center'
    },
};

  export default SearchSites;