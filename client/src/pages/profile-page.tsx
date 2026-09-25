import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditProfile } from "../api/use-edit-profile";
import { useGetProfile } from "../api/use-get-profile";
import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
	isHttpsUrl,
	type Profile,
	updateProfileSchema,
} from "../schemas/update-profile-schema";

export function ProfilePage() {
	const { data: profile, isPending, error: loadError, refetch } = useGetProfile();

	const { mutate: editProfile, isPending: isSaving } = useEditProfile();

	const form = useForm<Profile>({
		resolver: zodResolver(updateProfileSchema),
		mode: "onTouched",
		defaultValues: { displayName: "", bio: "", link: { label: "", url: "" } },
		values: profile,
	});

	const { errors } = form.formState;
	const { displayName, bio, link } = useWatch({ control: form.control });
	const linkUrl = link?.url?.trim() ?? "";
	const hasValidLink = isHttpsUrl(linkUrl);

	function onSubmit(values: Profile) {
		editProfile(values);
	}

	return (
		<main className="min-h-screen p-4 md:p-8">
			{loadError && (
				<div className="mx-auto max-w-3xl text-center space-y-2 py-12">
					<p className="text-destructive">{loadError.message}</p>
					<Button variant="outline" onClick={() => refetch()}>
						Retry
					</Button>
				</div>
			)}
			{!loadError && (
			<div className="mx-auto flex max-w-3xl flex-col gap-4 md:flex-row md:items-start">
				<Card className="w-full md:flex-1">
					<CardHeader>
						<CardTitle>Your profile</CardTitle>
						<CardDescription>Edit your profile here</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							className="space-y-3"
							onSubmit={form.handleSubmit(onSubmit)}
							noValidate
						>
							<div className="space-y-1">
								<Label htmlFor="displayName">Name:</Label>
								{isPending && <Skeleton className="h-8 w-full" />}
								{!isPending && (
									<Input id="displayName" {...form.register("displayName")} />
								)}
								{errors.displayName && (
									<p className="text-sm text-destructive">{errors.displayName.message}</p>
								)}
							</div>

							<div className="space-y-1">
								<Label htmlFor="bio">Bio:</Label>
								{isPending && <Skeleton className="h-16 w-full" />}
								{!isPending && <Textarea id="bio" {...form.register("bio")} />}
								{errors.bio && (
									<p className="text-sm text-destructive">{errors.bio.message}</p>
								)}
							</div>

							<div className="space-y-1">
								<Label htmlFor="label">Link label:</Label>
								{isPending && <Skeleton className="h-8 w-full" />}
								{!isPending && (
									<Input id="label" {...form.register("link.label")} />
								)}
								{errors.link?.label && (
									<p className="text-sm text-destructive">{errors.link.label.message}</p>
								)}
							</div>

							<div className="space-y-1">
								<Label htmlFor="url">URL:</Label>
								{isPending && <Skeleton className="h-8 w-full" />}
								{!isPending && (
									<Input id="url" {...form.register("link.url")} />
								)}
								{errors.link?.url && (
									<p className="text-sm text-destructive">{errors.link.url.message}</p>
								)}
							</div>

							<Button type="submit" className="w-full" disabled={isSaving}>
								{isSaving && <LoaderIcon className="size-4 animate-spin" />}
								{isSaving ? "Saving..." : "Save"}
							</Button>
						</form>
					</CardContent>
				</Card>

				<Card className="w-full md:w-72">
					<CardHeader>
						<CardTitle>Preview</CardTitle>
						<CardDescription>
							See how your profile looks before saving
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-1">
						<p className="font-bold">{displayName || "Your name"}</p>
						<p className="whitespace-pre-wrap italic text-zinc-500">{bio}</p>
						{link?.label &&
							(hasValidLink ? (
								<a
									className="text-primary hover:underline"
									href={linkUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									{link.label}
								</a>
							) : (
								<span className="text-zinc-400">
									{link.label} (Invalid URL)
								</span>
							))}
					</CardContent>
				</Card>
			</div>
			)}
		</main>
	);
}
