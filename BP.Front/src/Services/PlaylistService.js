import axios from 'axios';
import config from '../config.json';
import LoginService from './LoginService';

class PlaylistService {
    constructor() {
        this.apiUrl = `${config.apiUrl}/playlist`;
        this.axiosInstance = axios.create({
            baseURL: this.apiUrl
        });
    }

    get(request) {
        return this.axiosInstance.get(request, LoginService.getAuthorizationHeader());
    }

    getConnectedUserPlaylists(pageNumber, pageSize) {
        return this.get(`/getplaylists?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    getPlaylistTracks(playlistId, pageNumber, pageSize) {
        return this.get(`/${playlistId}/gettracks?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    getPlaylist(playlistId) {
        return this.get(`/${playlistId}`);
    }
}

export default new PlaylistService();
