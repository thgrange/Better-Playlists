import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageService from "../Services/ImageService";
import BPblackwhiteicon from "../Content/BPblackwhiteicon.png";

const PlaylistItem = ({ playlist = null }) => {
	function getAlbumPic(hw) {
		if (playlist != null) {
			const image = ImageService.getBiggestImage(playlist.images);
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
			<img
				style={{ height: hw, width: hw, backgroundColor: "#191919" }}
				src={BPblackwhiteicon}
				alt="Album cover"
			/>
		);
	}

	return (
		<div className="align-content-center bg-dark m-3 rounded-3 row">
			<div
				style={{
					width: "130px",
				}}
			>
				<div
					className="border-4 overflow-hidden"
					style={{
						height: "120px",
						width: "120px",
						borderColor: "#191919",
						border: "solid",
						padding: 0,
					}}
				>
					{getAlbumPic("120px")}
				</div>
			</div>
			<div className="col-sm">
				<div className="d-flex justify-content-between m-2">
					<span className="h5 text-light fw-bold">
						{playlist.name}
					</span>
					<span
						style={{ fontSize: 15 }}
						className="text-light"
					>
						{playlist.tracks.total} titre
						{playlist.tracks.total > 1 ? "s" : ""}
					</span>
				</div>
				<div className="d-flex flex-column my-auto m-2">
					<span
						style={{ fontSize: 15 }}
						className="me-3 text-light"
						dangerouslySetInnerHTML={{
							__html: playlist.description,
						}}
					></span>
				</div>
			</div>
		</div>
	);
};

export default PlaylistItem;
