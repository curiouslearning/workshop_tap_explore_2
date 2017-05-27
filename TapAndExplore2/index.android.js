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
} from 'react-native';

import AnimatedSprite from 'react-native-animated-sprite';
import AnimatedSpriteMatrix from 'rn-animated-sprite-matrix';
import randomString from 'random-string';
import _ from 'lodash';
import letterCharacter from './sprites/letter/letterCharacter';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class TapAndExplore2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [],
    }
    this.activeCells = [true, true, true];
    this.animationKeys = ['A', 'B', 'C'];
    this.loopAnimation = _.fill(Array(this.activeCells.length), false);
    this.sprites = _.fill(Array(this.activeCells.length), letterCharacter);
    this.scale = {image: 1};
    this.cellSpriteScale = 0.5;
    this.numColumns = 3;
    this.numRows = 1
  }

  componentWillMount () {
    this.setState({cells: this.createLetterImages()});
  }

  createLetterImages() {
    const cells = _.map(this.activeCells , (active, index) => ({
      sprite: this.sprites[index],
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
    const top = screenHeight / 2 - height/2;
    const left = screenWidth / 2 - width/2;
    const location = {top, left};
    return location;
  }

  matrixSize () {
    const size = letterCharacter.size;
    const width = this.numColumns * size.width * this.cellSpriteScale;
    const height = this.numRows * size.height * this.cellSpriteScale;
    return {width, height};
  }

  render() {
    return (
      <View style={styles.container}>
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
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  letterBox: {
    flex: 1,
    height: 50,
    width: 50,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5
  },
  letterText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white'
  }
});

AppRegistry.registerComponent('TapAndExplore2', () => TapAndExplore2);
