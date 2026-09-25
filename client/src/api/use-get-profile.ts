import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@/schemas/update-profile-schema";

export function useGetProfile() {
	return useQuery({
		queryKey: ["profile"],
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		queryFn: async () => {
			const response = await fetch("/api/profile");
			if (!response.ok) throw new Error("Failed to load profile.");
			const data: Profile = await response.json();
			return data;
		},
	});
}
