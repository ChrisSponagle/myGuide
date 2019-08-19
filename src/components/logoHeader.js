import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const LogoHeader = (props) => {
    const { textStyle, viewStyle } = styles;
    
    return (
        <View style={viewStyle}>
            <Image style={{alignSelf: 'center'}} source={require('../images/logoHeader.png')}/>
        </View>
    );
};

const styles = {
    viewStyle: {
        justifyContent: 'center',
        backgroundColor: '#FBFEF9',
        width: vw(100),
    },
};

export default LogoHeader;