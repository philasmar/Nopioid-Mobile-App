import React, { Component } from 'react';
import { Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';

import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { parseIconFromClassName } from 'react-native-fontawesome';
import * as Font from 'expo-font';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

export default class FontAwesomeIcon extends Component {
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
        this.state.fontLoaded ? (
          <Text adjustsFontSizeToFitWidth
              numberOfLines={1} onPress={this.props.onPress} style={[styles.icon, this.props.style]}>{this.props.icon}</Text>

        ) : null
    );
  }
}
const styles = StyleSheet.create({

  icon:{
    fontFamily: "Font Awesome",
    textAlign: 'center',
    textAlignVertical: "center",
    padding: 5,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: responsiveFontSize(10),
    color: "#fff"
  },
});
