import Footer from "../Components/Footer";
import Header from "../Components/Header";
import LoginService from "../Services/LoginService";
import HomeLoginPage from "./HomeLoginPage";

const LoggedPage = ({ children }) => {
	if (!LoginService.isLogged()) {
		return <HomeLoginPage />;
	}
	return (
		<>
			<Header />
			<div
				className="bp-scroller"
				style={{
               height: "calc(100vh - (70px + 120px))"
					// marginTop: "70px",
					// marginBottom: "120px",
				}}
			>
				{children}
			</div>
			<Footer />
		</>
	);
};

export default LoggedPage;
