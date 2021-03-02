import { StyleSheet } from 'react-native';
import * as Utils from '../common/utils';
import * as Const from '../common/const';

export const common = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f5' },
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
export const login = StyleSheet.create({
  container: { flex: 1 },
})

export const profile = StyleSheet.create({
  userName: {
    fontSize: Utils.scale(30, Const.Horizontal),
    color: 'white',
    fontFamily: 'OpenSansCondensed-Light',
    paddingTop: Utils.scale(10, Const.Vertical),
  },

  email: {
    fontSize: Utils.scale(15, Const.Horizontal),
    color: 'white',
    fontFamily: 'OpenSansCondensed-Light',
  },

  firstHeader: {
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: Utils.scale(20, Const.Vertical),
    paddingBottom: Utils.scale(20, Const.Vertical),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  image: {
    height: Utils.scale(100, Const.Vertical),
    width: Utils.scale(110, Const.Horizontal),
    borderRadius: Utils.scale(55, Const.Horizontal),
    borderWidth: 2,
    overflow: "hidden",
    alignSelf: 'center'
  },

  basicInfo: {
    paddingTop: Utils.scale(10, Const.Vertical),
    flexDirection: "row"
  },

  basicSmallInfo: {
    flex: 0.3,
    textAlignVertical: "center",
    textAlign: "center",
    alignSelf: 'center',
    color: 'white',
    fontSize: Utils.scale(20, Const.Horizontal),   
  }, 

  button: {
    paddingTop: Utils.scale(10, Const.Vertical),
    flexDirection: "row",
  },

  singleButton: {
    width: Utils.scale(130, Const.Horizontal),
    height: Utils.scale(25, Const.Vertical),
    flex: 0.4,
    textAlignVertical: "center",
    textAlign: "center",
    alignSelf: 'center',
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 10,
  },

  information: {
    paddingTop: Utils.scale(10, Const.Vertical),
    flexDirection: "row",
  },

  info_icon: {
    width: Utils.scale(25, Const.Horizontal),
    height: Utils.scale(25, Const.Vertical),
    marginLeft: Utils.scale(10, Const.Horizontal)
  },

  info_text: {
    fontSize: Utils.scale(17.5, Const.Horizontal), 
    marginLeft: Utils.scale(10, Const.Horizontal),
    color: "#ff5050"
  }


})