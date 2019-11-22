import React, { Component } from 'react';
import { ScrollView, Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';

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
    this.getRecommendations = this.getRecommendations.bind(this);
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
              <Text style={styles.cardTitle}>We found these places for you</Text>
            </View>
            {this.state.itemList}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }

  getRecommendations(){
    itemList = [];
    origin = this;
    var recommendations = db.ref('/nopioid-mobile-app/experiences');
    recommendations.once('value', function(snapshot) {
      var json = JSON.parse(JSON.stringify(snapshot.val()));
      for(x in json){
        itemList.push(
          <View key={x} style={styles.card}>
            <Text style={styles.cardTitle}>{json[x].name}</Text>
            <View style={styles.cardContentColumn}>
              <Text style={styles.cardDetail}>Buprenorphine Treatment Available: {json[x].buprenorphineTreatment + ""}</Text>
              <Text style={styles.cardDetail}>Drug Screening Requested: {json[x].drugScreening + ""}</Text>
              <Text style={styles.cardDetail}>Housing Service: {json[x].housingService + ""}</Text>
            </View>
          </View>
        );
      }
      origin.setState({itemList: itemList});
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
  cardDetail:{
    padding: 7,
    fontSize: 20,
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
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    maxWidth: 750,
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
  cardContentButton:{
    margin: 5,
    // backgroundColor: "#00ff00",
    width: 100
  }
});

export default withNavigationFocus(Recommendation);
