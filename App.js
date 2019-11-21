import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Main from "./Main";
import Login from "./Login";

const AppNavigator = createStackNavigator({
LoginScreen: {
  screen: Login
},
  MainScreen: {
    screen: Main
  },
}, {
    initialRouteName: 'MainScreen',
    headerMode: 'none'
});

export default createAppContainer(AppNavigator);
