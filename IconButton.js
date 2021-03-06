import React, { Component } from 'react';
import { Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';

import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { parseIconFromClassName } from 'react-native-fontawesome';
import * as Font from 'expo-font';
import  FontAwesomeIcon  from './FontAwesomeIcon';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

export default class IconButton extends Component {
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'Font Awesome': require('./assets/fonts/fontawesome.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    return (
      <View style={[styles.parent, this.props.style]} onPress={this.props.onPress}>
        <FontAwesomeIcon onPress={this.props.onPress} style={this.props.iconStyle} icon={this.props.icon}/>
        <Text onPress={this.props.onPress} style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  parent:{
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  text:{
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    color: "#fff"
  },

});
