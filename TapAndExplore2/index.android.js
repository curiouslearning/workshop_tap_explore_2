/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';

import AnimatedSprite from 'react-native-animated-sprite';
import AnimatedSpriteMatrix from 'rn-animated-sprite-matrix';
import randomString from 'random-string';
import _ from 'lodash';
import letterCharacter from './sprites/letter/letterCharacter';
import letterImageResponse from './sprites/letter/letterImageResponse';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class TapAndExplore2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [],
      currentImage: '',
      word: '',
      toggled: false,
    }
    this.activeCells = [true, true, true, true, true];
    this.animationKeys = ['A', 'B', 'C', 'D', 'E'];
    this.loopAnimation = _.fill(Array(this.activeCells.length), false);
    this.sprites = _.fill(Array(this.activeCells.length), letterCharacter);
    this.scale = {image: 1};
    this.cellSpriteScale = 0.5;
    this.numColumns = 5;
    this.numRows = 1;
    this.letterImages = _.fill(Array(this.activeCells.length), letterImageResponse);
  }

  componentWillMount () {
    this.setState({cells: this.createLetterImages()});
  }

  createLetterImages() {
    const cells = _.map(this.activeCells , (active, index) => ({
      sprite: this.sprites[index],
      letterImage: this.letterImages[index],
      animationKey: this.animationKeys[index],
      loopAnimation: this.loopAnimation[index],
      uid: randomString({ length: 7 }),
      active,
    }));
    return cells;
  }

  matrixLocation () {
    const size = letterCharacter.size;
    const width = this.numColumns * size.width * this.cellSpriteScale;
    const height = this.numRows * size.height * this.cellSpriteScale;
    const top = screenHeight / 5 - height/5;
    const left = screenWidth / 5 - width/5;
    const location = {top, left};
    return location;
  }

  matrixSize () {
    const size = letterCharacter.size;
    const width = this.numColumns * size.width * this.cellSpriteScale;
    const height = this.numRows * size.height * this.cellSpriteScale;
    return {width, height};
  }

  cellPressed (cellObj, position) {
    const cells = _.cloneDeep(this.state.cells);
    if (cells[position].animationKey == 'A') {
      this.setState({currentImage: require('./sprites/letter/apple.png')});
      this.setState({word: 'APPLE'});
    } else if (cells[position].animationKey == 'B') {
      this.setState({currentImage: require('./sprites/letter/ball2.png')});
      this.setState({word: 'BALL'});
    } else if (cells[position].animationKey == 'C') {
      this.setState({currentImage: require('./sprites/letter/car2.png')});
      this.setState({word: 'CAR'});
    } else if (cells[position].animationKey == 'D') {
      this.setState({currentImage: require('./sprites/letter/dog.png')});
      this.setState({word: 'DOG'});
    } else if (cells[position].animationKey == 'E') {
      this.setState({currentImage: require('./sprites/letter/elephant.png')});
      this.setState({word: 'ELEPHANT'});
    }
    // const imageObject = cells[position].letterImage;
    // this.state.currentImage = imageObject;
  }

  render() {
    const imageStatus = this.state.currentImage;
    const wordStatus = this.state.word;
    return (
      <View style={styles.container}>
        <View style={[styles.letterContainer, styles.imageContainer]}>
            <AnimatedSpriteMatrix
              styles={{
                ...(this.matrixLocation()),
                ...(this.matrixSize()),
                position: 'absolute',
              }}
            dimensions={{columns: this.numColumns, rows: this.numRows}}
            cellSpriteScale={this.cellSpriteScale}
            cellObjs={this.state.cells}
            scale={this.scale}
            onPress={(cellObj, position) => this.cellPressed(cellObj, position)}
            />
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.word}>{wordStatus}</Text>
          <Image
            source={imageStatus}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  letterContainer: {
    flex: 1,
    width: 100,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    flex: 1,
    fontSize: 100,
  },
});

AppRegistry.registerComponent('TapAndExplore2', () => TapAndExplore2);
