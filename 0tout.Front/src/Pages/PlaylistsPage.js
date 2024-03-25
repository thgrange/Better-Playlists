import React, { useEffect, useRef, useState } from "react";
import PlaylistService from "../Services/PlaylistService";
import PlaylistItem from "../Components/PlaylistItem";

const PlaylistsPage = () => {
	const [playlists, setPlaylists] = useState();
	const [pageNumber, setPageNumber] = useState(0);
	const pageSize = 15;
	const listInnerRef = useRef();

	useEffect(() => {
		PlaylistService.getConnectedUserPlaylists(pageNumber, pageSize).then(
			(response) => {
				if (response.status === 200) {
					if (response.data != null && response.data.items != null) {
						setPlaylists(response.data.items);
						setPageNumber(1);
					}
				}
			}
		);
	}, []);

	const onScroll = () => {
		if (listInnerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } =
				listInnerRef.current;
			if (scrollTop + clientHeight === scrollHeight) {
				PlaylistService.getConnectedUserPlaylists(
					pageNumber,
					pageSize
				).then((response) => {
					if (response.status === 200) {
						if (
							response.data != null &&
							response.data.items != null
						) {
							setPlaylists(...playlists, ...response.data.items);
							setPageNumber(pageNumber + 1);
						}
					}
				});
			}
		}
	};

	return (
		<div
			id="playlistpage"
			className="d-flex container-fluid flex-column"
		>
			<div
				className="align-content-center"
				onScroll={onScroll}
				ref={listInnerRef}
			>
				{playlists != null &&
					playlists.length > 0 &&
					playlists.map((p) => (
						<PlaylistItem
							key={p.id}
							playlist={p}
						/>
					))}
			</div>
		</div>
	);
};

export default PlaylistsPage;
