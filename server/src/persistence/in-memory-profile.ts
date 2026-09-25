import type { Profile } from "../schemas/update-profile-schema.js";

let inMemoryProfile: Profile = {
	displayName: "Nova",
	bio: "Music, late nights, and things I make.",
	link: {
		label: "My website",
		url: "https://example.com",
	},
};

export function getProfile() {
	return inMemoryProfile;
}

export function updateProfile(updatedProfile: Profile) {
	inMemoryProfile = updatedProfile;
}
