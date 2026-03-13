import { ColorShades } from '@/types/common';
import { buildColorShades } from '@/utils/buildColorShades';

const azureLight: ColorShades = [
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

const blueLight: ColorShades = [
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

const greenLight: ColorShades = [
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

const orangeLight: ColorShades = [
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

const redLight: ColorShades = [
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

const pinkLight: ColorShades = [
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

const purpleLight: ColorShades = [
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

const neutralLight: ColorShades = [
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

const azureDark: ColorShades = [
  '#eff6fc', // 50
  '#d4e3f1', // 100
  '#a8c1d6', // 200
  '#759cb8', // 300
  '#567e9c', // 400
  '#3b6787', // 500
  '#224e6b', // 600
  '#153953', // 700
  '#153043', // 800
  '#0f2231', // 900
];

const blueDark: ColorShades = [
  '#e9f0fd', // 50
  '#d3e2fd', // 100
  '#9dc0f5', // 200
  '#6398f2', // 300
  '#3a75dd', // 400
  '#275ebc', // 500
  '#2a4d75', // 600
  '#1c416d', // 700
  '#183b64', // 800
  '#123255', // 900
];

const greenDark: ColorShades = [
  '#d4f8da', // 50
  '#c2ecc9', // 100
  '#8acd99', // 200
  '#56aa68', // 300
  '#32884d', // 400
  '#20713a', // 500
  '#29554e', // 600
  '#1b4843', // 700
  '#15403c', // 800
  '#153b3c', // 900
];

const orangeDark: ColorShades = [
  '#ffedc9', // 50
  '#fdddaf', // 100
  '#e8b565', // 200
  '#c78d3b', // 300
  '#a56c1f', // 400
  '#8f5508', // 500
  '#4b4c41', // 600
  '#40423b', // 700
  '#2b3d43', // 800
  '#27393f', // 900
];

const redDark: ColorShades = [
  '#feece9', // 50
  '#fdd9d5', // 100
  '#f8aaa1', // 200
  '#dc7c7a', // 300
  '#c35656', // 400
  '#aa3b3f', // 500
  '#514754', // 600
  '#493c49', // 700
  '#423442', // 800
  '#372e3c', // 900
];

const pinkDark: ColorShades = [
  '#fff1f5', // 50
  '#fbd9e2', // 100
  '#fea4c0', // 200
  '#e2749a', // 300
  '#c54f7b', // 400
  '#a73562', // 500
  '#53455d', // 600
  '#4a3a54', // 700
  '#41324c', // 800
  '#372c45', // 900
];

const purpleDark: ColorShades = [
  '#f6f3fe', // 50
  '#e8dcfd', // 100
  '#c7b4ef', // 200
  '#a68bd9', // 300
  '#8c64c8', // 400
  '#774cb4', // 500
  '#3f4775', // 600
  '#39406b', // 700
  '#313662', // 800
  '#2b315c', // 900
];

const color = {
  light: {
    azure: buildColorShades(azureLight),
    blue: buildColorShades(blueLight),
    green: buildColorShades(greenLight),
    orange: buildColorShades(orangeLight),
    red: buildColorShades(redLight),
    pink: buildColorShades(pinkLight),
    purple: buildColorShades(purpleLight),
    neutral: buildColorShades(neutralLight),
  },
  dark: {
    azure: buildColorShades(azureDark),
    blue: buildColorShades(blueDark),
    green: buildColorShades(greenDark),
    orange: buildColorShades(orangeDark),
    red: buildColorShades(redDark),
    pink: buildColorShades(pinkDark),
    purple: buildColorShades(purpleDark),
  },
} as const;

export default color;
