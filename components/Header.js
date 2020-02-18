import React, { Component } from "react";
import { Image } from 'react-native';


export default class Header extends Component {

    render() {
        return (
            <Image style={{ width: 350, height: 150 }} source={require('../images/SleuthLogo.png')}/>
        );
    }
}