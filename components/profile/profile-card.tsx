import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Link } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { H2, Small } from "../ui/typography";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

// Define type for session data
type SessionData = {
	user?: {
		id: string;
		name?: string;
		email?: string;
		emailVerified?: boolean;
		image?: string | null;
	};
} | null;

const ProfileCard = () => {
	const [session, setSession] = useState<SessionData>(null);

	const fetchSession = async () => {
		const { data: sessionData, error } = await authClient.getSession();
		if (error) {
			console.error("Error fetching session:", error);
			return null;
		}
		return sessionData;
	};

	useEffect(() => {
		const fetchData = async () => {
			const sessionData = await fetchSession();
			setSession(sessionData);
		};
		fetchData();
	}, []);

	return (
		<View className="flex-row items-center gap-4 mt-4 mb-8">
			<Image
				source={{
					uri: "https://www.github.com/surendar-pd.png",
				}}
				className="w-36 h-36 rounded-full"
				alt={session?.user?.name ?? "User profile picture"}
			/>
			<View>
				<H2>
					{session?.user?.name ? `${session.user.name}` : "Loading profile..."}
				</H2>
				<Small>
					{session?.user?.email ? `${session.user.email}` : "Loading email..."}
				</Small>
				<Link asChild prefetch={false} href="/profile/edit" className="mt-2">
					<Button size="default" variant="secondary">
						<Text>Edit Profile</Text>
					</Button>
				</Link>
			</View>
		</View>
	);
};

export default ProfileCard;
