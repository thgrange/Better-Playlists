import axios from "axios";
import config from "../config.json";
import queryString from "query-string";
import StorageService from "./StorageService";

class RequestService {
	getSpotifyLoginUrl() {
		const scope =
			"ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private";
		const connectUrl =
			"https://accounts.spotify.com/authorize?" +
			queryString.stringify({
				response_type: "code",
				redirect_uri: config.redirectUrl,
				scope: scope,
				state: StorageService.setVerifState(),
				client_id: config.clientId,
			});
		return connectUrl;
	}

	getTokens(code, callback = null) {
        axios.post(`${config.apiUrl}/token/gettokens`, {
            code: code,
            redirectUri: config.redirectUrl
        }).then(res => {
			if (res.error) {
				if (callback) {
					callback();
				}
			} else {
				StorageService.storeTokens(res.data);
				if (callback) {
					callback();
				}
			}
        });
	}

	getRefreshedToken(callback = null) {
		axios.post(`${config.apiUrl}/token/getrefreshedtoken`, {
            refreshToken: StorageService.getRefreshToken(),
            redirectUri: config.redirectUrl
        }).then(res => {
			if (res.error) {
				if (callback) {
					callback();
				}
			} else {
				StorageService.storeTokens(res.data);
				if (callback) {
					callback();
				}
			}
        });
	}

	request() {
		const client = axios.create({
			baseURL: config.apiUrl,
		});
	}
}

export default new RequestService();
