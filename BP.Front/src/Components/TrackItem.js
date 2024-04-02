import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageService from "../Services/ImageService";
import BPblackwhiteicon from "../Content/BPblackwhiteicon.png";

const TrackItem = ({ track = null }) => {
	function getTrackPic(hw) {
		if (track?.album) {
			const image = ImageService.getBiggestImage(track?.album.images);
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
			className={`align-content-center bg-dark mx-2 rounded-3 d-flex p-2 pe-0 track-item`}
			onDoubleClick={() => {
				console.log("play");
			}}
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
				{getTrackPic()}
			</div>
			<div className="d-flex flex-column truncated-title ms-2 my-auto">
				<span className="h6 text-secondary truncated-title">
					{track.name}
				</span>
				<span
					style={{ fontSize: 15 }}
					className="me-3 text-light truncated-title artists"
				>
					{track.artists &&
						track.artists.map((a, i) => (
							<>
								{i > 1 && ", "}
								<a key={a.id} href={a.external_urls?.spotify}>{a.name}</a>
							</>
						))}
				</span>
			</div>
		</div>
	);
};

export default TrackItem;
