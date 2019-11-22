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
  }, {
  initialRouteName: 'LoginScreen',
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);
