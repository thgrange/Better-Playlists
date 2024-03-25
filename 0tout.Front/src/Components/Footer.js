import { Navbar } from "react-bootstrap";
import SpotifyPlayer from "./SpotifyPlayer";

const Footer = () => {
	return (
		<Navbar
			className="bg-dark justify-content-between"
			style={{
				height: "120px",
			}}
			sticky="bottom"
		>
			<SpotifyPlayer></SpotifyPlayer>
		</Navbar>
	);
};

export default Footer;
