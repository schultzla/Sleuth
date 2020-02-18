import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as RootNavigation from './RootNavigation.js';

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Feed'
    }
  }

  tabs = [
    {
      key: 'Feed',
      icon: 'comments',
      label: 'Feed',
      barColor: '#282c34',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'Post',
      icon: 'edit',
      label: 'Post',
      barColor: '#282c34',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ]

  handleTabPress = (newTab, oldTab) => {
    this.setState({ activeTab: newTab.key })
    RootNavigation.navigate(newTab.key)
  }

  renderTab = ({ tab, isActive }) => {
    return (
      <FullTab
        key={tab.key}
        isActive={isActive}
        label={tab.label}
        renderIcon={this.renderIcon(tab.icon)}
      />
    )
  }

  renderIcon = iconName => ({ isActive }) => {
    if (isActive) {
      return <FontAwesomeIcon size={24} color="#FFC106" icon={iconName} />
    } else {
      return <FontAwesomeIcon size={24} color="#ffffff" icon={iconName} />
    }
  }


  render() {
    return (
      <BottomNavigation
        renderTab={this.renderTab}
        activeTab={this.state.activeTab}
        onTabPress={this.handleTabPress}
        tabs={this.tabs}
        style={styles.nav}
      />
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#282c34'
  },
  nav: {
    width: '100%'
  }
})