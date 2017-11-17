export default class Api {
    constructor() {
        this.base = '/admin/controllers/';
        this.login = 'user.php?action=login';
        this.register = 'user.php?action=register';
    }
    login() {
        return this.base + this.login;
    }
    register() {
        return this.base + this.register;
    }
}