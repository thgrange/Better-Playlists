import axios from 'axios';
import config from '../config.json';

class LoginService {
    constructor() {
        this.apiUrl = config.apiUrl;
    }

    login(email, password) {
        axios.post(`/login`, {
            email: email,
            password: password
        })
        .then(data => {
            console.log(data.data);
            localStorage.setItem("zeroToken", data.data);
        });
    }

    logout() {
        localStorage.removeItem("zeroToken");
    }

    getToken() {
        return localStorage.getItem("zeroToken");
    }
}

export default new LoginService();
