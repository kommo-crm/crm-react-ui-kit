import { ColorShades } from '@/types';
import { buildColorShades } from '@/utils/buildColorShades';

const azure: ColorShades = [
  '#f8fcfe', // 50
  '#e6f7fe', // 100
  '#cbeaf8', // 200
  '#bad8e6', // 300
  '#99b6c4', // 400
  '#76939f', // 500
  '#597784', // 600
  '#355665', // 700
  '#203d49', // 800
  '#0b2934', // 900
];

const blue: ColorShades = [
  '#f6f8fc', // 50
  '#e9f1fe', // 100
  '#d7e6fd', // 200
  '#bdd5fc', // 300
  '#84b1fd', // 400
  '#4c8bf7', // 500
  '#326fd8', // 600
  '#0349b3', // 700
  '#013384', // 800
  '#0e1168', // 900
];

const green: ColorShades = [
  '#edf8f2', // 50
  '#e2f5eb', // 100
  '#cfebdc', // 200
  '#abdfc5', // 300
  '#62c398', // 400
  '#02a170', // 500
  '#02815a', // 600
  '#065e40', // 700
  '#06432d', // 800
  '#002b1b', // 900
];

const orange: ColorShades = [
  '#fcf3e6', // 50
  '#fdf0c3', // 100
  '#fce589', // 200
  '#f9d049', // 300
  '#f59e0b', // 400
  '#d47400', // 500
  '#b75610', // 600
  '#853c08', // 700
  '#5e2904', // 800
  '#401a01', // 900
];

const red: ColorShades = [
  '#fcf3f3', // 50
  '#feebea', // 100
  '#fddedc', // 200
  '#fec6c3', // 300
  '#f59693', // 400
  '#ea5d60', // 500
  '#ce3942', // 600
  '#9b0020', // 700
  '#6d0215', // 800
  '#460009', // 900
];

const pink: ColorShades = [
  '#fff1f5', // 50
  '#fdebf0', // 100
  '#ffdce5', // 200
  '#fcc4d4', // 300
  '#fb8fb2', // 400
  '#f64990', // 500
  '#cc2d73', // 600
  '#961d52', // 700
  '#6e0a39', // 800
  '#4a0224', // 900
];

const purple: ColorShades = [
  '#f4f5fc', // 50
  '#eeeefe', // 100
  '#e3e3fd', // 200
  '#cfcfff', // 300
  '#ada9fe', // 400
  '#8a7cfd', // 500
  '#533bb7', // 600
  '#7259eb', // 700
  '#3a2984', // 800
  '#251360', // 900
];

const neutral: ColorShades = [
  '#ffffff', // 50
  '#f5f5f5', // 100
  '#e5e5e5', // 200
  '#d4d4d4', // 300
  '#b1b1b1', // 400
  '#8f8f8f', // 500
  '#737373', // 600
  '#525252', // 700
  '#3c3c3c', // 800
  '#262626', // 900
];

const light = {
  color: {
    azure: buildColorShades(azure),
    blue: buildColorShades(blue),
    green: buildColorShades(green),
    orange: buildColorShades(orange),
    red: buildColorShades(red),
    pink: buildColorShades(pink),
    purple: buildColorShades(purple),
    neutral: buildColorShades(neutral),
  },
} as const;

export default light;
