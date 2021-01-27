import {StyleSheet} from 'react-native';
import * as Utils from '../common/utils';
import * as Const from '../common/const';

export const common = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f0f0f5'},
  header: {
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: Utils.scale(20, Const.Vertical),
    backgroundColor: 'orange',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  labelTitle: {
    fontSize: Utils.scale(40, Const.Horizontal),
    color: 'white',
    fontFamily: 'OpenSansCondensed-Light',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
});