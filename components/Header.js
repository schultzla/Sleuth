import React, { Component } from "react";
import { Image, View} from 'react-native';


export default class Header extends Component {

    render() {
        return (
            <View style={{alignItems: 'center', backgroundColor: "#282c34"}}>
                <Image style={{ width: 350, height: 150 }} source={require('../images/SleuthLogo.png')} />
            </View>
        );
    }
}