import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Main from "./Main";
import Login from "./Login";
import History from "./History";
import CreateAccount from "./CreateAccount";
import PastExperience from "./PastExperience";
import MainRecommender from "./MainRecommender";
import Recommendation from "./Recommendation";
import UserAccount from "./UserAccount";
import AppActionBar from "./AppActionBar";

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
    MainRecommenderScreen: {
      screen: MainRecommender
    },
    RecommendationScreen: {
      screen: Recommendation
    },
    UserAccountScreen: {
      screen: UserAccount
    },
    AppActionBarScreen: {
      screen: AppActionBar
    },
  }, {
  initialRouteName: 'MainScreen',
  headerMode: 'none',
  defaultNavigationOptions: {
    swipeEnabled: false
  }
});

export default createAppContainer(AppNavigator);
