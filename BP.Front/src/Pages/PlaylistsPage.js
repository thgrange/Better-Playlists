import React, { useEffect, useRef, useState } from "react";
import PlaylistService from "../Services/PlaylistService";
import PlaylistItem from "../Components/PlaylistItem";
import { useInfiniteQuery } from "react-query";

const PlaylistsPage = () => {
	const [playlists, setPlaylists] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [doneLoading, setDoneLoading] = useState(false);
	const [requestOnTheWay, setRequestOnTheWay] = useState(false);
	const pageSize = 30;

	const fetchPlaylists = async ({ pageParam = 0 }) => {
		const res = await PlaylistService.getConnectedUserPlaylists(pageParam, pageSize);
		return res.data;
	}

	const {
		isLoading,
		isError,
		error,
		data,
		fetchNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery(["playlists"], fetchPlaylists, {
		getNextPageParam: (lastPage, pages) => {
			if (!lastPage.hasMore) {
				return undefined;
			}
			return lastPage.pageNumber + 1;
		},
	});


	function onScroll() {
		const container = document.getElementById("bp-page");
		const scrollY = container.scrollTop;
		const windowHeight = window.innerHeight;
		const documentHeight = container.scrollHeight;
		if (scrollY + windowHeight >= documentHeight - 100 && !doneLoading && !requestOnTheWay) {
			fetchNextPage();
		}
	}

	useEffect(() => {
		const container = document.getElementById("bp-page");

		container.addEventListener("scroll", onScroll);
		return () => {
			container.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<div className="d-flex container-fluid flex-column">
			<div className="align-content-center">
				{data &&
					data.pages.map((page) =>
						page.items.map((p) => (
							<PlaylistItem
								key={p.id}
								playlist={p}
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
		</div>
	);
};

export default PlaylistsPage;
