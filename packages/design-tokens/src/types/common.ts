import { SCALES, THEMES } from '@/const';
import { PrimitivePath } from '@/primitives';

export type Scale = (typeof SCALES)[number];

export type Theme = (typeof THEMES)[number];

export type ColorShades = readonly [
  string, // 50
  string, // 100
  string, // 200
  string, // 300
  string, // 400
  string, // 500
  string, // 600
  string, // 700
  string, // 800
  string, // 900
];

export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type RGB = `rgba(${number}, ${number}, ${number})`;

export type SemanticNode =
  | PrimitivePath
  | {
      [key: string]: SemanticNode | RGBA | RGB;
    };
