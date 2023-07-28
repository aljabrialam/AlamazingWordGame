import React from 'react';

import {Text, View, Alert, TouchableOpacity} from 'react-native';
import RadioButton from '../components/RadioButton';
import styles from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  navigation: any;
}

export default class LeaderBoardScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: '',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
  };

  data = [
    {
      label: 'Cities',
      value: 'Cities',
    },
    {
      label: 'Foods',
      value: 'Foods',
    },
    {
      label: 'Animals',
      value: 'Animals',
    },
  ];

  state = {
    radio: '',
    score: '',
  };

  componentDidMount() {}

  asyncOperationOnAsyncStorage = async () => {
    await AsyncStorage.getItem('score').then(value => {
      this.setState({score: value});
    });
  };

  handleRadioButton = (value: any) => {
    this.setState({radio: value});
  };

  render() {
    const {navigate} = this.props.navigation;

    this.asyncOperationOnAsyncStorage();

    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageCountText}>1/1</Text>
        <View style={styles.gameTitleView}>
          <View style={styles.puzzleTitle}>
            <Text style={[styles.gameTitle, {margin: 10}]}>Words Puzzle</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <RadioButton
            data={this.data}
            onSelect={this.handleRadioButton}
            styling={{color: 'blue', size: 30}}
          />
        </View>

        <View style={styles.startButtonContainer}>
          <TouchableOpacity
            style={styles.gameTitleView}
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            onPress={() => {
              if (this.state.radio === '') {
                Alert.alert(
                  'To Start',
                  'Please select a category',
                  [{text: 'OK', onPress: () => {}}],
                  {cancelable: false},
                );
              } else {
                navigate('GameRoute', {radio: this.state.radio});
              }
            }}>
            <Text style={{marginTop: 8, fontSize: 20}}>START</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.gameTitle}>
            Leaders Board: {this.state.score}
          </Text>
        </View>
      </View>
    );
  }
}
