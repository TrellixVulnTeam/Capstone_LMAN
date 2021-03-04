export default class PostViewModel {
    constructor(data = {}) {
        let _iD = 0;
        let _content = '';
        let _privacyID = 0;
        let _time = '';
        let _accountPost = 0;
        let _firstName = '';
        let _lastName = '';
        let _avatar = '';
        let _gender = 0;
        let _listImage = [];
        let _listLike = [];
        let _listComment = [];
        let _listRate = [];
        let _numberOfLike = 0;
        let _numberOfComment = 0;
        let _rateAverage = 0;
        let _isLiked = false;
        let _myRatePoint = 0;
        if (data) {
            _iD = data.iD;
            _content = data.content;
            _privacyID = data.privacyID;
            _time = this.calculateTime(data.time);
            _accountPost = data.accountPost;
            _firstName = data.firstName;
            _lastName = data.lastName;
            _avatar = data.avatar;
            _gender = data.gender;
            _listImage = data.listImage;
            _listLike = data.listLike;
            _listComment = data.listComment;
            _listRate = data.listRate;
            _numberOfLike = data.numberOfLike;
            _numberOfComment = data.numberOfComment;
            _rateAverage = data.rateAverage;
            _isLiked = data.isLiked;
            _myRatePoint = data.myRatePoint;
        }
        this.getID = () => _iD;
        this.getContent = () => _content;
        this.getPrivacyID = () => _privacyID;
        this.getTime = () => _time;
        this.getAccountPost = () => _accountPost;
        this.getFirstName = () => _firstName;
        this.getLastName = () => _lastName;
        this.getAvatar = () => _avatar;
        this.getGender = () => _gender;
        this.getListImage = () => _listImage;
        this.getListLike = () => _listLike;
        this.getListComment = () => _listComment;
        this.getListRate = () => _listRate;
        this.getNumberOfLike = () => _numberOfLike;
        this.getNumberOfComment = () => _numberOfComment;
        this.getRateAverage = () => _rateAverage;
        this.IsLiked = () => _isLiked;
        this.getMyRatePoint = () => _myRatePoint;

        this.setID = (id) => _iD = id;
        this.setContent = (content) => _content = content;
        this.setPrivacyID = (privacyID) => _privacyID = privacyID;
        this.setTime = (time) => _time = this.calculateTime(time);
        this.setAccountPost = (accountPost) => _accountPost = accountPost;
        this.setFirstName = (firstname) => _firstName = firstname;
        this.setLastName = (lastname) => _lastName = lastname;
        this.setAvatar = (avatar) => _avatar = avatar;
        this.setGender = (gender) => _gender = gender;
        this.setListImage = (listImage) => _listImage = listImage;
        this.setListLike = (listLike) => _listLike = listLike;
        this.setListComment = (listComment) => _listComment = listComment;
        this.setListRate = (listRate) => _listRate = listRate;
        this.setNumberOfLike = (numberOfLike) => _numberOfLike = numberOfLike;
        this.setNumberOfComment = (numberOfComment) => _numberOfComment = numberOfComment;
        this.setRateAverage = (rateAverage) => _rateAverage = rateAverage;
        this.setLiked = (isLiked) => _isLiked = isLiked;
        this.setMyRatePoint = (myRatePoint) => _myRatePoint = myRatePoint;

    }
    calculateTime(time) {
        let currentTime = new Date();
        let postTime = new Date(time);
        // currentTime = currentTime.setHours(currentTime.getHours() - 7);
        let dif = currentTime - postTime;
        dif = dif / 1000;
        let res = ['Vừa xong'];
        if (dif > 1) {
            let temp = dif + ' Giây trước';
            res.push(temp);
            dif = parseInt(dif / 60, 10);
        }
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
}