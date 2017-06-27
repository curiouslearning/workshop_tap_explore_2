const letterImageResponse = {
  name:"letterImageResponse",
  size: {width: 220, height: 220},
  letterTypes: ['A', 'B', 'C', 'D', 'E'],
  frames: [
    require('./apple.png'),
    require('./ball2.png'),
    require('./car2.png'),
    require('./dog.png'),
    require('./elephant.png'),
  ],

  letterImageIndex: function getLetterImageIndex (animationType) {
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

export default letterImageResponse;
