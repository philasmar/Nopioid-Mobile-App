import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Main from "./Main";
import Login from "./Login";
import History from "./History";
import CreateAccount from "./CreateAccount";
import PastExperience from "./PastExperience";

const AppNavigator = createStackNavigator({
    LoginScreen: {
      screen: Login
    },
    MainScreen: {
      screen: Main
    },
    HistoryScreen: {
      screen: History
    },
    CreateAccountScreen: {
      screen: CreateAccount
    },
    PastExperienceScreen: {
      screen: PastExperience
    },
  }, {
  initialRouteName: 'PastExperienceScreen',
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);
