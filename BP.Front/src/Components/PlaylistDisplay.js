import { useInfiniteQuery } from "@tanstack/react-query";
import PlaylistService from "../Services/PlaylistService";
import TrackItem from "./TrackItem";
import { useEffect, useState } from "react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import PlaylistItem from "./PlaylistItem";
import DisplayService from "../Services/DisplayService";
import Moment from "react-moment";
import { Skeleton } from '@mui/material';

const PlaylistDisplay = ({ playlistId }) => {
	const pageSize = 30;
	const [firstLoading, setFirstLoading] = useState(true);
	const [selectedRows, setSelectedRows] = useState([]);

	const fetchPlaylists = async ({ pageParam = 0 }) => {
		const res = await PlaylistService.getPlaylistTracks(
			playlistId,
			pageParam,
			pageSize
		);
		setFirstLoading(false);
		return res.data;
	};

	const columnHelper = createColumnHelper();
	const columns = [
		columnHelper.accessor((row) => row.order, {
			id: "order",
			cell: (info) => <span className="ms-2">{info.getValue()}</span>, //mettre un play avec
			header: () => <span className="ms-2">#</span>,
		}),
		columnHelper.accessor((row) => row.track, {
			id: "name",
			cell: (info) => <TrackItem track={info.getValue()} />,
			header: () => <span>Titre</span>,
		}),
		columnHelper.accessor((row) => row.track.album.name, {
			id: "album",
			header: () => <span className="">Album</span>,
			cell: (info) => <span className="">{info.getValue()}</span>,
		}),
		columnHelper.accessor((row) => row.added_at, {
			id: "addedDate",
			header: () => <span>Date d'ajout</span>,
			cell: (info) => (
				<Moment format="DD-MM-yyyy">{info.getValue()}</Moment>
			),
		}),
		columnHelper.accessor(
			(row) => DisplayService.msToTime(row.track.duration_ms),
			{
				id: "duration",
				header: () => <span className="me-2">Durée</span>,
				cell: (info) => (
					<span className="me-2">{info.renderValue()}</span>
				),
			}
		),
	];

	var {
		isLoading,
		isError,
		error,
		data,
		fetchNextPage,
		fetchPreviousPage,
		isFetching,
	} = useInfiniteQuery({
		queryKey: ["tracks"],
		queryFn: fetchPlaylists,
		getNextPageParam: (lastPage, pages) => {
			if (!lastPage.hasMore) {
				return undefined;
			}
			return lastPage.pageNumber + 1;
		},
		getPreviousPageParam: (firstPage, pages) => {
			if (!firstPage || firstPage.pageNumber === 0) {
				return undefined;
			}
			return firstPage.pageNumber - 1;
		},
		// maxPages:4 OPTIMISER AVEC LE SCROLL QUI BUTE EN HAUT
	});

	const table = useReactTable({
		data: data && data.pages ? data.pages.map((p) => p.items).flat(1) : [],
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
	});

	function onScroll() {
		const container = document.getElementById("tracks-scroller");
		const scrollY = container.scrollTop;
		const windowHeight = window.innerHeight;
		const documentHeight = container.scrollHeight;
		// if (scrollY < 200) {
		// 	fetchPreviousPage();
		// }
		if (scrollY + windowHeight >= documentHeight - 100) {
			fetchNextPage();
		}
	}
	const trackClick = (row) => {
		return (event) => {
			if (event.ctrlKey && event.shiftKey) {
				const lastRow = selectedRows.slice(-1)[0];
				const lastRowId = lastRow ? lastRow.id : 1;
				const length =
					(lastRowId > row.id
						? lastRowId - row.id
						: row.id - lastRowId) + 1;
				const start = lastRowId > row.id ? row.id : lastRowId;
				const rows = Array.from({ length: length }, (v, k) => {
					return Number(k) + Number(start);
				}).map((id) => {
					return { id: String(id) };
				});
				setSelectedRows([...selectedRows, ...rows]);
			} else if (event.ctrlKey) {
				setSelectedRows([...selectedRows, row]);
			} else if (event.shiftKey) {
				const lastRow = selectedRows.slice(-1)[0];
				const lastRowId = lastRow ? lastRow.id : 1;
				const length =
					(lastRowId > row.id
						? lastRowId - row.id
						: row.id - lastRowId) + 1;
				const start = lastRowId > row.id ? row.id : lastRowId;
				const rows = Array.from({ length: length }, (v, k) => {
					return Number(k) + Number(start);
				}).map((id) => {
					return { id: String(id) };
				});
				setSelectedRows([...rows]);
			} else {
				setSelectedRows([row]);
			}
		};
	};

	useEffect(() => {
		const container = document.getElementById("tracks-scroller");
		container.addEventListener("scroll", onScroll);
		return () => {
			container.removeEventListener("scroll", onScroll);
		};
	}, []);

	useEffect(() => {
		setFirstLoading(true);
	}, [playlistId]);

	return (
		<div
			className="d-flex h-100 w-100 rounded-2 bg-dark ms-2"
			id="playlist-display"
			style={{
				visibility: firstLoading ? "hidden" : "visible",
			}}
		>
			<div
				id="tracks-scroller"
				style={{
					overflowX: "hidden",
				}}
				className="align-content-center overflow-y-scroll truncated-items playlist-display d-flex flex-column w-100 rounded-2"
			>
				<table className="text-light">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
											  )}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className={`track-item ${
									selectedRows
										.map((r) => r.id)
										.includes(row.id)
										? "selected"
										: ""
								}`}
								onDoubleClick={() => {
									console.log("play");
								}}
								onClick={trackClick(row)}
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</td>
								))}
							</tr>
						))}
						{!isFetching && (
							<>
							<tr>
								<Skeleton/>
							</tr>
							</>
						)}
					</tbody>
					<tfoot>
						{table.getFooterGroups().map((footerGroup) => (
							<tr key={footerGroup.id}>
								{footerGroup.headers.map((header) => (
									<th key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.footer,
													header.getContext()
											  )}
									</th>
								))}
							</tr>
						))}
					</tfoot>
				</table>

				{/* {data &&
					data.pages &&
					data.pages.map((page) =>
						page.items.map((t) => (
							<TrackItem
								key={t.track.id}
								track={t.track}
							/>
						))
					)} */}
				{/* {isFetching && (
					<div
						className="position-relative"
						style={{ marginBottom: "75px" }}
					>
						<span className="loader position-absolute start-50 translate-middle"></span>
					</div>
				)} */}
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

export default PlaylistDisplay;
