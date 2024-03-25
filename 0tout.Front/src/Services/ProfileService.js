import axios from 'axios';
import config from '../config.json';
import LoginService from './LoginService';

class ProfileService {
    constructor() {
        this.apiUrl = `${config.apiUrl}/profile`;
        this.axiosInstance = axios.create({
            baseURL: this.apiUrl
        });
    }

    get(request) {
        return this.axiosInstance.get(request, LoginService.getAuthorizationHeader());
    }

    getConnectedUser() {
        return this.get(`/getprofile`);
    }
}

export default new ProfileService();
