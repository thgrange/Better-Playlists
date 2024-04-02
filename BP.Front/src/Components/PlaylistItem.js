import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisplayService from "../Services/DisplayService";
import BPblackwhiteicon from "../Content/BPblackwhiteicon.png";

const PlaylistItem = ({ playlist = null, selected = false, onClick = null }) => {
	function getAlbumPic(hw) {
		if (playlist != null) {
			const image = DisplayService.getBiggestImage(playlist.images);
			if (image != null) {
				return (
					<img
						className="h-100 w-100"
						src={image.url}
						alt="BP logo"
					></img>
				);
			}
		}
		return (
			<img
			className="h-100 w-100"
				style={{ backgroundColor: "#191919" }}
				src={BPblackwhiteicon}
				alt="Album cover"
			/>
		);
	}

	return (
		<div
			className={`align-content-center bg-dark mx-2 rounded-3 d-flex p-2 pe-0 playlist-item ${selected ? "selected" : ""}`}
			onClick={onClick}
		>
			<div
				style={{
					height: "60px",
					width: "60px",
					padding: 0,
					flexShrink: 0,
					flexGrow: 0,
					flexBasis: "60px",
				}}
			>
				{getAlbumPic()}
			</div>
			<div className="d-flex flex-column truncated-title ms-2 my-auto">
				<span className="h6 text-secondary truncated-title">
					{playlist.name}
				</span>
				<span
					style={{ fontSize: 15 }}
					className="me-3 text-light truncated-title"
				>
					{playlist.type} • {playlist.owner.display_name}
				</span>
			</div>
		</div>
	);
};

export default PlaylistItem;
