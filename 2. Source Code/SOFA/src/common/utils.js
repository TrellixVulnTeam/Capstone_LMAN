import { Dimensions, StatusBar, PermissionsAndroid } from 'react-native';
import * as Const from './const';
import AsyncStorage from "@react-native-async-storage/async-storage";



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
    let temp = dif + ' phút';
    res.push(temp);
    dif = parseInt(dif / 60, 10);
  }
  if (dif >= 1) {
    let temp = dif + ' giờ';
    res.push(temp);
    dif = parseInt(dif / 24, 10)
  }
  if (dif >= 1) {
    let temp = dif + ' ngày';
    res.push(temp);
    dif = parseInt(dif / 30, 10)
  }
  if (dif >= 1) {
    let temp = dif + ' tháng';
    res.push(temp);
    dif = parseInt(dif / 12, 10)
  }
  if (dif >= 1) {
    let temp = dif + ' năm';
    res.push(temp);
  }
  return res[res.length - 1];
}

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  }
  catch (e) {
    console.log(e);
  }
}

const isInteger = (number) => {

  if (number == (parseInt(number, 10))) {
    return number + '.0';
  }
  return number;
}
const requestPermission = async (permission) => {
  try {
    if (PermissionsAndroid.check(permission)) {
      const granted = await PermissionsAndroid.request(
        permission,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

export { scale, calculateTime, getData, storeData, isInteger, requestPermission };
