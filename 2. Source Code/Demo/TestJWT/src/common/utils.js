import { Dimensions } from 'react-native';
import { Get } from './request';
import * as Const from './const';


const scale = (unit, direction) => {
  let { width, height } = Dimensions.get('window');
  let result = 0;
  if (direction === Const.Horizontal) {
    // console.log('Device width', width);
    // console.log('Unit width', unit);
    result = (unit / Const.dimWidth) * width;
    // console.log('Fit width', result);
    // console.log('-----------------------------------------------');
  } else {
    // console.log('Device height', height);
    // console.log('Unit height', unit);
    result = (unit / Const.dimHeigth) * height;
    // console.log('Fit height', result);
    // console.log('-----------------------------------------------');
  }
  return result;
};


export { scale };
