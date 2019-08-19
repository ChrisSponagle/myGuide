import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

class HomeHeader extends Component {
    constructor(props) {
		super(props);
		this.state = {
            searchValue: '',
            isModalVisible: false,
            isLangModalVisible: false,
            selectedLanguage: ''
        };
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
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

    render() {
        var radio_props = [
            {label: 'English', value: 0 },
            {label: 'Français', value: 1 },
            {label: '한국어', value: 2 },
            {label: '中文', value: 3 }
        ];
        return (
            <View
            style={{
                height: 65,
                marginTop: 20,
                backgroundColor: '#00A7E1',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <TextInput style={styles.searchBar} value={this.state.searchValue} placeholder="Search"
                    onChangeText={ (searchValue) => this.setState({ searchValue }) }
                    value={this.state.text} ref={input => { this.searchValueTextInput = input }}/>
                <TouchableOpacity onPress={() => this.toggleModal() }>
                    <Image source={require('../images/hamburgerMenu.png')}/>
                </TouchableOpacity>
                {/* MENU */}
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1, width: vw(100), height: vh(100), marginLeft: -20, marginTop: -20, marginBottom: -20, backgroundColor: '#00A7E1',
                    }}>
                        <Image style={{alignSelf: 'center', width: 100, height: 100, marginTop: 30, marginBottom: -80}} source = {require('../images/compass.png')}/>
                        <TouchableOpacity onPress={this.toggleModal}>
                            <Image style={{alignSelf: 'flex-end', width: 40, height: 40, marginTop: 0, marginBottom: 50, marginRight: 20}} source = {require('../images/menuX.png')}/>
                        </TouchableOpacity>
                    
                        {/* MENU ITEMS */}
                        <TouchableOpacity
                        onPress={() => {this.toggleModal(); this.props.navigation.navigate('Home', {  }); }}
                        >
                        <Text style={styles.menuList}>Scan QR Code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.toggleModal(); this.props.navigation.navigate('MyTours', {siteCode: '1234' });}}
                        >
                        <Text style={styles.menuList}>My Tours</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => {this.toggleLangModal(); }}                    >
                        <Text style={styles.menuList}>Change Language</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => {this.toggleModal(); this.props.navigation.navigate('NearbyMe', {  }); }}
                        >
                        <Text style={styles.menuList}>Nearby Me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => {this.toggleModal(); this.props.navigation.navigate('Contact', {  }); }}
                        >
                        <Text style={styles.menuList}>Contact</Text>
                        </TouchableOpacity>
                    
                    </View>
                </Modal>
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
    };
}

const styles = {
    searchBar: {
        backgroundColor: '#FBFEF9',
        height: 40,
        width: 250,
        borderRadius: 5,
        padding: 5
    },
    menuList: {
        fontSize: 30,
        color: '#FBFEF9',
        alignSelf: 'center',
        marginBottom: 40
        
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

export default HomeHeader;