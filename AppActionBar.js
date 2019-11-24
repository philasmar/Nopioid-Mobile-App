import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationActions, withNavigationFocus } from 'react-navigation';
import * as Font from 'expo-font';

class AppActionBar extends Component {
  constructor(props) {
    super(props);
    this.accountButtonClick = this.accountButtonClick.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.parentState = "";
  }
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'Font Awesome': require('./assets/fonts/fontawesome.ttf'),
    });
    this.parentState = this.props.state;
    if(this.state.fontLoaded == false){
      this.setState({ fontLoaded: true });
    }
  }
  render() {
    return (
      <View>
      <View style={styles.actionBar}>
        {
          this.state.fontLoaded ? (
            <Text onPress={()=>this.menuButtonClick()} style={styles.actionButtons}>&#xf7a4;</Text>
          ) : null
        }
        <Image
          style={styles.mainLogo}
          source={require('./images/nopioid-logo.png')}
        />
        {
          this.state.fontLoaded ? (
            <Text onPress={()=>this.accountButtonClick()} style={styles.actionButtons}>&#xf007;</Text>
          ) : null
        }
      </View>
      <Text>{JSON.stringify(this.parentState)}</Text>
      </View>
    );
  }

  accountButtonClick(){
    const { navigate } = this.props.navigation;
    if (this.parentState.user){
      navigate("UserAccountScreen", {user: this.parentState.user});
    }else{
      navigate("LoginScreen", {type: ""});
    }
  }

  menuButtonClick(){
    const { reset } = this.props.navigation;
    if(this.parentState.user){
      reset([NavigationActions.navigate({ routeName: 'MainScreen', params: {user: this.parentState.user} })], 0);
    }
    else{
      reset([NavigationActions.navigate({ routeName: 'MainScreen', params: {user: ""} })], 0);
    }
  }
}

const styles = StyleSheet.create({
  actionBar: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 33,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    // backgroundColor: "#ff0000"
  },
  mainLogo:{

    width: 138,
    height: 40,
    // backgroundColor: "#ff0000"
  },
  mainTitle: {
    fontSize: 32,
    textAlign: 'center',
    textAlignVertical: "center",
    alignSelf: "center",
    fontWeight: "500",
    color: "#fff"
  },
  actionButtons:{
    fontFamily: "Font Awesome",
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: "center",
    padding: 5,
    width: 60,
    color: "#fff"
  },
});

export default withNavigationFocus(AppActionBar);
