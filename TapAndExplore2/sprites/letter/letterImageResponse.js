const letterImageResponse = {
  name:"letterImageResponse",
  size: {width: 220, height: 220},
  letterTypes: ['A', 'B', 'C'],
  frames: [
    require('./apple03a.png'),
    require('./ball03.png'),
    require('./car.png'),
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

export default letterImageResponse;
