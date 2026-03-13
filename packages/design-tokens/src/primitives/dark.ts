import { ColorShades } from '@/types';
import { buildColorShades } from '@/utils/buildColorShades';

const azure: ColorShades = [
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

const blue: ColorShades = [
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

const green: ColorShades = [
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

const orange: ColorShades = [
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

const red: ColorShades = [
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

const pink: ColorShades = [
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

const purple: ColorShades = [
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

const dark = {
  color: {
    azure: buildColorShades(azure),
    blue: buildColorShades(blue),
    green: buildColorShades(green),
    orange: buildColorShades(orange),
    red: buildColorShades(red),
    pink: buildColorShades(pink),
    purple: buildColorShades(purple),
  },
} as const;

export default dark;
