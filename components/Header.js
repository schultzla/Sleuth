import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


export default class Header extends Component {

    render() {
        return (
            <FontAwesomeIcon style={{ marginTop: '10%' }} size={70} color={'#FFC106'} icon="user-secret" />
        );
    }
}