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

const calculateTime = (time) => {
  let currentTime = new Date();
  let postTime = new Date(time);
  // currentTime = currentTime.setHours(currentTime.getHours() - 7);
  let dif = currentTime - postTime;
  dif = parseInt(dif / 1000, 10);
  let res = ['Vừa xong'];
  dif = parseInt(dif / 60, 10);
  if (dif >= 1) {
    let temp = dif + ' Phút trước';
    res.push(temp);
    dif = parseInt(dif / 60, 10);
  }
  if (dif >= 1) {
    let temp = dif + ' Giờ trước';
    res.push(temp);
    dif = parseInt(dif / 24, 10)
  }
  if (dif >= 1) {
    let temp = dif + ' Ngày trước';
    res.push(temp);
    dif = parseInt(dif / 30, 10)
  }
  if (dif >= 1) {
    let temp = dif + ' Tháng trước';
    res.push(temp);
    dif = parseInt(dif / 12, 10)
  }
  if (dif >= 1) {
    let temp = dif + ' Năm trước';
    res.push(temp);
  }
  return res[res.length - 1];
}

export { scale, calculateTime };
