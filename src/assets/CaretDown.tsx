import { h, JSX } from 'preact';

interface Props {
  height?: number;
  width?: number;
}

export function CaretDown({ height = 16, width = 12 }: Props): JSX.Element {
  return <svg width={width} height={height} viewBox="0 0 12 16"><path d="M6 12a.997.997 0 01-.707-.293l-5-5a.999.999 0 111.414-1.414L6 9.586l4.293-4.293a.999.999 0 111.414 1.414l-5 5A.997.997 0 016 12" fill-rule="nonzero" /></svg>;
}
