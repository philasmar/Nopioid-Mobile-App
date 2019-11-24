import React, { Component } from 'react';
import { Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import  IconButton  from './IconButton';
import { NavigationActions, withNavigationFocus } from 'react-navigation';
import AppActionBar from './AppActionBar'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.emergencyRoomButtonClick = this.emergencyRoomButtonClick.bind(this);
    this.requireLogin = this.requireLogin.bind(this);
    this.detoxButtonClick = this.detoxButtonClick.bind(this);
    this.inRehabButtonClick = this.inRehabButtonClick.bind(this);
    this.outRehabButtonClick = this.outRehabButtonClick.bind(this);
    this.soberHouseButtonClick = this.soberHouseButtonClick.bind(this);
    this.supportGroupButtonClick = this.supportGroupButtonClick.bind(this);
    this.mainRecommenderScreen = this.mainRecommenderScreen.bind(this);
    this.state = { user: ""};
  }
  componentDidMount(prevProps) {
    if ("params" in this.props.navigation.state){
      if ("user" in this.props.navigation.state.params){
        user = this.props.navigation.state.params.user;
        if (user != this.state.user){
          this.setState({user: user});
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
          <View style={styles.card}>
            <Text style={styles.cardTitle}>What are you looking for?</Text>
            <View style={styles.cardContent}>
                <View style={styles.cardRow}>
                  <IconButton
                    style={styles.cardContentButton}
                    iconStyle=""
                    textStyle=""
                    icon="&#xf2cc;"
                    text="Detox"
                    onPress={()=>this.detoxButtonClick()}/>
                  <IconButton
                    style={styles.cardContentButton}
                    iconStyle=""
                    textStyle=""
                    icon="&#xf015;"
                    text="Sober House"
                    onPress={()=>this.soberHouseButtonClick()}/>
                </View>
                <View style={styles.cardRow}>
                  <IconButton
                    style={styles.cardContentButton}
                    iconStyle=""
                    textStyle=""
                    icon="&#xf7f2;"
                    text="Inpatient Rehab"
                    onPress={()=>this.inRehabButtonClick()}/>
                  <IconButton
                    style={styles.cardContentButton}
                    iconStyle=""
                    textStyle=""
                    icon="&#xf0f1;"
                    text="Outpatient Rehab"
                    onPress={()=>this.outRehabButtonClick()}/>
                </View>
                <View style={styles.cardRow}>
                  <IconButton
                    style={styles.cardContentButton}
                    iconStyle={styles.cardContentIcon}
                    textStyle=""
                    icon="&#xf002;"
                    text="Withdrawl Guide"
                    onPress={()=>this.emergencyRoomButtonClick()}/>
                  <IconButton
                    style={styles.cardContentButton}
                    iconStyle={styles.cardContentIcon}
                    textStyle=""
                    icon="&#xf4c4;"
                    text="Support Group"
                    onPress={()=>this.supportGroupButtonClick()}/>
                </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }

  requireLogin(type){
    const { push } = this.props.navigation;
    if(this.state.user == ""){
      push('LoginScreen', {type: type});
      // reset([NavigationActions.navigate({ routeName: 'LoginScreen', params:{type: type} })], 0);
      return true;
    }else{
      return false;
    }
  }

  mainRecommenderScreen(type){
    const { reset } = this.props.navigation;
    reset([NavigationActions.navigate({ routeName: 'MainRecommenderScreen', params:{user: this.state.user, type: type} })], 0);
  }

  emergencyRoomButtonClick(){
    origin = this;
    type = "Emergency Room"
    result = this.requireLogin(type);
    if(result){
      const didBlurSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
          if(origin.state.user == ""){

          }else{
            origin.mainRecommenderScreen(type);
          }
          didBlurSubscription.remove();
        }
      );
    }else{
      origin.mainRecommenderScreen(type);
    }
  }

  detoxButtonClick(){
    origin = this;
    type = "Detox";
    result = this.requireLogin(type);
    if(result){
      const didBlurSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
          if(origin.state.user == ""){

          }else{
            origin.mainRecommenderScreen(type);
          }
          didBlurSubscription.remove();
        }
      );
    }else{
      origin.mainRecommenderScreen(type);
    }
  }
  inRehabButtonClick(){
    // alert("hi");
    origin = this;
    type = "Inpatient Rehab";
    result = this.requireLogin(type);
    if(result){
      const didBlurSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
          if(origin.state.user == ""){

          }else{
            origin.mainRecommenderScreen(type);
          }
          didBlurSubscription.remove();
        }
      );
    }else{
      origin.mainRecommenderScreen(type);
    }
  }
  outRehabButtonClick(){
    // alert("hi");
    origin = this;
    type = "Outpatient Rehab";
    result = this.requireLogin(type);
    if(result){
      const didBlurSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
          if(origin.state.user == ""){

          }else{
            origin.mainRecommenderScreen(type);
          }
          didBlurSubscription.remove();
        }
      );
    }else{
      origin.mainRecommenderScreen(type);
    }
  }
  soberHouseButtonClick(){
    // alert("hi");
    origin = this;
    type = "Sober House";
    result = this.requireLogin(type);
    if(result){
      const didBlurSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
          if(origin.state.user == ""){

          }else{
            origin.mainRecommenderScreen(type);
          }
          didBlurSubscription.remove();
        }
      );
    }else{
      origin.mainRecommenderScreen(type);
    }
  }
  supportGroupButtonClick(){
    // alert("hi");
    origin = this;
    type = "Support Group";
    result = this.requireLogin(type);
    if(result){
      const didBlurSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
          if(origin.state.user == ""){

          }else{
            origin.mainRecommenderScreen(type);
          }
          didBlurSubscription.remove();
        }
      );
    }else{
      origin.mainRecommenderScreen(type);
    }
  }

}

const styles = StyleSheet.create({
  cardRow:{
    flexDirection: "row",
    justifyContent: "center",
    flex: 1
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
    paddingBottom: 30,
    // backgroundColor: "#00ff00"
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
    marginBottom: 30
  },
  mainTitle: {
    fontSize: 32,
    textAlign: 'center',
    textAlignVertical: "center",
    alignSelf: "center",
    fontWeight: "500",
    color: "#fff"
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
    // backgroundColor: "#fff",
    // borderRadius: 20,
    // borderWidth: 0.5,
    // borderColor: '#d1d1d1',
    flex: 1
  },
  cardTitle:{
    textAlign: 'center',
    textAlignVertical: "center",
    fontSize: 25,
    padding: 10,
    color: "#fff",
    fontWeight: "500"
  },
  cardContent:{
    justifyContent: "center",
    flex: 1
  },
  cardContentButton:{
    flex: 1,
    margin: 5,
    // backgroundColor: "#00ff00",
    width: 100,
    fontSize: 40
  },
  cardContentIcon:{
    // fontSize: 40
  }
});
