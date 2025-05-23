import React from "react";
import { Image, View } from "react-native";
import { Link } from "expo-router";
import { useSession } from "@/hooks/useSession";
import { H2, Small } from "../ui/typography";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

const ProfileCard = () => {
	const { session } = useSession();

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
