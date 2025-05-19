import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

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
			console.info("Fetched session data:", sessionData);
			setSession(sessionData);
		};
		fetchData();
	}, []);

	return (
		<View className="p-4 bg-white rounded-lg shadow-sm">
			<Text className="text-lg font-medium">
				{session?.user?.name
					? `Hello, ${session.user.name}`
					: "Loading profile..."}
			</Text>
		</View>
	);
};

export default ProfileCard;
