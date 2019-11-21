import React, { Component } from 'react';
import { TextInput, Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';

import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { parseIconFromClassName } from 'react-native-fontawesome';
import * as Font from 'expo-font';
import  IconButton  from './IconButton';
import  TextBox  from './TextBox';
import Firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCBJehn1x9TRi8o9sD947Y8JIKI5niZb1w",
  authDomain: "nopioid-c9618.firebaseapp.com",
  databaseURL: "https://nopioid-c9618.firebaseio.com",
  projectId: "nopioid-c9618",
  storageBucket: "nopioid-c9618.appspot.com",
  messagingSenderId: "993898990420",
  appId: "1:993898990420:web:90cfaea25871b3a39d56c1",
  measurementId: "G-9SL7LZ5NFE"
};

let app = Firebase.initializeApp(config);
export const db = app.database();

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
const validIcon = parseIconFromClassName('fas fa-plus');
const vari = "";

export default class Login extends Component {
  constructor(props) {
        super(props);
      this.createAccountButtonClick = this.createAccountButtonClick.bind(this);
      this.clearUserNamePassword = this.clearUserNamePassword.bind(this);
      this.loginButtonClick = this.loginButtonClick.bind(this);
      this.state = {isLoggedIn : false, email :"", password : ""};
    }
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
      <ImageBackground
        source={require('./images/nopioid-banner.png')}
        style={styles.imageBackground}>
        <View style={styles.mainContainer}>
          <Text style={styles.mainTitle}>Nopioid</Text>
          <TextInput ref={input => { this.usernameTextInput = input }} placeholder="Username" style={styles.loginTextBox} onChangeText = {(text) => this.setState({email : text})}/>
          <TextInput ref={input => { this.passwordTextInput = input }} secureTextEntry={true} placeholder="Password" style={styles.loginTextBox} onChangeText = {(text) => this.setState({password : text})}/>
          <Text onPress={this.loginButtonClick} style={styles.loginButton}>Login</Text>
          <Text onPress={this.createAccountButtonClick} style={styles.loginButton}>Create Account</Text>
        </View>
      </ImageBackground>
    );
  }

  loginButtonClick(){
      usernameTextInput = this.usernameTextInput;
      passwordTextInput = this.passwordTextInput;
      origin = this;
      const { navigate } = this.props.navigation;
      var username = this.state.email.toLowerCase();
      var password = this.state.password;
      if(username != "" && password != ""){
        var users = db.ref('/nopioid-mobile-app').child("users");
        users.once('value', function(snapshot) {
         if (snapshot.hasChild(username)) {
           var json = JSON.parse(JSON.stringify(snapshot.val()));
           if(password == json[username].password){
             origin.clearUserNamePassword();
             navigate("MainScreen");
           }else{
             alert("Invalid username or password.");
           }
         }
         else{
           alert("Invalid username or password.");
         }
       });
      }
      else{
        alert("Invalid username or password.");
      }
  }

  clearUserNamePassword(){
    usernameTextInput.clear();
    passwordTextInput.clear();
    this.setState({email : ""});
    this.setState({password : ""});
  }

  createAccountButtonClick(){
    usernameTextInput = this.usernameTextInput;
    passwordTextInput = this.passwordTextInput;
    origin = this;
    const { navigate } = this.props.navigation;
    var username = this.state.email.toLowerCase();
    var password = this.state.password;
    if(username != "" && password != ""){
      var users = db.ref('/nopioid-mobile-app').child("users");
      users.once('value', function(snapshot) {
       if (snapshot.hasChild(username)) {
         alert("This user already exists.");
       }
       else{
           users.child(username).set({ password: password }).then(function(snapshot) {
               origin.clearUserNamePassword();
               navigate("MainScreen"); // some success method
           }, function(error) {
             alert('Error submitting form: ' + error);
           });
       }
     });
    }
    else{
      alert("Kindly enter a valid username and password.");
    }
  }
}

const styles = StyleSheet.create({
  loginButton:{
    backgroundColor: "#ad2ea1",
    width: 400,
    marginTop: 10,
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#cb2877',
    padding: 10,
    textAlign: "center",
    color: "#ddd",
    overflow:"hidden",
  },
  loginTextBox:{
    width: 400,
    marginTop: 10,
    backgroundColor: "#fff",
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    padding: 10,
  },
  mainContainer:{
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 10,
    paddingTop: 43,
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  imageBackground:{
    flex: 1,
    width: '100%',
    height: '100%'
  },
  mainTitle: {
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: "center",
    alignSelf: "center",
    fontWeight: "700",
    color: "#fff",
    marginBottom: 30
  },
});
