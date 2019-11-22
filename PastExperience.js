import React, { Component } from 'react';
import { ScrollView, Picker, TextInput, Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { parseIconFromClassName } from 'react-native-fontawesome';
import * as Font from 'expo-font';
import  IconButton  from './IconButton';
import { withNavigationFocus } from 'react-navigation';
import { stages } from './Properties'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
const validIcon = parseIconFromClassName('fas fa-plus')

class PastExperience extends Component {
  constructor(props) {
    super(props);
    this.stage = "Detox";
    this.user = "";
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
        this.user = this.props.navigation.state.params.user;
    }
    catch(error) {
    }
    try {
        this.stage = this.props.navigation.state.params.stage;
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
                <Text style={styles.actionButtons}>&#xf0c9;</Text>
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
            <Text style={styles.cardTitle}>We want to personalize your experience!</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tell us more about your {this.stage} experience...</Text>
            <View style={styles.cardContentColumn}>
              <TextInput ref={input => { this.nameTextInput = input }} placeholder="Name" style={styles.loginTextBox} onChangeText = {(text) => this.setState({name : text})}/>
              <TextInput keyboardType = 'numeric' ref={input => { this.zipcodeTextInput = input }} placeholder="Zip Code" style={styles.loginTextBox} onChangeText = {(text) => this.setState({zipcode : text})}/>
              <CheckBox
                title='Covered by your insurance?'
                checked={this.state.coveredByInsurance}
                onPress={() => this.setState({ coveredByInsurance: !this.state.coveredByInsurance })}
              />
              <CheckBox
                title='Drug screening required?'
                checked={this.state.drugScreening}
                onPress={() => this.setState({ drugScreening: !this.state.drugScreening })}
              />
              <CheckBox
                title='Housing service?'
                checked={this.state.housingService}
                onPress={() => this.setState({ housingService: !this.state.housingService })}
              />
              <CheckBox
                title='Transportation assistance?'
                checked={this.state.transportationAssistance}
                onPress={() => this.setState({ transportationAssistance: !this.state.transportationAssistance })}
              />
              <CheckBox
                title='Methadone treatment available?'
                checked={this.state.methadoneTreatment}
                onPress={() => this.setState({ methadoneTreatment: !this.state.methadoneTreatment })}
              />
              <CheckBox
                title='Buprenorphine treatment available?'
                checked={this.state.buprenorphineTreatment}
                onPress={() => this.setState({ buprenorphineTreatment: !this.state.buprenorphineTreatment })}
              />
              <View style={styles.ratingDropdownContainer}>
                <Picker
                  selectedValue={this.state.gender}
                  style={styles.ratingDropdown}
                  onValueChange={(itemValue, itemIndex) => this.setState({ rating: itemValue })}>
                  <Picker.Item label="Rating" value="" />
                  <Picker.Item label="Welcoming" value="1" />
                  <Picker.Item label="Supportive" value="2" />
                  <Picker.Item label="Effective" value="4" />
                  <Picker.Item label="Overall" value="3" />
                </Picker>
              </View>
            </View>
          </View>
          <Text onPress={this.nextClick} style={styles.loginButton}>Next</Text>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }


  nextClick(){
    origin = this;
    if (origin.user == ""){
      const { replace } = this.props.navigation;
      return replace("LoginScreen");
    }
    const { reset } = this.props.navigation;
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
               // origin.clearUserNamePassword();
               reset([NavigationActions.navigate({ routeName: 'MainScreen', params: {user: firstname} })], 0);
               // replace("MainScreen", {user: username}); // some success method
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

  scrollView:{
    marginTop: 40,
    width: "100%",
  },
  scrollViewContainer:{
    alignItems: "center"
  },
  ratingDropdown:{
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
  },
  ratingDropdownContainer:{
    maxWidth: 500,
    marginTop: 10,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
  },
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
  welcomeTitle:{
    textAlignVertical: "center",
    fontSize: 30,
    padding: 10,
    paddingBottom: 0,
    color: "#fff",
    marginTop: 10,
  },
  mainContainer:{
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 10,
    paddingTop: 43,
    paddingBottom: 30,
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
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    width: "100%"
  },
  cardTitle:{
    textAlign: 'center',
    textAlignVertical: "center",
    fontSize: 25,
    padding: 10,
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
