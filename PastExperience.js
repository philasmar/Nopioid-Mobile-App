import React, { Component } from 'react';
import { ScrollView, Picker, TextInput, Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { parseIconFromClassName } from 'react-native-fontawesome';
import * as Font from 'expo-font';
import  IconButton  from './IconButton';
import { withNavigationFocus } from 'react-navigation';
import { stages } from './Properties';
import firebase from './FirebaseDatabase';

export const db = firebase.database();
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
const validIcon = parseIconFromClassName('fas fa-plus')

class PastExperience extends Component {
  constructor(props) {
    super(props);
    this.stages = [];
    this.user = "";
    this.type = "";
    this.nextClick = this.nextClick.bind(this);
    this.state = {
      name :"",
      zipcode : "",
      coveredByInsurance : false,
      drugScreening : false,
      housingService : false,
      transportationAssistance : false,
      methadoneTreatment : false,
      buprenorphineTreatment : false,
      rating : ""
    };
    this.insurance = "";
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
    try {
        this.user = this.props.navigation.state.params.user;
        origin = this;
        user = this.props.navigation.state.params.user;
        if(this.insurance == ""){
          var users = db.ref('/nopioid-mobile-app').child("users");
          users.once('value', function(snapshot) {
           if (snapshot.hasChild(user)) {
             var json = JSON.parse(JSON.stringify(snapshot.val()));
             origin.insurance = json[user].insurance;
           }
          });
        }
    }
    catch(error) {
    }
    try {
        this.stages = this.props.navigation.state.params.stages;
    }
    catch(error) {
    }
    return (
      <ImageBackground
        source={require('./images/nopioid-banner.png')}
        style={styles.imageBackground}>
        <View style={styles.mainContainer}>
          <View style={styles.actionBar}>
            {
              this.state.fontLoaded ? (
                <Text style={styles.actionButtons}>&#xf7a4;</Text>
              ) : null
            }
            <Text style={styles.mainTitle}>Nopioid</Text>
            {
              this.state.fontLoaded ? (
                <Text style={styles.actionButtons}>&#xf007;</Text>
              ) : null
            }
          </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tell us more about your {this.stages[0]} Experience</Text>
            <View style={styles.cardContentColumn}>
              <TextInput ref={input => { this.nameTextInput = input }} placeholder="Name" style={styles.loginTextBox} onChangeText = {(text) => this.setState({name : text})}/>
              <TextInput keyboardType = 'numeric' ref={input => { this.zipcodeTextInput = input }} placeholder="Zip Code" style={styles.loginTextBox} onChangeText = {(text) => this.setState({zipcode : text})}/>
              <CheckBox
                containerStyle={styles.checkboxStyle}
                textStyle={styles.checkboxTextStyle}
                title='Covered by your insurance?'
                checked={this.state.coveredByInsurance}
                onPress={() => this.setState({ coveredByInsurance: !this.state.coveredByInsurance })}
              />
              <CheckBox
                containerStyle={styles.checkboxStyle}
                textStyle={styles.checkboxTextStyle}
                title='Drug screening required?'
                checked={this.state.drugScreening}
                onPress={() => this.setState({ drugScreening: !this.state.drugScreening })}
              />
              <CheckBox
                containerStyle={styles.checkboxStyle}
                textStyle={styles.checkboxTextStyle}
                title='Housing service?'
                checked={this.state.housingService}
                onPress={() => this.setState({ housingService: !this.state.housingService })}
              />
              <CheckBox
                containerStyle={styles.checkboxStyle}
                textStyle={styles.checkboxTextStyle}
                title='Transportation assistance?'
                checked={this.state.transportationAssistance}
                onPress={() => this.setState({ transportationAssistance: !this.state.transportationAssistance })}
              />
              <CheckBox
                containerStyle={styles.checkboxStyle}
                textStyle={styles.checkboxTextStyle}
                title='Methadone treatment available?'
                checked={this.state.methadoneTreatment}
                onPress={() => this.setState({ methadoneTreatment: !this.state.methadoneTreatment })}
              />
              <CheckBox
                containerStyle={styles.checkboxStyle}
                textStyle={styles.checkboxTextStyle}
                title='Buprenorphine treatment available?'
                checked={this.state.buprenorphineTreatment}
                onPress={() => this.setState({ buprenorphineTreatment: !this.state.buprenorphineTreatment })}
              />
              <Text style={styles.itemTitle}>Helpfulness</Text>
              <View style={styles.ratingDropdownContainer}>
                <Picker
                  selectedValue={this.state.rating}
                  style={styles.ratingDropdown}
                  onValueChange={(itemValue, itemIndex) => this.setState({ rating: itemValue })}>
                  <Picker.Item label="Rating" value="" />
                  <Picker.Item label="Very Dissatisfied" value="0" />
                  <Picker.Item label="Dissatisfied" value="1" />
                  <Picker.Item label="Neutral" value="2" />
                  <Picker.Item label="Satisfied" value="3" />
                  <Picker.Item label="Very Satisfied" value="4" />
                </Picker>
              </View>
            </View>
          </View>
          <Text onPress={this.nextClick} style={styles.loginButton}>Save</Text>
          <Text> </Text>
          <Text> </Text>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }


  nextClick(){
    origin = this;
    if (!origin.user){
      const { replace } = this.props.navigation;
      replace("LoginScreen");
      return;
    }
    const { reset } = this.props.navigation;
    const { replace } = this.props.navigation;
    var name = this.state.name;
    var zipcode = this.state.zipcode;
    var coveredByInsurance = this.state.coveredByInsurance;
    var drugScreening = this.state.drugScreening;
    var housingService = this.state.housingService;
    var transportationAssistance = this.state.transportationAssistance;
    var methadoneTreatment = this.state.methadoneTreatment;
    var buprenorphineTreatment = this.state.buprenorphineTreatment;
    var rating = this.state.rating;


    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode))
    {
    }else{
      zipcode = "";
    }
    if(
      name != "" &&
      zipcode != "" &&
      rating != ""){
      var users = db.ref('/nopioid-mobile-app').child("experiences");
      users.push({
        insurance: origin.insurance,
        user: origin.user,
        type: this.stages[0],
        name: name,
        zipcode: zipcode,
        coveredByInsurance: coveredByInsurance,
        drugScreening: drugScreening,
        housingService: housingService,
        transportationAssistance: transportationAssistance,
        methadoneTreatment: methadoneTreatment,
        buprenorphineTreatment: buprenorphineTreatment,
        rating: rating
      }).then(function(snapshot) {

          if (this.stages.length > 1){
            this.stages.shift();
            replace("PastExperienceScreen", {user: origin.user, stages: this.stages, type: origin.type});
          }
          else{
            replace("RecommendationScreen", {user: origin.user, stages: this.stages, type: origin.type});
          }
      }, function(error) {
        alert('Error submitting form: ' + error);
      });
    }
    else{
      alert("Kindly enter valid information.");
    }
  }
}

const styles = StyleSheet.create({
  checkboxStyle:{
    backgroundColor: "rgba(255,255,255,0)",
    borderWidth: 0,
    margin: 10
  },
  checkboxTextStyle:{
    fontSize: 20,
    fontWeight: "300",
    color: "#fff"
  },
  itemTitle:{
    marginTop: 10,
    padding: 10,
    paddingBottom: 2,
    fontSize: 25,
    textAlign: "center",
    color: "#fff"
  },
  scrollView:{
    marginTop: 30,
    width: "100%",
    padding: 20,
    paddingTop: 0
  },
  scrollViewContainer:{
    alignItems: "center"
  },
  ratingDropdown:{
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
    padding: 7,
    fontSize: 25,
  },
  ratingDropdownContainer:{
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
    maxWidth: 550,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "#fff",
    fontSize: 25,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    padding: 15,
    alignSelf: "center",
    width: "100%"
  },
  welcomeTitle:{
    textAlignVertical: "center",
    fontSize: 30,
    padding: 10,
    paddingBottom: 0,
    color: "#fff",
    marginTop: 10,
    flex: 1
  },
  mainContainer:{
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 43,
    paddingBottom: 10,
    alignItems: "center",
  },
  errorContainer:{
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 10,
    paddingTop: 43,
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground:{
    flex: 1,
    width: '100%',
    height: '100%'
  },
  actionBar: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  mainTitle: {
    fontSize: 32,
    textAlign: 'center',
    textAlignVertical: "center",
    alignSelf: "center",
    fontWeight: "500",
    color: "#fff",
    flex: 1
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
  card:{
    maxWidth: 500,
    marginTop: 5,
    marginBottom: 5,
    padding: 15,
    paddingTop: 5,
    // backgroundColor: "#fff",
    width: "100%"
  },
  cardTitle:{
    textAlign: 'center',
    textAlignVertical: "center",
    fontSize: 27,
    padding: 10,
    fontWeight: "500",
    color: "#fff"
  },
  cardContent:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  cardContentColumn:{
    justifyContent: "center",
  },
  cardContentButton:{
    margin: 5,
    // backgroundColor: "#00ff00",
    width: 100
  }
});

export default withNavigationFocus(PastExperience);
