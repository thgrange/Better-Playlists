import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import HomeLoginPage from "./Pages/HomeLoginPage";
import fontawesome from "@fortawesome/fontawesome";
import LoggedPage from "./Pages/LoggedPage";
import * as Icons from "@fortawesome/fontawesome-free-solid";
import * as Icons2 from "@fortawesome/free-solid-svg-icons";

var iconList = Object.keys(Icons)
	.filter((key) => key !== "fas" && key !== "prefix")
	.map((icon) => Icons[icon]);

fontawesome.library.add(...iconList);

iconList = Object.keys(Icons2)
	.filter((key) => key !== "fas" && key !== "prefix")
	.map((icon) => Icons2[icon]);

fontawesome.library.add(...iconList);

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/homelogin"
					element={<HomeLoginPage />}
				/>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/"
					element={
						<LoggedPage>
							<HomePage />
						</LoggedPage>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
