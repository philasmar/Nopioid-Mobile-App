import React, { Component } from 'react';
import { TextInput, Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';

import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { parseIconFromClassName } from 'react-native-fontawesome';
import * as Font from 'expo-font';
import  IconButton  from './IconButton';
import  TextBox  from './TextBox';
import firebase from './FirebaseDatabase';
import {InteractionManager} from 'react-native';

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
export const db = firebase.database();
if (Platform.OS === 'android') {
// Work around issue `Setting a timer for long time`
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}

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
      this.type = "";
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
    try {
        this.type = this.props.navigation.state.params.type;
    }
    catch(error) {
    }
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
      const { replace } = this.props.navigation;
      var username = this.state.email.toLowerCase();
      var password = this.state.password;
      if(username != "" && password != ""){
        var users = db.ref('/nopioid-mobile-app').child("users");
        users.once('value', function(snapshot) {
         if (snapshot.hasChild(username)) {
           var json = JSON.parse(JSON.stringify(snapshot.val()));
           if(password == json[username].password){
             origin.clearUserNamePassword();
             replace("MainRecommenderScreen", {user: username, type: origin.type});
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
  const { navigate } = this.props.navigation;
  navigate("CreateAccountScreen", {type: this.type});
    // usernameTextInput = this.usernameTextInput;
    // passwordTextInput = this.passwordTextInput;
    // origin = this;
    // const { navigate } = this.props.navigation;
    // var username = this.state.email.toLowerCase();
    // var password = this.state.password;
    // if(username != "" && password != ""){
    //   var users = db.ref('/nopioid-mobile-app').child("users");
    //   users.once('value', function(snapshot) {
    //    if (snapshot.hasChild(username)) {
    //      alert("This user already exists.");
    //    }
    //    else{
    //        users.child(username).set({ password: password }).then(function(snapshot) {
    //            origin.clearUserNamePassword();
    //            navigate("MainScreen", {user: username}); // some success method
    //        }, function(error) {
    //          alert('Error submitting form: ' + error);
    //        });
    //    }
    //  });
    // }
    // else{
    //   alert("Kindly enter a valid username and password.");
    // }
  }
}

const styles = StyleSheet.create({
  loginButton:{
    maxWidth: 500,
    backgroundColor: "#ad2ea1",
    marginTop: 10,
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#cb2877',
    padding: 10,
    textAlign: "center",
    color: "#ddd",
    overflow:"hidden",
    alignSelf: "center",
    width: "100%"
  },
  loginTextBox:{
    maxWidth: 500,
    marginTop: 10,
    backgroundColor: "#fff",
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    padding: 10,
    alignSelf: "center",
    width: "100%"
  },
  mainContainer:{
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    paddingTop: 43,
    paddingBottom: 30,
    justifyContent: "center",
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
