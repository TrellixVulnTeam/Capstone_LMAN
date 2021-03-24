export default class NotificationViewModel {
    constructor(data = {}) {
        let _id = 0;
        let _typeNotification = 0;
        let _typeAction = 0;
        let _isRead = false;
        let _postId = 0;
        let _content = '';
        let _fromAccount = 0;
        let _toAccount = 0;

        if (data){
            _id = data.id;
            _typeNotification = data.typeNotification;
            _typeAction = data.typeAction;
            _isRead = data.isRead;
            _postId = data.postId;
            _content = data.content;
            _fromAccount = data.fromAccount;
            _toAccount = data.toAccount;
        }
        this.getId = () => _id;
        this.getTypeNotification = () => _typeNotification;
        this.getTypeAction = () => _typeAction;
        this.getIsRead = () => _isRead;
        this.getPostId = () => _postId;
        this.getContent = () => _content;
        this.getFromAccount = () => _fromAccount;
        this.getToAccount = () => _toAccount;

        this.setId = (id) => _id = id;
        this.setTypeNotification = (typeNotification) => _typeNotification = typeNotification;
        this.getTypeAction = (typeAction) => _typeAction = typeAction;
        this.getIsRead = (isRead) => _isRead = isRead;
        this.getPostId = (postId) => _postId = postId;
        this.getContent = (content) => _content = content;
        this.getFromAccount = (fromAccount) => _fromAccount = fromAccount;
        this.getToAccount = (toAccount) => _toAccount = toAccount;
    }
}