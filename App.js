import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Main from "./Main";
import Login from "./Login";
import History from "./History";
import CreateAccount from "./CreateAccount";

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
  }, {
  initialRouteName: 'MainScreen',
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);
