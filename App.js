import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer, NavigationActions, StackActions, StackNavigator, Header } from "react-navigation";
import Home from './src/components/home';
import HomeHeader from './src/components/header';
import LogoHeader from './src/components/logoHeader';
import MyTours from './src/components/myTours';
import NearbyMe from './src/components/nearbyMe';
import SearchSites from './src/components/searchSites';
import SiteInfo from './src/components/siteInfo';
import Map from './src/components/map';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import Modal from 'react-native-modal';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

console.disableYellowBox = true;
class HomeScreen extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
            isLangModalVisible: false,
            selectedLanguage: ''
        };
    }
  componentDidMount() {
    this.toggleLangModal();
  };

  changeLang = () => {
    if (this.state.selectedLanguage === '') {
        alert("Please choose a language") 
    }
    else
    this.toggleLangModal()
  } 

  toggleLangModal = () => {
    this.setState({ isLangModalVisible: !this.state.isLangModalVisible });
  };

  static navigationOptions= ({ navigation }) => {
    return {
      header: (
        <HomeHeader navigation={navigation} />
      ),
    };
  };
  
  render() {
    const {navigate} = this.props.navigation;
    const navigation = this.props.navigation;
    var radio_props = [
      {label: 'English', value: 0 },
      {label: 'Français', value: 1 },
      {label: '한국어', value: 2 },
      {label: '中文', value: 3 }
    ];
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <LogoHeader/>
        <Home navigation={navigation}/>
        <Modal visible={this.state.isLangModalVisible}>
                    <View style={styles.modal}>
                        <Text style={styles.modalText}>Choose your language</Text>
                        <RadioForm
                        style={{marginLeft: 25, marginTop: 20}}
                        radio_props={radio_props}
                        initial={'English'}
                        onPress={(value) => {this.setState({selectedLanguage:value}); }}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={this.changeLang}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
        </Modal>
      </View>
    );
  }  
}

class MyToursScreen extends React.Component {
  static navigationOptions= ({ navigation }) => {
    return {
      header: (
        <HomeHeader navigation={navigation}/>
      ),
    };
  };
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <LogoHeader/>
        <MyTours navigate={navigate}/>
      </View>
    );
  }  
}

class NearbyMeScreen extends React.Component {
  static navigationOptions= ({ navigation }) => {
    return {
      header: (
        <HomeHeader navigation={navigation}/>
      ),
    };
  };
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <LogoHeader/>
        <NearbyMe navigate={navigate}/>
      </View>
    );
  }  
}

class SearchSitesScreen extends React.Component {
  static navigationOptions= ({ navigation }) => {
    return {
      header: (
        <HomeHeader navigation={navigation}/>
      ),
    };
  };
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <LogoHeader/>
        <SearchSites navigate={navigate}/>
      </View>
    );
  }  
}

class SiteInfoScreen extends React.Component {
  static navigationOptions = {
    header: null
}
  
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{ flex: 1, marginTop: 30, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <LogoHeader />
        <SiteInfo navigation={navigation}/>
      </View>
    );
  }  
}

class MapScreen extends React.Component {
  static navigationOptions = {
    header: null
}
  
  render() {
    return (
      <View style={{ flex: 1, marginTop: 30, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <LogoHeader/>
        <Map/>
      </View>
    );
  }  
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    MyTours: MyToursScreen,
    NearbyMe: NearbyMeScreen,
    SearchSites: SearchSitesScreen,
    SiteInfo: SiteInfoScreen,
    Map: MapScreen
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFEF9',
    alignItems: 'center',
    justifyContent: 'center',
    height: vh(100),
    width: vw(100)

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
});
