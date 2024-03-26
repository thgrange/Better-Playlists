import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginService from "../Services/LoginService";
import BPicon from "../Content/BPicon.png";
import { useLocation } from "react-router-dom";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";

const Header = (props) => {
	const goToHomePage = () => {
		window.location.reload(false);
	};

	function logout() {
		LoginService.logout(goToHomePage);
	}

	const location = useLocation();
	const { hash, pathname, search } = location;

	return (
		<Navbar
			sticky="top"
			expand="lg"
			className="bg-dark align-content-center"
			style={{
				height: "70px",
			}}
		>
			<Navbar.Brand href="/">
				<img
					src={BPicon}
					className="ms-1"
					style={{
						transform: "translate(0%,20%)",
						height: "120px",
					}}
					alt="BP logo"
				/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="betterplaylistnavbar" />
			<Navbar.Offcanvas id="betterplaylistnavbar">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title
						className="text-primary"
						id="betterplaylistnavbartitle"
					>
						Better Playlists
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Nav className="justify-content-end flex-grow-1 pe-3">
						<Nav.Link
							className={
								"" + (pathname === "/playlists" ? "active" : "")
							}
							href="/playlists"
						>
							Playlists
						</Nav.Link>
						<Nav.Link
							className={"" + (pathname === "/" ? "active" : "")}
							href="/"
						>
							Profile
						</Nav.Link>
						<Nav.Link
							onClick={logout}
							className="btn btn-danger logout-btn"
						>
							<FontAwesomeIcon
								icon="sign-out-alt"
								className="col-md-1 fa-w-20"
							/>
						</Nav.Link>
					</Nav>
				</Offcanvas.Body>
			</Navbar.Offcanvas>
		</Navbar>
	);
};

export default Header;
