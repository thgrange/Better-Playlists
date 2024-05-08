import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StorageService from "../Services/StorageService";
import RequestService from "../Services/RequestService";

const LoginPage = () => {
	const navigate = useNavigate();

	const goToHomePage = () => {
		navigate("/");
	};

	useEffect(() => {
		var query = window.location.search;

		if (query.indexOf("?") === 0) {
			query = query.slice(1);
		}

		const queryParameters = new URLSearchParams(query);
		const code = queryParameters.get("code");
		const state = queryParameters.get("state");
        if (!StorageService.verifState(state) || queryParameters.get("error")) {
            goToHomePage();
        }

		RequestService.getTokens(code, goToHomePage);
	});

	return (
		<div className="d-flex container-fluid vh-100 vw-100">
			<div
				className="spinner-border m-auto text-primary"
				role="status"
			></div>
		</div>
	);
};

export default LoginPage;
