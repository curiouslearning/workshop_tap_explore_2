const letterCharacter = {
  name:"letter",
  size: {width: 220, height: 220},
  letterTypes: ['A', 'B', 'C', 'D', 'E'],
  frames: [
    require('./letter-a-icon.png'),
    require('./letter-b-icon.png'),
    require('./letter-c-icon-png-31.png'),
    require('./letter-d-icon.png'),
    require('./letter-e-icon.png'),
  ],

  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'A':
        return [0];
      case 'B':
        return [1];
      case 'C':
        return [2];
      case 'D':
        return [3];
      case 'E':
        return [4];
    }
  },
};

export default letterCharacter;
