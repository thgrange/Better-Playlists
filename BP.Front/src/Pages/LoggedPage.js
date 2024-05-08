import Footer from "../Components/Footer";
import Header from "../Components/Header";
import StorageService from "../Services/StorageService";
import HomeLoginPage from "./HomeLoginPage";

const LoggedPage = ({ children }) => {
	if (!StorageService.isLogged()) {
		return <HomeLoginPage />;
	}
	return (
		<>
			<Header />
			<div
				className="bp-scroller"
				id="bp-page"
				style={{
					height: "calc(100vh - (70px + 120px))",
				}}
			>
				{children}
			</div>
			<Footer />
		</>
	);
};

export default LoggedPage;
