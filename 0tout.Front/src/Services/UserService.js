import axios from 'axios';
import config from '../config.json';

class UserService {
    constructor() {
        this.apiUrl = config.apiUrl;
        this.axiosInstance = axios.create({
            headers: {
              Authorization : `Bearer ${localStorage.getItem("zeroToken")}`
              }
            });
    }

    getConnecteduser() {
        return this.axiosInstance.get(`/user/connectedUser`);
    }
}

export default new UserService();
