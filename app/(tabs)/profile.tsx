import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useLogout } from "@/hooks/useAuth";

const Profile = () => {
	const { logout } = useLogout();

	return (
		<ThemedView>
			<ScrollView className="p-4">
				<View>
					<Label>Name</Label>
					<Input />
				</View>
				<Button onPress={logout} variant="destructive">
					<Text>Logout</Text>
				</Button>
			</ScrollView>
		</ThemedView>
	);
};

export default Profile;
