import { Navbar } from "react-bootstrap";
import SpotifyPlayer from "./SpotifyPlayer";

const Footer = () => {
	return (
		<div
			className="bg-dark container vw-100 mw-100"
			style={{
				height: "120px",
				sticky: "bottom",
			}}
		>
			<SpotifyPlayer />
		</div>
	);
};

export default Footer;
