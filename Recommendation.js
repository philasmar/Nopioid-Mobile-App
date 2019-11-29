import React, { Component } from 'react';
import { Image, ScrollView, Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import firebase from './FirebaseDatabase';
import AppActionBar from './AppActionBar'

export const db = firebase.database();

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.getRecommendations = this.getRecommendations.bind(this);
    this.state = {
      user: "",
      type: "",
      itemList : []
    };
  }

  componentDidMount(prevProps) {
    if ("params" in this.props.navigation.state){
      if ("user" in this.props.navigation.state.params){
        user = this.props.navigation.state.params.user;
        if (user != this.state.user){
          this.setState({user: user});
        }
      }
      if ("type" in this.props.navigation.state.params){
        type = this.props.navigation.state.params.type;
        if (type != this.state.type){
          this.setState({type: type});
        }
      }
    }
    this.getRecommendations();
  }

  render() {
    return (
      <ImageBackground
        source={require('./images/nopioid-banner.png')}
        style={styles.imageBackground}>
        <AppActionBar state={this.state}/>
        <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
            <Text style={[styles.cardTitle, {fontSize: 25}]}>We found these places for you</Text>
            <Text style={styles.cardTitle}></Text>
            {this.state.itemList}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }

  async getRecommendations(){
    origin = this;

   userzip = "";
   insurance = ""
    const zipp = await db.ref('/nopioid-mobile-app').child("users").once('value').then(function(snapshot) {
        var json = JSON.parse(JSON.stringify(snapshot.val()));
        // alert(json);
        // userzip = json[username];
        userzip = json[origin.state.user].zipcode;
        insurance = json[origin.state.user].insurance;
        // alert(userzip);
      }).catch(function (err) {
      // This is where errors land
      // alert(err);
    });

    const json = await fetch('https://www.zipcodeapi.com/rest/nISCSiw4wVBtumHUZ3OgWRvmZog8daVylgWM5LQBWRl746ArCgup4vbS9JaSZMfr/radius.json/' + userzip + '/' + "5" + '/mile', {
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
    lastRecomendations = [];
    origin = this;

    var recommendations = db.ref('/nopioid-mobile-app/experiences');
    recommendations.orderByChild('rating').once('value', function(snapshot) {
      var json = JSON.parse(JSON.stringify(snapshot.val()));
      for(x in json){
        if (!(existingPlaces.includes(json[x].name)))
        {
          existingPlaces.push(json[x].name);
          if(zipCodes.includes(json[x].zipcode) && origin.state.type == json[x].type && insurance == json[x].insurance && origin.state.user != json[x].user){
            lastRecomendations.push(json[x].name);
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
    var users = db.ref('/nopioid-mobile-app/last-recommendations');
    users.child(origin.state.user).set({
      username: origin.state.user,
      type: origin.state.type,
      places: lastRecomendations
    }).then(function(snapshot) {
        for(var x = 0; x < lastRecomendations.length; x++){
          var lastexp = db.ref('/nopioid-mobile-app/last-recommendations/' + origin.state.user);
          lastexp.child("places").push({
            name: lastRecomendations[x]
          });
        }
    }, function(error) {
      alert('Could not save recommendations due to the error: ' + error);
    });
  }

}

const styles = StyleSheet.create({

  scrollView:{
    width: "100%",
  },
  scrollViewContainer:{
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
    padding: 30,
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
