import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageService from "../Services/ImageService";

const ProfilePreview = ({ profile = null }) => {
	function getProfilePic(hw) {
		if (profile != null) {
			const image = ImageService.getBiggestImage(profile.images);
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
			<FontAwesomeIcon
				className="fa-solid m-auto d-block w-100 h-100"
				icon="fa-user-alt"
			/>
		);
	}

	function getProfileUrl() {
		if (
			profile.external_urls != null &&
			profile.external_urls.spotify != null
		) {
			return (
				<a
					className="link-secondary ms-3"
					href={profile.external_urls.spotify}
				>
					<FontAwesomeIcon
						className="fa-solid"
						icon="fa-link"
					/>
				</a>
			);
		}
		return;
	}

	return (
		<div className="m-auto d-flex flex-column">
			{profile != null && profile.images != null && (
				<div>
					<div
						className="rounded-circle border border-4 border-primary overflow-hidden"
						style={{
							height: "180px",
							width: "180px",
						}}
					>
						{getProfilePic("180px")}
					</div>
				</div>
			)}
			<p className="text-secondary h3 m-auto mt-3">
				{profile.display_name}
				{getProfileUrl()}
			</p>
		</div>
	);
};

export default ProfilePreview;
