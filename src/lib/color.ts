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
  CERULEAN: createPaint(0.062745098039216, 0.023529411764706, 0.62352941176471),
  GRAY: createPaint(0.37647, 0.45882, 0.54510),
  LIGHT_GRAY: createPaint(0.77647, 0.81569, 0.85098),
  WHITE: createPaint(1, 1, 1),
};
