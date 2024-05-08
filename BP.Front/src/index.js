import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./custom.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

window.queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={window.queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
