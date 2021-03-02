export default class PostViewModel {
    constructor(data = {}) {
        let _iD = data.iD;
        let _content = data.content;
        let _privacyID = data.privacyID;
        let _time = this.calculateTime(data.time);
        let _accountPost = data.accountPost;
        let _firstName = data.firstName;
        let _lastName = data.lastName;
        let _avatar = data.avatar;
        let _gender = data.gender;
        let _listImage = data.listImage;
        let _listLike = data.listLike;
        let _listComment = data.listComment;
        let _listRate = data.listRate;
        let _numberOfLike = data.numberOfLike;
        let _numberOfComment = data.numberOfComment;
        let _rateAverage = data.rateAverage;

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
        if (dif > 1) {
            let temp = dif + ' Phút trước';
            res.push(temp);
            dif = parseInt(dif / 60, 10);
        }
        if (dif > 1) {
            let temp = dif + ' Giờ trước';
            res.push(temp);
            dif = parseInt(dif / 24, 10)
        }
        if (dif > 1) {
            let temp = dif + ' Ngày trước';
            res.push(temp);
            dif = parseInt(dif / 30, 10)
        }
        if (dif > 1) {
            let temp = dif + ' Tháng trước';
            res.push(temp);
            dif = parseInt(dif / 12, 10)
        }
        if (!dif < 0) {
            let temp = dif + ' Năm trước';
            res.push(temp);
        }
        return res[res.length - 1];
    }
}