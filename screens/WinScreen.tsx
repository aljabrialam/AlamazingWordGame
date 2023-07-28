import React from 'react';

import {Text, Share, View, Alert, TouchableOpacity} from 'react-native';
import styles from '../styles';
interface IProps {
  navigation: any;
}

export default class WinScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: '',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerLeft: () => <View />,
  };

  goBack() {
    const {navigation} = this.props;
    navigation.goBack();
  }

  render() {
    const score = this.props.navigation.getParam('score', '');
    // const score = this.props.navigation.score
    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'Singtel Word Game App - Awesome I earned ' + score + ' points!',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error: any) {
        Alert.alert(error.message);
      }
    };

    return (
      <View style={styles.homeContainer}>
        <Text style={[styles.pageCountText, {marginBottom: 200}]}>1/3</Text>

        <Text style={styles.winText}>Correct!</Text>
        <Text style={styles.winText}>Congratulations</Text>
        <Text style={[styles.winText, {marginBottom: 100}]}>
          You earn {score} points
        </Text>

        <View style={styles.startButtonContainer}>
          <TouchableOpacity
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            style={styles.gameTitleView}
            onPress={() => this.goBack()}>
            <Text style={{marginTop: 8, fontSize: 20}}>NEXT</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.startButtonContainer, {marginTop: 20}]}>
          <TouchableOpacity
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            style={styles.gameTitleView}
            onPress={() => onShare()}>
            <Text style={{marginTop: 8, fontSize: 20}}>SHARE MY SCORE!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
