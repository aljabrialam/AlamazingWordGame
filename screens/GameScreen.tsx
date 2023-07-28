import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Cities} from '../puzzles/cities';
import {Animals} from '../puzzles/animals';
import {Foods} from '../puzzles/foods';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

const storeData = async (value: any) => {
  try {
    await AsyncStorage.setItem('score', value);
  } catch (e) {}
};

interface IProps {
  navigation: any;
  route: any;
}

interface IState {
  enteredLetter: number;
  answer: string;
  keyboardkeys: string[];
  hint: string;
  correct: number;
  wrong: number;
  usedLetters: string[];
  lettersLeft: string[];
  input: string;
  score: number;
}

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomCities = function () {
  let randomIndex = Math.floor(Math.random() * (Cities.length - 1));
  return Cities[randomIndex];
};

const getRandomFoods = function () {
  let randomIndex = Math.floor(Math.random() * (Foods.length - 1));
  return Foods[randomIndex];
};

const getRandomAnimals = function () {
  let randomIndex = Math.floor(Math.random() * (Animals.length - 1));
  return Animals[randomIndex];
};

export default class GameScreen extends React.Component<IProps, IState> {
  puzzles: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      enteredLetter: 0,
      answer: '',
      hint: '',
      correct: 0,
      wrong: 0,
      usedLetters: ([] = []),
      lettersLeft: ([] = []),
      input: '',
      score: 0,
      keyboardkeys: [],
    };
    this.init = this.init.bind(this);
  }
  componentDidMount() {
    this.init();
  }
  static navigationOptions = {
    title: '',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
  };

  init() {
    const radio = this.props.navigation.getParam('radio', '');
    var puzzle: {answer: string; hint: string};

    if (radio === 'Cities') {
      puzzle = getRandomCities();
    } else if (radio === 'Foods') {
      puzzle = getRandomFoods();
    } else {
      puzzle = getRandomAnimals();
    }

    let answer = puzzle.answer.replace(/[^a-zA-Z]/gim, ' ').trim();
    let hint = puzzle.hint;
    let keyboardkeys = shuffle([...answer]);
    let lettersLeft = Array(answer.length) || 0;

    for (let index = 0; index < answer.length; index++) {
      lettersLeft[index] = answer[index] == ' ' ? '*' : ' ';
    }

    this.setState({
      enteredLetter: 0,
      answer: answer,
      hint: hint,
      correct: 0,
      wrong: 0,
      usedLetters: [],
      lettersLeft: lettersLeft,
      input: '',
      keyboardkeys: keyboardkeys,
    });
  }

  validate(usedLetters: any[], letter: any) {
    usedLetters.push(letter);

    let keyboardkeys = this.state.keyboardkeys;

    const index = keyboardkeys.indexOf(letter);
    if (index > -1) {
      keyboardkeys[index] = '-';
    }

    let correct = this.state.correct,
      wrong = this.state.wrong,
      answer = this.state.answer,
      lettersLeft = this.state.lettersLeft;

    let enteredLetter = this.state.enteredLetter;

    if (lettersLeft[this.state.enteredLetter] === '*') {
      enteredLetter = enteredLetter + 2;
      lettersLeft[this.state.enteredLetter + 1] = letter.toUpperCase();
    } else if (
      enteredLetter != answer.length &&
      lettersLeft[this.state.enteredLetter] !== '*'
    ) {
      lettersLeft[this.state.enteredLetter] = letter.toUpperCase();
      enteredLetter++;
    }

    this.setState({
      enteredLetter: enteredLetter,
      usedLetters: usedLetters,
      correct: correct,
      wrong: wrong,
      lettersLeft: lettersLeft,
      keyboardkeys: keyboardkeys,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.pageCountText}>1/2</Text>
        <Text style={styles.scoreText}>Score: {this.state.score}</Text>
        {this.renderDashes()}
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>{this.state.hint}</Text>
        </View>
        {this.renderKeyBoard()}
        {this.renderButton()}
        <View style={styles.container} />
      </View>
    );
  }

  renderButton() {
    return (
      <View style={styles.startButtonContainer}>
        {this.state.keyboardkeys.includes('-') ? (
          <TouchableOpacity
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            style={styles.gameTitleView}
            onPress={this.onKeyPressEnter.bind(this)}>
            <Text style={{marginTop: 8, fontSize: 20}}>ENTER</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            style={styles.gameTitleView}
            onPress={() => this.init()}>
            <Text style={{marginTop: 8, fontSize: 20}}>SKIP</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  renderDashes() {
    return (
      <View style={styles.dashes}>
        {this.state.lettersLeft.map(
          (
            letter:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | null
              | undefined,
            index: React.Key | null | undefined,
          ) => {
            if (letter == '*') {
              return (
                <View style={styles.dashItemContainer} key={index}>
                  <Text style={styles.dashBlankItem}> </Text>
                </View>
              );
            } else {
              return (
                <View key={index} style={styles.guessSquare}>
                  <View style={styles.dashItemContainer} key={index}>
                    <Text style={styles.dashItem}>{letter}</Text>
                  </View>
                </View>
              );
            }
          },
        )}
      </View>
    );
  }

  onKeyPress(letter: any) {
    let usedLetters = this.state.usedLetters;
    this.validate(usedLetters, letter);
  }

  onKeyPressEnter() {
    let wrong = this.state.wrong,
      score = this.state.score;

    let lettersLeft = this.state.lettersLeft;
    let answer = this.state.answer;

    const {navigate} = this.props.navigation;

    if (
      lettersLeft.join('').replace(/\*/g, ' ').toUpperCase() ==
      answer.toUpperCase()
    ) {
      score = this.state.score + lettersLeft.join('').replace(/\*/g, '').length;
      this.setState({
        wrong: wrong,
        score: answer.length,
      });

      AsyncStorage.getItem('score')
        .then(value => {
          if (score > +value!) {
            storeData(score + '');
          }
        })
        .then(res => {});

      navigate('WinRoute', {score: score});
      this.init();
    } else {
      wrong++;
    }

    if (wrong > 0) {
      Alert.alert(
        'You Lost',
        'Answer: ' + answer.toUpperCase() + ' ' + this.state.hint,
        [{text: 'OK', onPress: () => this.init()}],
        {cancelable: false},
      );
    }

    this.setState({
      wrong: wrong,
      score: score,
    });
  }
  renderKeyBoard() {
    return (
      <View style={styles.keyboard}>
        <View style={styles.keyboardRow}>
          {this.state.keyboardkeys.map((letter, index) => {
            if (letter == '-') {
              return (
                <View style={styles.guessSquare}>
                  <View style={styles.keyItem} key={index}>
                    <Text key={index} style={styles.usedKey}></Text>
                  </View>
                </View>
              );
            } else if (letter == ' ') {
              return <Text key={index}></Text>;
            } else {
              return (
                <View key={index} style={styles.guessSquare}>
                  <TouchableHighlight
                    hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                    onPress={this.onKeyPress.bind(this, letter)}
                    style={styles.keyItem}
                    key={index}>
                    <Text style={styles.letter}>{letter.toUpperCase()}</Text>
                  </TouchableHighlight>
                </View>
              );
            }
          })}
        </View>
      </View>
    );
  }
}
