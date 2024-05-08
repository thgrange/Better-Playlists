import axios from "axios";
import config from "../config.json";
import StorageService from "./StorageService";

class PlayerService {
	constructor() {
		this.apiUrl = `${config.apiUrl}/player`;
		this.axiosInstance = axios.create({
			baseURL: this.apiUrl,
		});
	}

	get(request) {
		return this.axiosInstance.get(
			request,
			StorageService.getAuthorizationHeader()
		);
	}

	getPlayerConnection(deviceId, play) {
		return this.get(
			`/getplayerconnection?deviceId=${deviceId}&play=${play}`
		);
	}
}

export default new PlayerService();
