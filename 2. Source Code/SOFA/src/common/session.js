export default class Session {
    static _instance;

    token = '';
    account = {};
    currentUserChat = 0;

    static getInstance() {
        if (Session._instance == null) {
            Session._instance = new Session();
        }
        return this._instance;
    }

    constructor() {
        this.token = '';
        this.account = {};
        this.currentUserChat = 0;
    }
}