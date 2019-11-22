import React, { Component } from 'react';
import { Button, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';

import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { parseIconFromClassName } from 'react-native-fontawesome';
import * as Font from 'expo-font';
import  IconButton  from './IconButton';
import { withNavigationFocus } from 'react-navigation';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
const validIcon = parseIconFromClassName('fas fa-plus')

class MainRecommender extends Component {
  constructor(props) {
    super(props);
    this.user = "";
    this.emergencyRoomButtonClick = this.emergencyRoomButtonClick.bind(this);
    this.detoxButtonClick = this.detoxButtonClick.bind(this);
    this.inpatientButtonClick = this.inpatientButtonClick.bind(this);
    this.outpatientButtonClick = this.outpatientButtonClick.bind(this);
    this.soberhouseButtonClick = this.soberhouseButtonClick.bind(this);
    this.supportgroupButtonClick = this.supportgroupButtonClick.bind(this);
    this.loginButtonClick = this.loginButtonClick.bind(this);

    this.state = {
      emergencyButtonClicked : false,
      detoxButtonClicked: false,
      inpatientrehabButtonClicked: false,
      outpatientrehabButtonClicked: false,
      soberhouseButtonClicked: false,
      supportgroupButtonClicked: false};
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
          {
            this.user != "" ? (
              <Text style={styles.welcomeTitle}>Hey, {this.user}!</Text>
            ): <Text style={styles.welcomeTitle}></Text>
          }
          <View style={styles.card}>
            <Text style={styles.cardTitle}>What are you looking for?</Text>
            <View style={styles.cardContent}>
              {
                this.state.emergencyButtonClicked ?
                <IconButton
                  ref={
                    (comp)=>this.emergencyRoomButton = comp
                  }
                  style={styles.cardContentButtonClicked}
                  iconStyle=""
                  textStyle=""
                  icon="&#xf0f8;"
                  text="Emergency Room"
                  onPress={(comp)=>this.emergencyRoomButtonClick(comp)}/>
                :

                <IconButton
                  ref={
                    (comp)=>this.emergencyRoomButton = comp
                  }
                  style={styles.cardContentButton}
                  iconStyle=""
                  textStyle=""
                  icon="&#xf0f8;"
                  text="Emergency Room"
                  onPress={(comp)=>this.emergencyRoomButtonClick(comp)}/>
              }
              {
                this.state.detoxButtonClicked ?
                <IconButton
                  ref={
                    (comp)=>this.detoxButton = comp
                  }
                  style={styles.cardContentButtonClicked}
                  iconStyle=""
                  textStyle=""
                  icon="&#xf2cc;"
                  text="Detox"
                  onPress={(comp)=>this.detoxButtonClick(comp)}/>
                :

                <IconButton
                  ref={
                    (comp)=>this.detoxButton = comp
                  }
                  style={styles.cardContentButton}
                  iconStyle=""
                  textStyle=""
                  icon="&#xf2cc;"
                  text="Detox"
                  onPress={(comp)=>this.detoxButtonClick(comp)}/>
              }
              {
                this.state.inpatientrehabButtonClicked ?
                <IconButton
                  ref={
                    (comp)=>this.inpatientrehabButton = comp
                  }
                  style={styles.cardContentButtonClicked}
                  iconStyle=""
                  textStyle=""
                  icon="&#xf594;"
                  text="Inpatient Rehab"
                  onPress={(comp)=>this.inpatientButtonClick(comp)}/>
                :

                <IconButton
                  ref={
                    (comp)=>this.inpatientrehabButton = comp
                  }
                  style={styles.cardContentButton}
                  iconStyle=""
                  textStyle=""
                  icon="&#xf594;"
                  text="Inpatient Rehab"
                  onPress={(comp)=>this.inpatientButtonClick(comp)}/>
              }
              {
                this.state.outpatientrehabButtonClicked ?
                <IconButton
                  ref={
                    (comp)=>this.outpatientrehabButton = comp
                  }
                  style={styles.cardContentButtonClicked}
                  iconStyle=""
                  textStyle=""
                  icon="&#xf0fe;"
                  text="Outpatient Rehab"
                  onPress={(comp)=>this.outpatientButtonClick(comp)}/>
                :

                <IconButton
                  ref={
                    (comp)=>this.outpatientrehabButton = comp
                  }
                  style={styles.cardContentButton}
                  iconStyle=""
                  textStyle=""
                  icon="&#xf0fe;"
                  text="Outpatient Rehab"
                  onPress={(comp)=>this.outpatientButtonClick(comp)}/>
              }
              {
                this.state.soberhouseButtonClicked ?
                <IconButton
                  ref={
                    (comp)=>this.soberhouseButton = comp
                  }
                  style={styles.cardContentButtonClicked}
                  iconStyle=""
                  textStyle=""
                  icon="&#xf015;"
                  text="Sober House"
                  onPress={(comp)=>this.soberhouseButtonClick(comp)}/>
                :

                <IconButton
                  ref={
                    (comp)=>this.soberhouseButton = comp
                  }
                  style={styles.cardContentButton}
                  iconStyle=""
                  textStyle=""
                  icon="&#xf015;"
                  text="Sober House"
                  onPress={(comp)=>this.soberhouseButtonClick(comp)}/>
              }
              {
                this.state.supportgroupButtonClicked ?
                <IconButton
                  ref={
                    (comp)=>this.supportgroupButton = comp
                  }
                  style={styles.cardContentButtonClicked}
                  iconStyle=""
                  textStyle=""
                  icon="&#xf4c4;"
                  text="Support Group"
                  onPress={(comp)=>this.supportgroupButtonClick(comp)}/>
                :

                <IconButton
                  ref={
                    (comp)=>this.supportgroupButton = comp
                  }
                  style={styles.cardContentButton}
                  iconStyle=""
                  textStyle=""
                  icon="&#xf4c4;"
                  text="Support Group"
                  onPress={(comp)=>this.supportgroupButtonClick(comp)}/>
              }
            </View>
          </View>
          <Text onPress={this.loginButtonClick} style={styles.loginButton}>Next</Text>
        </View>
      </ImageBackground>
    );
  }

  emergencyRoomButtonClick(){
    if (!this.state.emergencyButtonClicked) {
      this.setState({emergencyButtonClicked : true});
    }
    else if (this.state.emergencyButtonClicked) {
      this.setState({emergencyButtonClicked : false});
    }
    // this.emergencyRoomButton.props.style = styles.cardContentButtonClicked;
  }

  detoxButtonClick(){
    if (!this.state.detoxButtonClicked){
      this.setState({detoxButtonClicked : true})
    }
    else if (this.state.detoxButtonClicked) {
      this.setState({detoxButtonClicked : false})
    }
    // this.emergencyRoomButton.props.style = styles.cardContentButtonClicked;
  }

  inpatientButtonClick(){
    if (!this.state.inpatientrehabButtonClicked){
      this.setState({inpatientrehabButtonClicked : true});
    }
    else if (this.state.inpatientrehabButtonClicked) {
      this.setState({inpatientrehabButtonClicked : false})
    }
    // this.emergencyRoomButton.props.style = styles.cardContentButtonClicked;
  }

  outpatientButtonClick(){
    if (!this.state.outpatientrehabButtonClicked){
      this.setState({outpatientrehabButtonClicked : true});
    }
    else if (this.state.outpatientrehabButtonClicked) {
      this.setState({outpatientrehabButtonClicked : false})
    }
    // this.emergencyRoomButton.props.style = styles.cardContentButtonClicked;
  }

  soberhouseButtonClick(){
    if (!this.state.soberhouseButtonClicked){
      this.setState({soberhouseButtonClicked : true});
    }
    else if (this.state.soberhouseButtonClicked) {
      this.setState({soberhouseButtonClicked : false})
    }
    // this.emergencyRoomButton.props.style = styles.cardContentButtonClicked;
  }

  supportgroupButtonClick(){
    if (!this.state.supportgroupButtonClicked){
      this.setState({supportgroupButtonClicked : true});
    }
    else if (this.state.supportgroupButtonClicked) {
      this.setState({supportgroupButtonClicked : false})
    }
    // this.emergencyRoomButton.props.style = styles.cardContentButtonClicked;
  }

  loginButtonClick(){
    origin = this;
    const { push } = this.props.navigation;
    stages = [];
    if(this.state.emergencyButtonClicked){
      stages.push("Emergency Room");
    }
    if(this.state.detoxButtonClicked){
      stages.push("Detox");
    }
    if(this.state.inpatientrehabButtonClicked){
      stages.push("Inpatient Rehab");
    }
    if(this.state.outpatientrehabButtonClicked){
      stages.push("Outpatient Rehab");
    }
    if(this.state.soberhouseButtonClicked){
      stages.push("Sober House");
    }
    if(this.state.supportgroupButtonClicked){
      stages.push("Support Group");
    }
    if(stages.length > 0){
      push("PastExperienceScreen", {stages: stages});
    }
    else{
      alert("Recommendation screen coming soon!")
    }
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
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
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
    width: 100
  },
  cardContentButtonClicked:{
    margin: 5,
    backgroundColor: "#d6d6d0",
    borderWidth: 1,
    borderColor: "#d6d6d0",
    borderRadius: 10,
    width: 100
  }
});

export default withNavigationFocus(MainRecommender);
