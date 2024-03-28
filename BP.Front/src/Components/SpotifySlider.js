import { Navbar } from "react-bootstrap";
import SpotifyPlayer from "./SpotifyPlayer";
import { useState } from "react";

const SpotifySlider = ({
	max = 1,
	min = 0,
	step = 0.1,
	value = 0,
	className = "",
	onChange,
	backgroundColor = "#4D4D4D",
	color = "white",
	hoverColor = "#25D865",
	disabled = false,
	style = {},
}) => {
	const [hover, setHover] = useState(false);
	return (
		<input
			type="range"
			max={max}
			min={min}
			step={step}
			value={value}
			disabled={disabled}
			className={"" + className}
			onChange={(event) => {
				onChange(event);
			}}
			style={{
				...style,
				background: `linear-gradient(to right, ${
					hover ? hoverColor : color
				} 0%, ${hover ? hoverColor : color} ${
					((disabled ? 0 : value) / max) * 100
				}%, ${backgroundColor} ${
					((disabled ? 0 : value) / max) * 100
				}%, ${backgroundColor} 100%)`,
			}}
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
		/>
	);
};

export default SpotifySlider;
