import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faUserSecret, faComments } from '@fortawesome/free-solid-svg-icons'
import Header from './components/Header';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation'
import ActiveMenu from './components/ActiveMenu';
import DropdownAlert from 'react-native-dropdownalert';

library.add(faUserSecret, faPlusCircle, faComments)

export default class App extends Component {
  state = {
    activeTab: 'feed'
  }

  tabs = [
    {
      key: 'feed',
      icon: 'comments',
      label: 'Feed',
      barColor: '#282c34',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'post',
      icon: 'plus-circle',
      label: 'Post',
      barColor: '#282c34',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ]

  handleTabPress = (newTab, oldTab) => {
    this.setState({ activeTab: newTab.key })
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
      <View style={styles.view}>
        <Header viewStyle={styles.view} />
        <ActiveMenu dropdown={this.dropDownAlertRef} viewStyle={styles.view} active={this.state.activeTab} />
        <BottomNavigation
          renderTab={this.renderTab}
          activeTab={this.state.activeTab}
          onTabPress={this.handleTabPress}
          tabs={this.tabs}
          style={styles.nav}
        />

        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </View>
    );
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