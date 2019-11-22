import React, { Component } from 'react';
import { Image, ScrollView, Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';

import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { parseIconFromClassName } from 'react-native-fontawesome';
import * as Font from 'expo-font';
import  IconButton  from './IconButton';
import { withNavigationFocus } from 'react-navigation';
import firebase from './FirebaseDatabase';

export const db = firebase.database();
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
const validIcon = parseIconFromClassName('fas fa-plus')

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.user = "";
    this.type = "";
    this.getRecommendations = this.getRecommendations.bind(this);
    // this.getZipCodes = this.getZipCodes.bind(this);
    this.state = {itemList : []};
  }
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    this.getRecommendations();
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
        this.type = this.props.navigation.state.params.type;
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
            <Text style={[styles.cardTitle, {fontSize: 25}]}>We found these places for you</Text>
            <Text style={styles.cardTitle}></Text>
            {this.state.itemList}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }

  // const loadUsers = async () =>
  //   await fetch("https://jsonplaceholder.typicode.com/users")
  //     .then(res => (res.ok ? res : Promise.reject(res)))
  //     .then(res => res.json())
  //
  // function getZipCodes(zipCode, distance){
  //   fetch('https://www.zipcodeapi.com/rest/gZA5DC6sorrMU4qOSdSCXqjuB2ixwXPl6ERebFAVHMbf3Vy9KetjLrYnr6qo6qY6/radius.json/' + zipCode + '/' + distance + '/km', {
  //        method: 'GET'
  //     })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //        return responseJson;
  //     })
  //     .catch((error) => {
  //        return error;
  //     });
  // }
  // function getStudentsAndScores(){
  //   return Promise.all([getZipCodes("10044", "5")])
  // }
  async getRecommendations(){
    origin = this;

   userzip = "";
   insurance = ""
    const zipp = await db.ref('/nopioid-mobile-app').child("users").once('value').then(function(snapshot) {
        var json = JSON.parse(JSON.stringify(snapshot.val()));
        // alert(json);
        // userzip = json[username];
        userzip = json[origin.user].zipcode;
        insurance = json[origin.user].insurance;
        // alert(userzip);
      }).catch(function (err) {
      // This is where errors land
      // alert(err);
    });

    const json = await fetch('https://www.zipcodeapi.com/rest/gZA5DC6sorrMU4qOSdSCXqjuB2ixwXPl6ERebFAVHMbf3Vy9KetjLrYnr6qo6qY6/radius.json/' + userzip + '/' + "5" + '/mile', {
             method: 'GET'
          })
          .then((response) => response.json());
    zipCodes = [];
    var zipDistance = {};
    for (x in json.zip_codes){
      zipCodes.push(json.zip_codes[x].zip_code);
      zipDistance[json.zip_codes[x].zip_code] = json.zip_codes[x].distance;
    }

    itemList = [];
    existingPlaces = [];
    origin = this;
    var recommendations = db.ref('/nopioid-mobile-app/experiences');
    recommendations.orderByChild('rating').once('value', function(snapshot) {
      var json = JSON.parse(JSON.stringify(snapshot.val()));
      for(x in json){
        if (!(existingPlaces.includes(json[x].name)))
        {
          existingPlaces.push(json[x].name);
          if(zipCodes.includes(json[x].zipcode) && origin.type == json[x].type && insurance == json[x].insurance && origin.user != json[x].user){
            itemList.push(
              <View key={x} style={styles.card}>
                <View style={styles.cardMenuBar}>
                  <Text style={styles.cardTitle}>{json[x].name}</Text>
                  <Text style={styles.cardTitle}>{zipDistance[json[x].zipcode]}mi</Text>
                </View>
                <View style={styles.cardContentColumn}>
                  <Text style={styles.cardDetail}>Buprenorphine Treatment {json[x].buprenorphineTreatment? "Available": "Not Available"}</Text>
                  <Text style={styles.cardDetail}>Drug Screening {json[x].drugScreening? "Requested": "Not Requested"}</Text>
                  <Text style={styles.cardDetail}>Housing Service {json[x].housingService? "Available": "Not Available"}</Text>
                  <Text style={styles.cardDetail}>Methadone Treatment {json[x].methadoneTreatment? "Available": "Not Available"}</Text>
                </View>
              </View>
            );
          }
        }
      }

      origin.setState({itemList: itemList.reverse()});
    });

  }
  requireLogin(){
    this.block = true;
    const { navigate } = this.props.navigation;
    if(this.user == ""){
      navigate("LoginScreen");
      return true;
    }else{
      return false;
    }
  }

  emergencyRoomAction(){
    alert("Feature Coming Soon!");
  }

  emergencyRoomButtonClick(){
    origin = this;
    result = this.requireLogin();
    if(result){
      const didBlurSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
          if(origin.user == ""){

          }else{
            this.emergencyRoomAction();
          }
          didBlurSubscription.remove();
        }
      );
    }else{
      this.emergencyRoomAction();
    }
  }

  detoxButtonClick(){
    // alert("hi");
  }

}

const styles = StyleSheet.create({

  scrollView:{
    marginTop: 10,
    width: "100%",
    padding: 20,
    paddingBottom: 0,
    paddingTop: 0
  },
  scrollViewContainer:{
    alignItems: "center"
  },
  cardDetail:{
    padding: 7,
    fontSize: 20,
    color: "#fff"
  },
  welcomeTitle:{
    textAlignVertical: "center",
    fontSize: 30,
    padding: 10,
    paddingBottom: 0,
    color: "#fff",
    marginTop: 10
  },
  mainContainer:{
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 10,
    paddingTop: 43,
    paddingBottom: 30,
    alignItems: "center"
  },
  imageBackground:{
    flex: 1,
    width: '100%',
    height: '100%'
  },
  actionBar: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
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
    marginTop: 5,
    marginBottom: 5,
    padding: 15,
    paddingTop: 5,
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    width: "100%"
  },
  cardTitle:{
    textAlign: 'center',
    textAlignVertical: "center",
    fontSize: 20,
    padding: 10,
    paddingBottom: 0,
    color: "#fff",
    fontWeight: "400"
  },
  cardContentColumn:{
    marginTop: 30,
    color: "#fff"
  },
  cardContentButton:{
    margin: 5,
    // backgroundColor: "#00ff00",
    width: 100
  }
});

export default withNavigationFocus(Recommendation);
