import { useEffect, useState } from "react";
import LoginService from "../Services/LoginService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageService from "../Services/ImageService";

const SpotifyPlayer = () => {
	const [player, setPlayer] = useState(undefined);
	const [isPaused, setPaused] = useState(false);
	const [isActive, setActive] = useState(false);
	function getAlbumPic(hw, track) {
		if (track != null && track.album != null) {
			console.log("text");
			const image = ImageService.getBiggestImage(track.album.images);
			if (image != null) {
				return (
					<img
						className="h-100 w-100"
						style={{ height: hw, width: hw }}
						src={image.url}
						alt="BP logo"
					></img>
				);
			}
		}
		return (
			<FontAwesomeIcon
				style={{ backgroundColor: "#191919" }}
				className="w-100 h-100 text-light"
				icon="fa-music"
			/>
		);
	}
	const track = {
		name: "",
		artists: [{ name: "" }],
	};
	const [current_track, setTrack] = useState(track);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: "Better Playlists",
				getOAuthToken: (cb) => {
					cb(LoginService.getToken());
				},
				volume: 0.5,
			});

			setPlayer(player);

			player.addListener("ready", ({ device_id }) => {
				console.log("Ready with Device ID", device_id);
			});

			player.addListener("not_ready", ({ device_id }) => {
				console.log("Device ID has gone offline", device_id);
			});

			player.addListener("player_state_changed", (state) => {
				if (!state) {
					return;
				}

				setTrack(state.track_window.current_track);
				setPaused(state.paused);

				player.getCurrentState().then((state) => {
					!state ? setActive(false) : setActive(true);
				});
			});

			player.connect();
			player.activateElement();
		};

		window.addEventListener("beforeunload", disconnectSpotify);
	}, []);

	function disconnectSpotify() {
		player.disconnect();
	}

	return (
		<>
			<div
				className="border-4 ms-2"
				style={{
					height: "100px",
					width: "100px",
					borderColor: "#191919",
					padding: 0,
				}}
			>
				{getAlbumPic("100px", current_track)}
				<div className="now-playing__side">
					<div className="now-playing__name">
						{current_track.name}
					</div>

					<div className="now-playing__artist">
						{current_track.artists[0].name}
					</div>
				</div>
			</div>
			<div>
				<button
					className="btn text-light"
					onClick={() => {
						player.previousTrack();
					}}
				>
					<FontAwesomeIcon className="fa-2x" icon="fa-backward-step" />
				</button>

				<button
					onClick={() => {
						player.togglePlay();
					}}
					className="btn text-bg-light text-dark btn-border-0 text mx-3"
				>
					{isPaused ? (
						<FontAwesomeIcon className="fa-2x" icon="play" />
					) : (
						<FontAwesomeIcon className="fa-2x" icon="pause" />
					)}
				</button>

				<button
					className="btn text-light"
					onClick={() => {
						player.nextTrack();
					}}
				>
					<FontAwesomeIcon className="fa-2x" icon="fa-solid fa-forward-step" />
				</button>
			</div>
			<div></div>
		</>
	);
};

export default SpotifyPlayer;
