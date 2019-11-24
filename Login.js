import React, { Component } from 'react';
import { TextInput, Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import  TextBox  from './TextBox';
import { NavigationActions, withNavigationFocus } from 'react-navigation';
import firebase from './FirebaseDatabase';
import {InteractionManager} from 'react-native';
import AppActionBar from './AppActionBar'

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

export default class Login extends Component {
  constructor(props) {
      super(props);
      this.createAccountButtonClick = this.createAccountButtonClick.bind(this);
      this.clearUserNamePassword = this.clearUserNamePassword.bind(this);
      this.loginButtonClick = this.loginButtonClick.bind(this);
      this.state = {type: "", email :"", password : ""};
  }

  componentDidMount(prevProps) {
    if ("params" in this.props.navigation.state){
      if ("type" in this.props.navigation.state.params){
        type = this.props.navigation.state.params.type;
        if (type != this.state.type){
          this.setState({type: type});
        }
      }
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('./images/nopioid-banner.png')}
        style={styles.imageBackground}>
        <AppActionBar state={this.state}/>
        <View style={styles.mainContainer}>
          <Text style={styles.mainTitle}>Personalize Your Experience</Text>
          <TextInput ref={input => { this.usernameTextInput = input }} placeholder="Username" style={styles.loginTextBox} onChangeText = {(text) => this.setState({email : text})}/>
          <TextInput ref={input => { this.passwordTextInput = input }} secureTextEntry={true} placeholder="Password" style={styles.loginTextBox} onChangeText = {(text) => this.setState({password : text})}/>
          <Text onPress={this.loginButtonClick} style={styles.loginButton}>Login</Text>
          <Text onPress={this.createAccountButtonClick} style={styles.loginButtonBasic}>Create Account</Text>
        </View>
      </ImageBackground>
    );
  }

  loginButtonClick(){
      usernameTextInput = this.usernameTextInput;
      passwordTextInput = this.passwordTextInput;
      origin = this;
      const { replace, reset, push } = this.props.navigation;
      var username = this.state.email.toLowerCase();
      var password = this.state.password;
      if(username != "" && password != ""){
        var users = db.ref('/nopioid-mobile-app').child("users");
        users.once('value', function(snapshot) {
         if (snapshot.hasChild(username)) {
           var json = JSON.parse(JSON.stringify(snapshot.val()));
           if(password == json[username].password){
             origin.clearUserNamePassword();
             if(origin.state.type){
               replace("MainRecommenderScreen", {user: username, type: origin.state.type});
             }else{
               // alert(username);
               reset([NavigationActions.navigate({ routeName: 'MainScreen', params: {user: username} })], 0);
             }
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
    navigate("CreateAccountScreen", {type: this.state.type});
  }
}

const styles = StyleSheet.create({
  loginButton:{
    maxWidth: 180,
    backgroundColor: "#000",
    marginTop: 10,
    fontSize: 23,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#cb2877',
    padding: 15,
    textAlign: "center",
    color: "#ddd",
    overflow:"hidden",
    alignSelf: "center",
    width: "100%"
  },
  loginButtonBasic:{
    maxWidth: 180,
    marginTop: 13,
    fontSize: 23,
    textDecorationLine: "underline",
    textAlign: "center",
    color: "#fff",
    overflow:"hidden",
    alignSelf: "center",
    width: "100%"
  },
  loginTextBox:{
    maxWidth: 500,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 25,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    padding: 15,
    alignSelf: "center",
    width: "100%"
  },
  mainContainer:{
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 30,
    justifyContent: "center",
    // backgroundColor: "#ff0000"
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
