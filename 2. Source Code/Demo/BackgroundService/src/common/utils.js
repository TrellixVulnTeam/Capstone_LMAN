import { Dimensions } from 'react-native';
import * as Const from './const';


const scale = (unit, direction) => {
  let { width, height } = Dimensions.get('window');
  let result = 0;
  if (direction === Const.Horizontal) {
    result = (unit / Const.dimWidth) * width;
  } else {
    result = (unit / Const.dimHeigth) * height;
  }
  return result;
};


export { scale };
