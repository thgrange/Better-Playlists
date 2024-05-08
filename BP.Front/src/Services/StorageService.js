import { v4 as uuidv4 } from "uuid";
import RequestService from "./RequestService";

class StorageService {
	logout(callback) {
		localStorage.removeItem("spotifyAccessToken");
		localStorage.removeItem("spotifyRefreshToken");
		localStorage.removeItem("spotifyAccessTokenExpiration");
		if (callback) {
			callback();
		}
	}

	storeTokens(tokens) {
		this.setToken(tokens.access_token);
		this.setRefreshToken(tokens.refresh_token);
		var expirationDate = new Date();
		expirationDate.setSeconds(
			expirationDate.getSeconds() + Number(tokens.expires_in)
		);
		this.setTokenExpiration(expirationDate);
	}

	setToken(spotifyAccessToken) {
		localStorage.setItem("spotifyAccessToken", spotifyAccessToken);
	}

	setRefreshToken(refreshToken) {
		localStorage.setItem("spotifyRefreshToken", refreshToken);
	}

	getRefreshToken() {
		return localStorage.getItem("spotifyRefreshToken");
	}

	getToken() {
		if (!this.isTokenStillGood()) {
			RequestService.getRefreshedToken();
		}
		return localStorage.getItem("spotifyAccessToken");
	}

	setTokenExpiration(expirationDate) {
		localStorage.setItem("spotifyAccessTokenExpiration", expirationDate);
	}

	getTokenExpiration() {
		return localStorage.getItem("spotifyAccessTokenExpiration");
	}

	isTokenStillGood() {
		const tokenExpiration = new Date(this.getTokenExpiration());
		const currentDate = new Date();
		if (tokenExpiration > currentDate) {
			return true;
		}
		return false;
	}

	isLogged() {
		const token = this.getToken();
		if (token !== null && token !== "") {
			if (this.isTokenStillGood()) {
				return true;
			}
		}
		return false;
	}

	getAuthorizationHeader() {
		return {
			headers: {
				Authorization: `Bearer ${this.getToken()}`,
			},
		};
	}

	setVerifState() {
		const state = uuidv4();
		localStorage.setItem("verifState", state);
		return state;
	}

	verifState(recievedState) {
		const storageState = localStorage.getItem("verifState");
		if (recievedState !== storageState) {
			localStorage.clear();
			return false;
		}
		localStorage.removeItem("verifState");
		return true;
	}
}

export default new StorageService();
