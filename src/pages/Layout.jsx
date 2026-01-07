import { Outlet } from "react-router-dom";
import { StoreProvider } from "../hooks/useGlobalReducer";

export const Layout = () => {
	return (
		<StoreProvider>
			<Outlet />
		</StoreProvider>
	);
};
