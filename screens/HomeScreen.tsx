import React from 'react';

import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles';

interface IProps {
  navigation: any;
}

export default class HomeScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: '',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
  };
  render() {
    const {navigate} = this.props.navigation;
    let title = ['A', 'L', 'A', 'M', 'A', 'Z', 'I', 'N', 'G'];
    let title2 = ['W', 'O', 'R', 'D', 'G', 'A', 'M', 'E'];
    return (
      <View style={styles.homeContainer}>
        <View style={styles.gameTitleView}>
          {title.map((titleItem, index) => {
            return (
              <View key={index} style={styles.gameTitleSquare}>
                <Text key={index} style={styles.gameTitle}>
                  {titleItem}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.gameTitleView}>
          {title2.map((titleItem, index) => {
            return (
              <View key={index} style={styles.gameTitleSquare}>
                <Text key={index} style={styles.gameTitle}>
                  {titleItem}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.startButtonContainer}>
          <TouchableOpacity
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            style={styles.gameTitleView}
            onPress={() => navigate('LeaderBoardRoute')}>
            <Text style={{marginTop: 8, fontSize: 20}}>TAP TO PLAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
