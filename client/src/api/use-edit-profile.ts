import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import type { Profile } from "@/schemas/update-profile-schema";

export function useEditProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (profile: Profile) => {
			const response = await fetch("/api/profile", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(profile),
			});

			const data = await response.json();

			if (!response.ok) {
				const msg = data.errors
					? Object.values(data.errors).join(". ")
					: data.message ?? "Failed to save profile.";
				throw new Error(msg);
			}

			return data as Profile;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["profile"], data);
			toast.add({
				type: "success",
				description: "Profile updated successfully",
			});
		},
		onError: (error) => {
			toast.add({
				type: "error",
				description: error.message,
				priority: "high",
			});
		},
	});
}
