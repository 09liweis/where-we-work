export default class Api {
    constructor() {
        this.base = '/controllers/';
        this.login = 'user.php?action=login';
        this.register = 'user.php?action=register';
        this.session = 'user.php?action=checkSession';
        this.logout = 'user.php?action=logout';
        this.savePlace = 'place.php?action=savePlace';
        this.userPlace = 'user.php?action=userPlace';
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
    getSavePlace() {
        return this.base + this.savePlace;
    }
    getUserPlace() {
        return this.base + this.userPlace;
    }
    getLogout() {
        return this.base + this.logout;
    }
}