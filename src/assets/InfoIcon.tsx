import { h, JSX } from 'preact';

interface Props {
  height?: number;
  width?: number;
}

export function InfoIcon({ width = 14, height = 16, }: Props): JSX.Element {
  return <svg width={width} height={height} viewBox="0 0 14 16"><path d="M7 1a7 7 0 100 14A7 7 0 007 1zm0 5a1 1 0 110-2 1 1 0 010 2zm0 1a1 1 0 011 1v4a1 1 0 01-2 0V8a1 1 0 011-1z" fill-rule="nonzero" /></svg>;
}
