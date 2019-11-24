import React, { Component } from 'react';
import { ScrollView, Picker, TextInput, Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import  TextBox  from './TextBox';
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

export default class CreateAccount extends Component {
  constructor(props) {
        super(props);
      this.createAccountButtonClick = this.createAccountButtonClick.bind(this);
      this.clearUserNamePassword = this.clearUserNamePassword.bind(this);
      this.loginButtonClick = this.loginButtonClick.bind(this);
      this.state = {
        firstname :"",
        lastname : "",
        email : "",
        username : "",
        password : "",
        day : "",
        month : "",
        year : "",
        gender : "",
        insurance : "",
        zipcode : "",
        type: ""
      };
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
          <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
            <Text style={styles.mainTitle}>Create an Account</Text>
            <TextInput ref={input => { this.firstnameTextInput = input }} placeholder="First Name" style={styles.loginTextBox} onChangeText = {(text) => this.setState({firstname : text})}/>
            <TextInput ref={input => { this.lastnameTextInput = input }} placeholder="Last Name" style={styles.loginTextBox} onChangeText = {(text) => this.setState({lastname : text})}/>
            <TextInput ref={input => { this.emailTextInput = input }} placeholder="Email" style={styles.loginTextBox} onChangeText = {(text) => this.setState({email : text})}/>
            <TextInput ref={input => { this.usernameTextInput = input }} placeholder="Username" style={styles.loginTextBox} onChangeText = {(text) => this.setState({username : text})}/>
            <TextInput ref={input => { this.passwordTextInput = input }} secureTextEntry={true} placeholder="Password" style={styles.loginTextBox} onChangeText = {(text) => this.setState({password : text})}/>
            <View style={styles.dateOfBirth}>
              <TextInput keyboardType = 'numeric' ref={input => { this.dateofbirthMonthTextInput = input }} placeholder="Month" style={styles.dateOfBirthloginTextBox} onChangeText = {(text) => this.setState({month : text})}/>
              <TextInput keyboardType = 'numeric' ref={input => { this.dateofbirthDayTextInput = input }} placeholder="Day" style={[styles.dateOfBirthloginTextBox, {marginLeft: 5, marginRight: 5}]} onChangeText = {(text) => this.setState({day : text})}/>
              <TextInput keyboardType = 'numeric' ref={input => { this.dateofbirthYearTextInput = input }} placeholder="Year" style={styles.dateOfBirthloginTextBox} onChangeText = {(text) => this.setState({year : text})}/>
            </View>
            <View style={styles.genderDropdownContainer}>
              <Picker
                selectedValue={this.state.gender}
                style={styles.genderDropdown}
                onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
                <Picker.Item label="Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>
            <TextInput ref={input => { this.insuranceTextInput = input }} placeholder="Insurance" style={styles.loginTextBox} onChangeText = {(text) => this.setState({insurance : text})}/>
            <TextInput keyboardType = 'numeric' ref={input => { this.zipcodeTextInput = input }} placeholder="Zip Code" style={styles.loginTextBox} onChangeText = {(text) => this.setState({zipcode : text})}/>
            <Text onPress={this.createAccountButtonClick} style={styles.loginButton}>Create Account</Text>
          </ScrollView>
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
             replace("MainRecommenderScreen", {user: username, type: origin.state.type});
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
    origin = this;


    const { reset } = this.props.navigation;
    var firstname = this.state.firstname;
    var lastname = this.state.lastname;
    var email = this.state.email.toLowerCase();
    var username = this.state.username.toLowerCase();
    var password = this.state.password;
    var day = this.state.day;
    var month = this.state.month;
    var year = this.state.year;
    var gender = this.state.gender;
    var insurance = this.state.insurance;
    var zipcode = this.state.zipcode;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
    }else{
      email = "";
    }
    try {
        day = parseInt(day);
        month = parseInt(month);
        year = parseInt(year);
        year = parseInt(year);
        if (day < 1 || day > 31){
          day = "";
        }
        if (month < 1 || month > 12){
          month = "";
        }
        if (year < 1960 || year > 2019){
          year = "";
        }
    }
    catch(error) {
      day = "";
      month = "";
      year = "";
    }
    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode))
    {
    }else{
      zipcode = "";
    }
    if(
      firstname != "" &&
      lastname != "" &&
      email != "" &&
      username != "" &&
      password != "" &&
      day != "" &&
      month != "" &&
      year != "" &&
      gender != "" &&
      insurance != "" &&
      zipcode != ""){
      var users = db.ref('/nopioid-mobile-app').child("users");
      users.once('value', function(snapshot) {
       if (snapshot.hasChild(username)) {
         alert("This user already exists.");
       }
       else{
           users.child(username).set({
             firstname: firstname,
             lastname: lastname,
             email: email,
             username: username,
             password: password,
             day: day,
             month: month,
             year: year,
             gender: gender,
             insurance: insurance,
             zipcode: zipcode
           }).then(function(snapshot) {
               if(origin.state.type){
                 reset([NavigationActions.navigate({ routeName: 'MainRecommenderScreen', params: {user: username, type: origin.state.type} })], 0);
               }else{
                 reset([NavigationActions.navigate({ routeName: 'MainScreen', params: {user: username} })], 0);
               }
           }, function(error) {
             alert('Error submitting form: ' + error);
           });
       }
     });
    }
    else{
      alert("Kindly enter a valid information.");
    }
  }
}

const styles = StyleSheet.create({
  genderDropdown:{
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
    padding: 7,
    fontSize: 25,
  },
  genderDropdownContainer:{
    padding: 5,
    maxWidth: 500,
    marginTop: 15,
    marginBottom: 10,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
  },
  scrollView:{
    width: "100%",
  },
  scrollViewContainer:{
  },
  dateOfBirth:{
    flexDirection: "row",
      maxWidth: 500,
      marginTop: 7,
      alignSelf: "center",
      width: "100%",
  },
  dateOfBirthloginTextBox:{
    backgroundColor: "#fff",
    fontSize: 25,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    padding: 15,
    alignSelf: "center",
    flex: 1
  },
  loginButton:{
    maxWidth: 220,
    backgroundColor: "#000",
    marginTop: 10,
    fontSize: 23,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#cb2877',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    color: "#ddd",
    overflow:"hidden",
    alignSelf: "center",
    width: "100%"
  },
  loginTextBox:{
    maxWidth: 500,
    marginTop: 7,
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
    alignItems: "center",
  },
  imageBackground:{
    flex: 1,
    width: '100%',
    height: '100%'
  },
  mainTitle: {
    fontSize: 35,
    textAlign: 'center',
    textAlignVertical: "center",
    alignSelf: "center",
    fontWeight: "700",
    color: "#fff",
    marginBottom: 30
  },
});
