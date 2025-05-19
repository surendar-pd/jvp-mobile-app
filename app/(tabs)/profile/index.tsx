import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useLogout } from "@/hooks/useAuth";
import ProfileCard from "@/components/profile/profile-card";

const Profile = () => {
	const { isPending, mutate } = useLogout();

	return (
		<ThemedView>
			<ScrollView className="p-4">
				<ProfileCard />
				<Button
					disabled={isPending}
					loading={isPending}
					onPress={() => {
						mutate();
					}}
					variant="destructive"
				>
					<Text>Logout</Text>
				</Button>
			</ScrollView>
		</ThemedView>
	);
};

export default Profile;
