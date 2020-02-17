import React, { Component } from "react";
import Submission from './Submission';
import Messages from './Messages'

export default class ActiveMenu extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.active === 'feed') {
      return (
        <Messages viewStyle={this.props.viewStyle} />
      );
    } else if (this.props.active === 'post') {
      return (
        <Submission dropdown={this.props.dropdown} viewStyle={this.props.viewStyle} />
      );
    }
  }
}