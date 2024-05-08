import axios from 'axios';
import config from '../config.json';
import StorageService from './StorageService';

class ProfileService {
    constructor() {
        this.apiUrl = `${config.apiUrl}/profile`;
        this.axiosInstance = axios.create({
            baseURL: this.apiUrl
        });
    }

    get(request) {
        return this.axiosInstance.get(request, StorageService.getAuthorizationHeader());
    }

    getConnectedUser() {
        return this.get(`/getprofile`);
    }
}

export default new ProfileService();
