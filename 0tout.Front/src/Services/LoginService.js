import { wait } from "@testing-library/user-event/dist/utils";

class LoginService {
	getSpotifyLoginUrl() {
		const scope =
			"ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private";
		const connectUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
			"3a2dbd4bf78b44678da1bf3daccd03a7"
		)}&redirect_uri=${encodeURIComponent(
			"http://localhost:3000/login"
		)}&scope=${encodeURIComponent(scope)}`;
		return connectUrl;
	}

	login(spotifyAccessToken, expiresIn, callback) {
		if (spotifyAccessToken !== null && spotifyAccessToken !== "") {
			this.setToken(spotifyAccessToken);
			var expirationDate = new Date();
			expirationDate.setSeconds(
				expirationDate.getSeconds() + Number(expiresIn)
			);
			this.setTokenExpiration(expirationDate);
		}
		wait(1).then(() => {
			if (callback) {
				callback();
			}
		});
	}

	logout(callback) {
		localStorage.removeItem("spotifyAccessToken");
		if (callback) {
			callback();
		}
	}

	setToken(spotifyAccessToken) {
		localStorage.setItem("spotifyAccessToken", spotifyAccessToken);
	}

	getToken() {
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
}

export default new LoginService();
