import { useEffect, useState } from "react";
import LoginService from "../Services/LoginService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageService from "../Services/ImageService";
import SpotifySlider from "./SpotifySlider";
import PlayerService from "../Services/PlayerService";

const SpotifyPlayer = () => {
	const [player, setPlayer] = useState(null);
	const [paused, setPaused] = useState(true);
	const [isActive, setActive] = useState(false);
	const [deviceId, setDeviceId] = useState(null);
	const [displayVolume, setDisplayVolume] = useState(0.2);
	const [volume, setVolume] = useState(0.2);
	const [muted, setMuted] = useState(false);
	const [position, setPosition] = useState(0);
	const [duration, setDuration] = useState(1);
	const [positionInterval, setPositionInterval] = useState(0);
	const nullTrack = {
		name: "",
		artists: [{ name: "" }],
	};
	const [currentTrack, setCurrentTrack] = useState(null);

	function getAlbumPic(hw, track) {
		if (track != null && track.album != null) {
			const image = ImageService.getBiggestImage(track.album.images);
			if (image != null) {
				return (
					<img
						style={{ height: hw, width: hw }}
						src={image.url}
						alt="BP logo"
					></img>
				);
			}
		}
		return (
			<FontAwesomeIcon
				style={{ backgroundColor: "#191919", height: hw, width: hw }}
				className="text-light"
				icon="fa-music"
			/>
		);
	}

	function msToTime(ms) {
		if (ms === null || ms === undefined) {
			return "--:--";
		}
		var seconds = Math.floor((ms / 1000) % 60),
			minutes = Math.floor((ms / (1000 * 60)) % 60),
			hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
		if (hours > 0) {
			minutes = minutes < 10 ? "0" + minutes : minutes;
		}
		seconds = seconds < 10 ? "0" + seconds : seconds;

		return `${hours > 0 ? `${hours}:` : ""}${minutes}:${seconds}`;
	}

	function disconnectSpotify() {
		if (player !== null) {
			player.disconnect();
		}
	}

	function setPlayerVolume(inputVolume) {
		if (inputVolume > 0) {
			setMuted(false);
		}
		player.setVolume(inputVolume);
		setDisplayVolume(inputVolume);
		setVolume(inputVolume);
	}

	function setCurrentState(state) {
		if (!state) {
			return;
		}
		setCurrentTrack(state.track_window.current_track);
		setPosition(state.position);
		setDuration(state.duration);
		setPaused(state.paused);
	}

	function muteUnmutePlayer() {
		if (muted) {
			setDisplayVolume(volume);
			setMuted(false);
			player.setVolume(volume);
		} else {
			setDisplayVolume(0);
			setMuted(true);
			player.setVolume(0);
		}
	}

	function initializePlayer() {
		const spotifyPlayer = new window.Spotify.Player({
			name: "Better Playlists",
			getOAuthToken: (cb) => {
				cb(LoginService.getToken());
			},
			volume: 0.2,
		});

		spotifyPlayer.addListener("autoplay_failed", () => {
			console.log(
				"Autoplay is not allowed by the browser autoplay rules"
			);
		});

		spotifyPlayer.addListener("ready", ({ device_id }) => {
			setDeviceId(device_id);
			setActive(true);
		});

		spotifyPlayer.addListener("not_ready", ({ device_id }) => {
			setActive(false);
		});

		spotifyPlayer.addListener("player_state_changed", (state) => {
			setCurrentState(state);
			spotifyPlayer.getCurrentState().then((state) => {
				!state ? setActive(false) : setActive(true);
			});
		});
		spotifyPlayer.connect();

		setPlayer(spotifyPlayer);
	}

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = initializePlayer;

		window.addEventListener("beforeunload", disconnectSpotify);
	}, []);

	useEffect(() => {
		if (paused && positionInterval !== 0) {
			clearInterval(positionInterval);
			setPositionInterval(0);
		} else if (!paused && positionInterval === 0) {
			const interval = setInterval(() => {
				if (player !== null) {
					player.getCurrentState().then((state) => {
						setPosition(state.position);
					});
				}
			}, 1000);
			setPositionInterval(interval);
		}
	}, [paused]);

	useEffect(() => {
		if (deviceId !== null) {
			PlayerService.getPlayerConnection(deviceId, false);
		}
	}, [deviceId])

	return (
		<div className="row h-100">
			<div
				className="border-4 ms-2 col d-flex align-items-center"
				style={{
					borderColor: "#191919",
					padding: 0,
				}}
			>
				{getAlbumPic("100px", currentTrack)}
				<div className="d-flex flex-column ms-3">
					{currentTrack !== null &&
						currentTrack.artists !== null &&
						currentTrack.artists.length > 0 && (
							<>
								<span className="text-secondary">
									{currentTrack.name}
								</span>
								<span className="text-light">
									{currentTrack.artists[0].name}
								</span>
							</>
						)}
				</div>
			</div>
			<div className="col-5 d-flex flex-column my-auto">
				<div className="d-flex justify-content-center mb-2">
					<button
						className="btn text-light spotify-btn"
						onClick={() => {
							player.previousTrack();
						}}
					>
						<FontAwesomeIcon
							className="fa-2x"
							icon="fa-backward-step"
						/>
					</button>

					<button
						onClick={() => {
							player.togglePlay();
							// setPaused(!paused);
						}}
						className="btn text-bg-light text-dark btn-border-0 text mx-3 spotify-play-btn"
					>
						{paused ? (
							<FontAwesomeIcon
								className="fa-2x"
								icon="play"
							/>
						) : (
							<FontAwesomeIcon
								className="fa-2x"
								icon="pause"
							/>
						)}
					</button>

					<button
						className="btn text-light spotify-btn"
						onClick={() => {
							player.nextTrack();
						}}
					>
						<FontAwesomeIcon
							className="fa-2x"
							icon="fa-solid fa-forward-step"
						/>
					</button>
				</div>
				<div className="row align-items-center">
					<span
						className="text-light"
						style={{
							width: "53px",
						}}
					>
						{msToTime(
							currentTrack === null || currentTrack === undefined
								? null
								: position
						)}
					</span>
					<SpotifySlider
						value={position}
						step={100}
						max={duration}
						className="col"
						style={{
							padding: 0,
						}}
						disabled={
							currentTrack === null || currentTrack === undefined
						}
						onChange={(event) => {
							player.seek(event.target.valueAsNumber);
						}}
					/>
					<span
						className="text-light"
						style={{
							width: "53px",
						}}
					>
						{msToTime(
							currentTrack === null || currentTrack === undefined
								? null
								: duration
						)}
					</span>
				</div>
			</div>
			<div className="pe-3 d-flex justify-content-end col">
				<button
					className="btn text-light spotify-btn my-auto"
					onClick={muteUnmutePlayer}
					style={{
						width: "50px",
					}}
				>
					{((muted || volume === 0) && (
						<FontAwesomeIcon
							className="fa-lg"
							icon="fa-solid fa-volume-xmark"
						/>
					)) ||
						(volume < 0.2 && (
							<FontAwesomeIcon
								className="fa-lg"
								icon="fa-solid fa-volume-off"
							/>
						)) ||
						(volume < 0.5 && (
							<FontAwesomeIcon
								className="fa-lg"
								icon="fa-solid fa-volume-low"
							/>
						)) || (
							<FontAwesomeIcon
								className="fa-lg"
								icon="fa-solid fa-volume-high"
							/>
						)}
				</button>
				<SpotifySlider
					value={displayVolume}
					step={0.02}
					className="my-auto"
					onChange={(event) => {
						setPlayerVolume(event.target.valueAsNumber);
					}}
				></SpotifySlider>
			</div>
		</div>
	);
};

export default SpotifyPlayer;
