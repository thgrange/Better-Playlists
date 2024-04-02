import React, { useEffect, useRef, useState } from "react";
import PlaylistService from "../Services/PlaylistService";
import PlaylistItem from "../Components/PlaylistItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import Resizer from "../Components/Resizer";
import PlaylistDisplay from "../Components/PlaylistDisplay";

const HomePage = () => {
	const [selectedPlaylist, setSelectedPlaylist] = useState(undefined);
	const pageSize = 10;
	const [page, setPage] = useState(undefined);

	const fetchPlaylists = async ({ pageParam = 0 }) => {
		const res = await PlaylistService.getConnectedUserPlaylists(
			pageParam,
			pageSize
		);
		return res.data;
	};

	const {
		isLoading,
		isError,
		error,
		data,
		fetchNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["playlists"],
		queryFn: fetchPlaylists,
		getNextPageParam: (lastPage, pages) => {
			if (!lastPage.hasMore) {
				return undefined;
			}
			return lastPage.pageNumber + 1;
		},
	});

	function onScroll() {
		const container = document.getElementById("playlist-scroller");
		const scrollY = container.scrollTop;
		const windowHeight = window.innerHeight;
		const documentHeight = container.scrollHeight;
		if (scrollY + windowHeight >= documentHeight - 100) {
			fetchNextPage();
		}
	}

	useEffect(() => {
		const container = document.getElementById("playlist-scroller");
		container.addEventListener("scroll", onScroll);
		return () => {
			container.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<div
			className="d-flex h-100"
			id="main-page"
		>
			<Resizer parentId="main-page">
				<div
					id="playlist-scroller"
					style={{
						overflowX: "hidden",
						minWidth: "20%",
						maxWidth: "50%",
					}}
					className="align-content-center bg-dark overflow-y-scroll truncated-items playlist-display d-flex flex-column rounded-2"
				>
					{data &&
						data.pages.map((page) =>
							page.items.map((p) => (
								<PlaylistItem
									selected={selectedPlaylist === p.id}
									key={p.id}
									playlist={p}
									onClick={() => {
										setSelectedPlaylist(p.id);
										setPage(<PlaylistDisplay key={p.id} playlistId={p.id}></PlaylistDisplay>)
									}}
								/>
							))
						)}
					{isFetching && (
						<div
							className="position-relative"
							style={{ marginBottom: "75px" }}
						>
							<span className="loader position-absolute start-50 translate-middle"></span>
						</div>
					)}
				</div>
			</Resizer>
			{page}
		</div>
	);
};

export default HomePage;
