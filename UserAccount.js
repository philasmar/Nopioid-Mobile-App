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

export default class UserAccount extends Component {
  constructor(props) {
        super(props);
      this.createAccountButtonClick = this.createAccountButtonClick.bind(this);
      this.state = {
        user: "",
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
        zipcode : ""
      };
      this.userObject = null;
      this.error = false;
      this.canRender = false;
    }

  async componentDidMount(prevProps) {
    origin = this;
    if ("params" in this.props.navigation.state){
      if ("user" in this.props.navigation.state.params){
        userr = this.props.navigation.state.params.user;
        // alert(user);
        if (userr != this.state.user){
          this.setState({user: userr});
          if (!(this.userObject)){
            const user = await db.ref('/nopioid-mobile-app/users').child(userr).once('value').then(function(snapshot) {
                var json = JSON.parse(JSON.stringify(snapshot.val()));
                origin.userObject = json;
                origin.canRender = true;
              }).catch(function (err) {
                origin.userObject = null;
            });
            this.setState({
              firstname :origin.userObject.firstname,
              lastname : origin.userObject.lastname,
              email : origin.userObject.email,
              username : origin.userObject.username,
              password : origin.userObject.password,
              day : origin.userObject.day,
              month : origin.userObject.month,
              year : origin.userObject.year,
              gender : origin.userObject.gender,
              insurance : origin.userObject.insurance,
              zipcode : origin.userObject.zipcode
            });
          }
        }
      }
    }
  }

  render() {
    try {
        if (this.error){
          throw 0;
        }
        if (this.canRender){
        return (
          <ImageBackground
            source={require('./images/nopioid-banner.png')}
            style={styles.imageBackground}>
            <AppActionBar state={this.state}/>
            <View style={styles.mainContainer}>
              <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                <View style={styles.userBubbleContainer}>
                  <Text style={styles.userBubble}>{origin.state.firstname.charAt(0).toUpperCase() + origin.state.lastname.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={styles.card}>
                  <TextInput value={origin.state.firstname} ref={input => { this.firstnameTextInput = input }} placeholder="First Name" style={styles.loginTextBox} onChangeText = {(text) => this.setState({firstname : text})}/>
                  <TextInput value={origin.state.lastname} ref={input => { this.lastnameTextInput = input }} placeholder="Last Name" style={styles.loginTextBox} onChangeText = {(text) => this.setState({lastname : text})}/>
                  <TextInput value={origin.state.email} ref={input => { this.emailTextInput = input }} placeholder="Email" style={styles.loginTextBox} onChangeText = {(text) => this.setState({email : text})}/>

                  <TextInput ref={input => { this.passwordTextInput = input }} secureTextEntry={true} placeholder="Password" style={styles.loginTextBox} onChangeText = {(text) => this.setState({password : text})}/>
                  <View style={styles.dateOfBirth}>
                    <TextInput value={origin.state.month.toString()} keyboardType = 'numeric' ref={input => { this.dateofbirthMonthTextInput = input }} placeholder="Month" style={[styles.dateOfBirthloginTextBox, {marginLeft: 5, marginRight: 5}]} onChangeText = {(text) => this.setState({month : text})}/>
                    <TextInput value={origin.state.day.toString()} keyboardType = 'numeric' ref={input => { this.dateofbirthDayTextInput = input }} placeholder="Day" style={styles.dateOfBirthloginTextBox} onChangeText = {(text) => this.setState({day : text})}/>
                    <TextInput value={origin.state.year.toString()} keyboardType = 'numeric' ref={input => { this.dateofbirthYearTextInput = input }} placeholder="Year" style={styles.dateOfBirthloginTextBox} onChangeText = {(text) => this.setState({year : text})}/>
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
                  <TextInput value={origin.state.insurance} ref={input => { this.insuranceTextInput = input }} placeholder="Insurance" style={styles.loginTextBox} onChangeText = {(text) => this.setState({insurance : text})}/>
                  <TextInput value={origin.state.zipcode} keyboardType = 'numeric' ref={input => { this.zipcodeTextInput = input }} placeholder="Zip Code" style={styles.loginTextBox} onChangeText = {(text) => this.setState({zipcode : text})}/>
                  <Text onPress={this.createAccountButtonClick} style={styles.loginButton}>Save</Text>
                </View>
                <View style={styles.scrollViewPadding}/>
              </ScrollView>
            </View>
          </ImageBackground>
        );
      }else{
        return (
        <ImageBackground
          source={require('./images/nopioid-banner.png')}
          style={styles.imageBackground}>
          <View style={styles.mainContainer}>
            <Text style={styles.mainTitle}>Loading...</Text>
          </View>
        </ImageBackground>
      );
      }
    }
    catch(error) {
      return (
        <ImageBackground
          source={require('./images/nopioid-banner.png')}
          style={styles.imageBackground}>
          <View style={styles.mainContainer}>
            <Text style={styles.mainTitle}>Something went wrong:/</Text>
          </View>
        </ImageBackground>
      );
    }

  }

  createAccountButtonClick(){
    origin = this;

    const { goBack } = this.props.navigation;
    var firstname = this.state.firstname;
    var lastname = this.state.lastname;
    var email = this.state.email.toLowerCase();
    var username = this.userObject.username;
    var password = this.state.password;
    if(password == ""){
      password = this.userObject.password;
    }
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
            // origin.clearUserNamePassword();
            goBack();
            // reset([NavigationActions.navigate({ routeName: 'MainRecommenderScreen', params: {user: username, type: origin.type} })], 0);
            // replace("MainScreen", {user: username}); // some success method
        }, function(error) {
          alert('Error submitting form: ' + error);
        });
     });
    }
    else{
      alert("Kindly enter a valid information.");
    }
  }
}

const styles = StyleSheet.create({
  scrollViewPadding:{
    marginBottom: 20
  },
  userBubbleContainer:{
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
  userBubble:{
    backgroundColor: "#eee",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 50,
    overflow: "hidden"
  },
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
    height: "100%",
    padding: 30,
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
    marginBottom: 30,
    flex: 1
  },
  actionButtons:{
    fontFamily: "Font Awesome",
    fontSize: 35,
    textAlign: 'center',
    textAlignVertical: "center",
    padding: 5,
    width: 60,
    color: "#fff"
  },
  actionBar: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%"
  },
  mainTitle: {
    fontSize: 32,
    textAlign: 'center',
    textAlignVertical: "center",
    alignSelf: "center",
    fontWeight: "500",
    color: "#fff"
  },
  card:{
    maxWidth: 500,
    marginTop: 30,
    marginBottom: 5,
    padding: 15,
    paddingTop: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    width: "100%"
  },
});
