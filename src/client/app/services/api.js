export default class Api {
    constructor() {
        this.base = '/controllers/';
        this.login = 'user.php?action=login';
        this.register = 'user.php?action=register';
        this.session = 'user.php?action=checkSession';
    }
    getLogin() {
        return this.base + this.login;
    }
    getRegister() {
        return this.base + this.register;
    }
    checkSession() {
        return this.base + this.session;
    }
}