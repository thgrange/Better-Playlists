import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StorageService from "../Services/StorageService";
import BPicon from "../Content/BPicon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Offcanvas, NavDropdown } from "react-bootstrap";
import DisplayService from "../Services/DisplayService";
import { useEffect, useState } from "react";
import ProfileService from "../Services/ProfileService";
import { Avatar, Tooltip } from "@mui/material";

const Header = () => {
	const location = useLocation();
	const { hash, pathname, search } = location;
	const navigate = useNavigate();
	const [profile, setProfile] = useState({
		display_name: ""
	});

	function getProfilePic(hw) {
		if (profile != null) {
			const image = DisplayService.getBiggestImage(profile.images);
			if (image != null) {
				return (
					<Tooltip
						title={profile?.display_name}
						placement="top"
					>
						<Avatar
							src={image.url}
							style={{ height: hw, width: hw }}
						/>
					</Tooltip>
				);
			}
		}
		return (
			<div
				className="rounded-circle border border-4 border-primary overflow-hidden"
				style={{
					height: hw,
					width: hw,
				}}
			>
				<FontAwesomeIcon
					style={{
						height: hw,
						width: hw,
					}}
					className="fa-solid m-auto d-block w-100 h-100"
					icon="fa-user-alt"
				/>
			</div>
		);
	}

	function getProfileUrl() {
		if (
			profile.external_urls != null &&
			profile.external_urls.spotify != null
		) {
			return profile.external_urls.spotify;
		}
		return;
	}

	const goToHomePage = () => {
		window.location.reload(false);
	};

	function logout() {
		StorageService.logout(goToHomePage);
	}

	function goToPlaylists() {
		navigate("/playlists");
	}

	function goToProfile() {
		navigate("/");
	}

    useEffect(() => {
        ProfileService.getConnectedUser().then((response) => {
            if (response.status === 200) {
                setProfile(response.data);
            }
        });
    }, []);

	return (
		<Navbar
			sticky="top"
			expand="lg"
			className="bg-dark align-content-center"
			style={{
				height: "70px",
			}}
		>
			<Navbar.Brand onClick={goToProfile}>
				<img
					src={BPicon}
					className="ms-1"
					style={{
						transform: "translate(0%,15%)",
						height: "120px",
					}}
					alt="BP logo"
				/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="betterplaylistnavbar" />
			<Navbar.Offcanvas id="betterplaylistnavbar">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title
						className="text-secondary"
						id="betterplaylistnavbartitle"
					>
						Better Playlists
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Nav className="justify-content-end flex-grow-1 pe-3">
						<NavDropdown
							title={getProfilePic("30px")}
							aria-label={profile?.display_name}
							drop="down-centered"
						>
							<NavDropdown.Item className="text-secondary d-flex" href={getProfileUrl()} target="_blank" rel="noreferrer">
								Compte
								<FontAwesomeIcon
									className="fa-solid ms-auto my-auto me-0"
									icon="up-right-from-square"
								/>
							</NavDropdown.Item>
							<NavDropdown.Item className="text-secondary">Profil</NavDropdown.Item>
							<NavDropdown.Divider
								style={{ backgroundColor: "#525252" }}
							/>
							<NavDropdown.Item
								className="text-secondary"
								onClick={logout}
							>
								Déconnexion
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Offcanvas.Body>
			</Navbar.Offcanvas>
		</Navbar>
	);
};

export default Header;
