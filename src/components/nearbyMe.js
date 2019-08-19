import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Alert, Linking, Button} from 'react-native';
// import QRScanner from  './QRScanner';
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { MapView, Constants, Location, Permissions } from 'expo';

class NearbyMe extends React.Component {
    state = {
       qrScannerView: false,
       isModalVisible: false,
       selectedLanguage: '',
       location: null,
       errorMessage: null,
       longitude: 0,
       latitude: 0
    };
    
    componentDidMount() {
        this._getLocationAsync();
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    _getLocationAsync = async () => {
        let providerStatus = await Location.getProviderStatusAsync();
        if (!providerStatus.locationServicesEnabled) {
          this.setState({
              errorMessage: 'Location Services Disabled'
          })
          return;
        }
    
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
          return
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      };  

    render() {
        let longitude = 'Waiting..';
        let latitude = 'Waiting...';
      if (this.state.errorMessage) {
        longitude = this.state.errorMessage;
        latitude = this.state.errorMessage;
      } else if (this.state.latitude) {
        // longitude = JSON.stringify(this.state.longitude);
        // latitude = JSON.stringify(this.state.latitude);
        // Alert.alert(longitude)
      }
      const imageName = require("../images/gyeongbokung.jpg");
      const WonderWoman = { uri: "http://i.imgur.com/sNam9iJ.jpg" };

      return (
        <View style={{ flex: 1, justifyContent: 'flex-start', width: vw(100), height: vh(100), backgroundColor: '#FBFEF9' }}>
            <Text style={styles.qrText}>
                Nearby Me
            </Text>
            <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.571964,
              longitude: 126.977382,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
              coordinate={{latitude: this.state.latitude,
                longitude: this.state.longitude,}}
              title="Current Location"
              // description="Some description"
            >
            <Image style={{height: 50, width: 50}} source={require('../images/youAreHere.png')}/>
            </MapView.Marker>

            <MapView.Marker
            coordinate={{latitude: 37.577501,
            longitude: 126.976737,}}
            title={"Gyeongbokung"}
            >
                <MapView.Callout tracksViewChanges= 'true' >
                    <View style={{height: 100, width: 100}}>
                        <Text>TESTING</Text>
                        <Image resizeMode='cover' style={{zIndex:10}} source={require('../images/gyeongbokung.jpg')}/>
                    </View>
                </MapView.Callout>
            </MapView.Marker>
        </MapView>
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

  export default NearbyMe;