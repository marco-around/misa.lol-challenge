import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toast";
import { queryClient } from "./lib/query-client";
import { ProfilePage } from "./pages/profile-page";

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ProfilePage />
			<Toaster />
		</QueryClientProvider>
	);
}
