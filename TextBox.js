import React, { Component } from 'react';
import { TextInput, Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';

export default class TextBox extends Component {
  constructor(props){
    super(props);
    this.text = '';
  }
  render() {
    return (
      <View style={[styles.parent, this.props.style]}>
        <TextInput
        style={styles.textStyle}
        placeholder={this.props.placeholder}
        onChange = {(text) => this.text = text}
      />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textStyle:{
    backgroundColor: "#fff",
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    padding: 10,
  },
  parent:{

  },
  text:{
    textAlign: "center",
    textAlignVertical: "center"
  }
});
