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
    }
    this.activeCells = [true, true, true];
    this.animationKeys = ['A', 'B', 'C'];
    this.loopAnimation = _.fill(Array(this.activeCells.length), false);
    this.sprites = _.fill(Array(this.activeCells.length), letterCharacter);
    this.scale = {image: 1};
    this.cellSpriteScale = 0.5;
    this.numColumns = 3;
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
    console.warn()
    this.setState({currentImage: cells[position].letterImage });
  }

  render() {
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
          <Image
            source={this.currentImage}
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
    width: 100,
  }
});

AppRegistry.registerComponent('TapAndExplore2', () => TapAndExplore2);
