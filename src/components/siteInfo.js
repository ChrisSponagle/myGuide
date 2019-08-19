import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Alert, Linking, Button} from 'react-native';
// import QRScanner from  './QRScanner';
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Audio } from 'expo';
import MediaPlayer from './mediaPlayer'

class SiteInfo extends React.Component {
    state = {
       qrScannerView: false,
       isModalVisible: false,
       selectedLanguage: '',
       hearButtonView: true,
       mediaPlayerView: false,
       audio: '',
       city: '',
       country: '',
       id: '',
       latitude: '',
       longitude: '',
       name: 'Fetching information...',
       photo: '',
       site: '',
       siteid: '',
       siteintro: '',
       summary: ''
    };
    
    componentDidMount() {
        console.log(this.props)
        this.toggleModal();
        var data = {
            id: this.props.navigation.state.params.data.id,
            lang: this.props.navigation.state.params.data.lang
           };
        // let response = await
        fetch(
            'https://my-guide-korea.herokuapp.com/siteinfo', 
            {
            method: 'POST',
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((responseJson)=> {
            console.log("TESTING", responseJson)
        this.setState({
            audio: responseJson.audio,
            city: responseJson.city,
            country: responseJson.country,
            id: responseJson.id,
            latitude: responseJson.latitude,
            longitude: responseJson.longitude,
            name: responseJson.name,
            photo: responseJson.photo,
            site: responseJson.site,
            siteid: responseJson.siteid,
            siteintro: responseJson.siteintro,
            summary: responseJson.summary
        })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    playAudio() {
        this.setState({
            hearButtonView: false,
            mediaPlayerView: true
        })
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        let name = 'Gangnyeongjeon Hall'
        let site = 'Gyeongbok Palace'
        let location = 'Seoul, South Korea'
        let photo = 'https://my-guide-korea.herokuapp.com/public/photos/gangnyeongjeon.png'
        let summary = "Constructed in 1395, Ganyeongjeon Hall was used as the king's main residing quarters and contains the king's bed chamber."
        let audio = 'https://my-guide-korea.herokuapp.com/public/audio/Gangyeongjeon.m4a'
      return (
        <View style={{ flex: 1, flexDirection: 'column',  width: vw(100), height: vh(100), backgroundColor: '#FBFEF9' }}>
          <Text style={styles.nameText}>{this.state.name}</Text>
          <Text style={styles.siteText}>{this.state.site}</Text>
          <Text style={styles.locationText}>{this.state.location}</Text>
          <Image style={styles.photo} source={{uri: 'https://my-guide-korea.herokuapp.com/public/photos/' + this.state.photo}}/>
          <View style={{width: vw(80), alignSelf: 'center'}}>
            <Text style={styles.summaryText}>{this.state.summary}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'space-around'}}>
          {this.state.hearButtonView &&  
            <TouchableOpacity style={{backgroundColor: '#DBBB5C', 
                                    width: 235,
                                    height: 50,
                                    // position: 'absolute',
                                    elevation: 3,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    // top: 50,
                                    }}
                onPress={() => {this.playAudio();}}>
                <Text style={styles.qrText}>
                    Hear More
                </Text>
            </TouchableOpacity>
          }
          {this.state.mediaPlayerView && 
            <View style={{flex: 1,}}>
                <MediaPlayer audio={'https://my-guide-korea.herokuapp.com/public/audio/' + this.state.audio}/>
            </View>
          }
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Map', {siteid: this.state.siteid });}} style={styles.qrButton}>
                <Text style={styles.qrText}>
                    Map
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } 
   
  }

  const styles = {
    qrButton: {
        backgroundColor: '#DBBB5C', 
        width: 235,
        height: 50,
        elevation: 3,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20
    },
    qrText: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 30,
        textAlign: 'center',
        color: '#FBFEF9',
        alignSelf: 'center'
    },
    nameText: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 30,
        textAlign: 'center'
    },
    siteText: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        textAlign: 'center'
    },
    locationText: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        textAlign: 'center'
    },
    photo: {
        width: 316,
        height: 212,
        alignSelf: 'center'
    },
    summaryText: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18,
        textAlign: 'center'
    }
};

  export default SiteInfo;