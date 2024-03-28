import React, { useEffect, useRef, useState } from "react";
import PlaylistService from "../Services/PlaylistService";
import PlaylistItem from "../Components/PlaylistItem";
import { useInfiniteQuery } from "react-query";

const PlaylistsPage = () => {
	const pageSize = 10;

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
		if (scrollY + windowHeight >= documentHeight - 100) {
			fetchNextPage();
		}
	}
// Permettre le nettoyage de la donnée pour éviter une surcharge de la page
	// useEffect(() => {
	// 	if (data && data.pages.length > 3) {
	// 		console.log("cut");
	// 		window.queryClient.setQueryData(["playlists"], (data) => ({
	// 			pages: data.pages.slice(1),
	// 			pageParams: data.pageParams.slice(1),
	// 		}));
	// 	}
	// }, [data]);

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
