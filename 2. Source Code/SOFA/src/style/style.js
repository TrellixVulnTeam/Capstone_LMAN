import { StyleSheet } from 'react-native';
import { scale } from '../common/utils';
import * as Utils from '../common/utils';
import * as Const from '../common/const';
import { Vertical, Horizontal } from '../common/const';
export const statusBarColor = '#2a7ea0'
export const common = StyleSheet.create({
  container: {
    flex: 1,
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
});

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
    height: Utils.scale(110, Const.Horizontal),
    width: Utils.scale(110, Const.Horizontal),
    borderRadius: Utils.scale(55, Const.Horizontal),
    borderWidth: 2,
    overflow: 'hidden',
    alignSelf: 'center',
    marginLeft: Utils.scale(149, Const.Horizontal),
  },

  basicInfo: {
    paddingTop: Utils.scale(10, Const.Vertical),
    flexDirection: 'row',
  },

  basicSmallInfo: {
    flex: 0.3,
    textAlignVertical: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: Utils.scale(20, Const.Horizontal),
  },

  button: {
    paddingTop: Utils.scale(10, Const.Vertical),
    flexDirection: 'row',
  },

  singleButton: {
    width: Utils.scale(130, Const.Horizontal),
    height: Utils.scale(25, Const.Vertical),
    flex: 0.4,
    textAlignVertical: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },

  information: {
    paddingTop: Utils.scale(10, Const.Vertical),
    flexDirection: 'row',
  },

  info_icon: {
    width: Utils.scale(25, Const.Horizontal),
    height: Utils.scale(25, Const.Vertical),
    marginLeft: Utils.scale(10, Const.Horizontal),
  },

  info_text: {
    fontSize: Utils.scale(17.5, Const.Horizontal),
    marginLeft: Utils.scale(10, Const.Horizontal),
    color: "#ff5050"
  },

  line: {
    marginTop: Utils.scale(15, Const.Vertical),
    marginLeft: Utils.scale(30, Const.Horizontal),
    marginRight: Utils.scale(30, Const.Horizontal),
    borderBottomColor: '#ff5050',
    borderBottomWidth: 1,
  },

  images: {
    flexDirection: 'row',
    paddingHorizontal: 0.5
  },

})

export const newsfeed = StyleSheet.create({
  Header: {
    paddingTop: scale(10, Vertical),
    flexDirection: 'row',
    //backgroundColor: '#00a7aa',
    alignContent: 'center',
    alignItems: 'center'
  },
  SofaTitle: {
    fontFamily: 'FS Playlist Script',
    fontSize: 60,
    marginLeft: scale(15, Horizontal)
  },
  searchIcon: {
    marginLeft: 'auto',
    marginRight: scale(5, Horizontal)
  },
  notificationIcon: {

    marginRight: scale(5, Horizontal)
  },
  listArticle: {
    // height: scale(661, Vertical)
    flex: 1
  },
  articleMenu: {
    width: scale(400, Horizontal),
    position: 'absolute',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: scale(0, Vertical),
    elevation: 5
  },
  articleMenuItem: {
    flexDirection: 'row',
    height: scale(50, Vertical),
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    paddingLeft: scale(20, Horizontal)
  },
  articleMenuItemText: { marginLeft: scale(10, Horizontal) },
  articleMenuItemTextDetail: { color: '#9E9E9E' },
  AddIcon: {
    marginRight: scale(5, Horizontal),
  },
  MenuIcon: {
    marginRight: scale(5, Horizontal),
  },
  FeedTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: scale(10, Vertical),
    color: '#4E4E4E',
  },
  Article: {
    // backgroundColor: '#c0e9ea',
    marginTop: scale(20, Vertical),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingVertical: scale(10, Vertical),
    // paddingLeft: scale(5, Horizontal),
  },
  ArticleAvatar: {
    height: scale(45, Vertical),
    width: scale(45, Vertical),
    borderRadius: 50,
    marginLeft: scale(10, Horizontal)
  },
  ArticleHeader: {
    marginLeft: scale(25, Horizontal)
  },
  ArticleAuthor: {
    fontFamily: 'SanFranciscoText-Bold',
    color: 'white'
  },
  ArticleTime: {
    fontFamily: 'SanFranciscoText-Regular',
    color: 'white'
  },
  ArticleMenu: {
    marginLeft: 'auto',
    marginRight: scale(10, Horizontal),
    marginTop: scale(5, Vertical)
  },
  ArticleImageList: {
    marginTop: scale(20, Vertical),
    marginLeft: scale(5, Horizontal),
    marginRight: 'auto',
    width: scale(380, Horizontal)
  },
  ArticleImageStyle: {
  },
  ArticleImage: {
    flex: 1,
    height: scale(380, Horizontal),
    width: scale(380, Horizontal),
    resizeMode: 'cover',
    borderRadius: 20,
  },
  ArtileMore: {
    width: scale(400, Horizontal),
    marginTop: scale(5, Vertical)
  },
  ArticleAction: {
    paddingVertical: scale(5, Vertical),
    flexDirection: 'row',
    backgroundColor: '#E6F3FC',
    width: scale(380, Horizontal),
    marginLeft: scale(10, Horizontal),
    borderRadius: 10
  },
  ArticleNumberOfReact: {
    marginLeft: scale(5, Horizontal),
    marginTop: scale(5, Horizontal)
  },
  ArticleIconOfReact: {
    // marginLeft: scale(10, Horizontal) 
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row'
  },
  ArticleCaption: { flexDirection: 'row', marginTop: scale(5, Vertical) },
  ArticleCaptionContent: {
    fontSize: 16,
    textAlignVertical: 'center',
    marginLeft: scale(20, Horizontal),
    marginRight: scale(10, Horizontal),
    marginTop: scale(10, Horizontal),
    color: 'white'
  },
});
export const balance = StyleSheet.create({
  main: {
    backgroundColor: `rgba(251, 184, 151, 1)`,
  },

  mainContainer: {
    backgroundColor: `rgba(240, 243, 247, 1)`,
    borderRadius: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  container: {},
  overlay: {
    backgroundColor: `rgba(251, 184, 151, 1)`,
  },
  avatarStyle: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
    alignSelf: 'center',
  },
  textStyle: {
    marginVertical: 20,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  balanceContainer: {
    padding: 10,
  },
  cardHeader: {
    marginBottom: 0,
    backgroundColor: `rgba(0, 0, 0, 0.03)`,
  },
  card: {
    position: 'relative',
    display: 'flex',
    backgroundColor: `rgba(255, 255, 255, 1)`,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 20,
  },

  textSuccess: {
    color: '#28a745',
    textAlign: 'right'
  },
  textDanger: {
    color: '#dc3545',
    textAlign: 'right'
  },
});

export const updateProfile = StyleSheet.create({
  updateAvaText: {
    alignSelf: 'center',
    textAlignVertical: "center",
    textAlign: 'center',
    fontSize: Utils.scale(18, Const.Horizontal),
    textDecorationLine: 'underline',
    color: "#E83AC5"
  },


  updateInfo: {
    marginTop: Utils.scale(13, Const.Vertical),
  },

  updateItemFirst: {
    marginLeft: Utils.scale(15, Const.Horizontal),
  },

  updateInputFirst: {
    backgroundColor: 'pink',
    height: Utils.scale(40, Const.Vertical),
    width: Utils.scale(175, Const.Horizontal),
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: Utils.scale(20, Const.Horizontal),
  },

  updateName: {
    flexDirection: 'row'
  },

  updateItemSecond: {
    marginTop: Utils.scale(5, Const.Vertical),
    marginLeft: Utils.scale(15, Const.Horizontal),
  },

  updateLabel: {
    marginLeft: Utils.scale(15, Const.Horizontal),
    fontSize: Utils.scale(15, Const.Horizontal),
    color: '#D81B54'
  },

  updateInput: {
    backgroundColor: 'pink',
    height: Utils.scale(40, Const.Vertical),
    width: Utils.scale(365, Const.Horizontal),
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: Utils.scale(20, Const.Horizontal),
  },


  updateInputDate: {
    backgroundColor: 'pink',
    height: Utils.scale(40, Const.Vertical),
    width: Utils.scale(365, Const.Horizontal),
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: Utils.scale(20, Const.Horizontal),
  },


  appButtonContainer: {
    marginTop: Utils.scale(25, Const.Vertical),
    elevation: 8,
    backgroundColor: "#E34242",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: scale(130, Horizontal),
    alignSelf: "center",
    flex: 0.3,
  },

  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

  buttonAll: {
    flexDirection: 'row',
    alignSelf: "center",
  },

  buttonEmpty: {
    marginLeft: Utils.scale(10, Const.Horizontal),
    marginRight: Utils.scale(10, Const.Horizontal),
  }
});

export const verification = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fbb897'
  },

  logo: {
    width: Utils.scale(100, Const.Horizontal),
    height: Utils.scale(100, Const.Vertical),
    alignSelf: 'center',
    marginTop: Utils.scale(50, Const.Vertical)
  },

  content: {
    marginTop: Utils.scale(20, Const.Vertical),
    backgroundColor: 'white',
    marginLeft: Utils.scale(30, Const.Horizontal),
    width: Utils.scale(340, Const.Horizontal),
    height: Utils.scale(350, Const.Vertical),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },

  labelTitle: {
    fontSize: Utils.scale(40, Const.Horizontal),
    color: 'black',
    fontFamily: 'OpenSansCondensed-Light',
    paddingBottom: Utils.scale(10, Const.Vertical),
    paddingLeft: Utils.scale(70, Const.Horizontal),
  },

  phone: {
    flexDirection: 'row',
    marginTop: Utils.scale(30, Const.Vertical),
    alignItems: 'center',
    fontSize: Utils.scale(30, Const.Horizontal),
    paddingLeft: Utils.scale(70, Const.Horizontal),
    textDecorationLine: 'underline',
    textDecorationColor: 'black',

  },

  email: {
    flexDirection: 'row',
    marginTop: Utils.scale(20, Const.Vertical),
    alignItems: 'center',
    fontSize: Utils.scale(30, Const.Horizontal),
    paddingLeft: Utils.scale(100, Const.Horizontal)
  },
  otpText: {
    flexDirection: 'row',
    marginTop: Utils.scale(30, Const.Vertical),
    alignItems: 'center',
    fontSize: Utils.scale(30, Const.Horizontal),
    paddingLeft: Utils.scale(30, Const.Horizontal)
  },

  otpTextInput: {
    backgroundColor: 'white',
    marginLeft: Utils.scale(5, Const.Horizontal),
    height: Utils.scale(40, Const.Vertical),
    width: Utils.scale(170, Const.Horizontal),
    borderColor: 'gray', borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },

  btnSubmit: {
    flexDirection: 'row',
    marginTop: Utils.scale(30, Const.Vertical),
    alignItems: 'center',
    fontSize: Utils.scale(30, Const.Horizontal),
    paddingLeft: Utils.scale(240, Const.Horizontal),
  }

});
export const voucher = StyleSheet.create({
  main: {
    backgroundColor: `rgba(251, 184, 151, 1)`,
  },

  mainContainer: {
    backgroundColor: `rgba(240, 243, 247, 1)`,
    borderRadius: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  container: {},
  overlay: {
    backgroundColor: `rgba(251, 184, 151, 1)`,
  },
  avatarStyle: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
    alignSelf: 'center',
  },
  textStyle: {
    marginVertical: 20,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  balanceContainer: {
    padding: 10,
  },
  cardHeader: {
    marginBottom: 0,
    backgroundColor: `rgba(0, 0, 0, 0.03)`,
  },
  card: {
    position: 'relative',
    display: 'flex',
    backgroundColor: `rgba(255, 255, 255, 1)`,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 20,
  },

  textSuccess: {
    color: '#28a745',
    textAlign: 'right'
  },
  textDanger: {
    color: '#dc3545',
    textAlign: 'right'
  },
});
export const voucherDetail = StyleSheet.create({
  main: {
    backgroundColor: `rgba(251, 184, 151, 1)`,
  },

  mainContainer: {
    backgroundColor: `rgba(240, 243, 247, 1)`,
    borderRadius: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  container: {},
  overlay: {
    backgroundColor: `rgba(251, 184, 151, 1)`,
  },
  avatarStyle: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
    alignSelf: 'center',
  },
  textContent: {
    marginVertical: 20,
    fontSize: 18,
    alignSelf: 'center',
  },
  balanceContainer: {
    padding: 10,
  },
  cardHeader: {
    marginBottom: 0,
    backgroundColor: `rgba(0, 0, 0, 0.03)`,
  },
  card: {
    position: 'relative',
    display: 'flex',
    backgroundColor: `rgba(255, 255, 255, 1)`,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 20,
  },

  textSuccess: {
    color: '#28a745',
    textAlign: 'right'
  },
  textDanger: {
    color: '#dc3545',
    textAlign: 'right'
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    alignContent: 'center',
  }
});


export const account = StyleSheet.create({

});

export const noti = StyleSheet.create({
  header: {
    fontSize: Utils.scale(30, Const.Horizontal),
    marginTop: Utils.scale(10, Const.Vertical),
    marginLeft: Utils.scale(10, Const.Vertical),
    fontWeight: 'bold'
  },
  headerText: {
    fontSize: Utils.scale(20, Const.Horizontal),
    marginTop: Utils.scale(20, Const.Vertical),
    marginLeft: Utils.scale(10, Const.Vertical),
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  Article: {
    paddingVertical: scale(20, Vertical),
    paddingLeft: scale(5, Horizontal),
  },
  ArticleContent: {
    marginLeft: Utils.scale(20, Const.Vertical),
    fontSize: 17,
    width: scale(300, Const.Horizontal)
  },
  flexRow: {
    flexDirection: 'row',
  },
  ArticleAvatar: {
    height: scale(60, Vertical),
    width: scale(60, Vertical),
    borderRadius: 50,
    marginLeft: scale(10, Horizontal)
  },

  ArticleTime: { fontFamily: 'SanFranciscoText-Regular' },

});
export const message = StyleSheet.create({
  time: {
    textAlign: 'right'
  }
});