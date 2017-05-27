const letterCharacter = {
  name:"letter",
  size: {width: 220, height: 220},
  letterTypes: ['A', 'B', 'C'],
  frames: [
    require('./letter-a-icon.png'),
    require('./letter-b-icon.png'),
    require('./letter-c-icon-png-31.png'),
  ],

  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'A':
        return [0];
      case 'B':
        return [1];
      case 'C':
        return [2];
    }
  },
};

export default letterCharacter;
