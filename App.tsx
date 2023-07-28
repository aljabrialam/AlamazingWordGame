import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import LeaderBoardScreen from './screens/LeaderBoardScreen';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import WinScreen from './screens/WinScreen';

const WordGame = createStackNavigator({
  HomeRoute: {screen: HomeScreen},
  LeaderBoardRoute: {screen: LeaderBoardScreen},
  GameRoute: {screen: GameScreen},
  WinRoute: {screen: WinScreen},
});

const Container = createAppContainer(WordGame);

export default class App extends React.Component {
  render() {
    return <Container />;
  }
}
