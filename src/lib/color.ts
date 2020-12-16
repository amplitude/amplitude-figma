function createPaint(r: number, g: number, b: number, opacity = 1): readonly SolidPaint[] {
  return [{
    blendMode: 'NORMAL',
    color: { r, g, b },
    opacity,
    type: 'SOLID',
    visible: true
  }];
}

export const COLORS = {
  CERULEAN: createPaint(0, 0.49803921580314636, 0.8235294222831726),
  GRAY: createPaint(0.37647, 0.45882, 0.54510),
  LIGHT_GRAY: createPaint(0.77647, 0.81569, 0.85098),
  WHITE: createPaint(1, 1, 1),
};
