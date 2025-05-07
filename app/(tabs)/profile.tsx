import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Profile = () => {
	return (
		<ThemedView>
			<ScrollView className="p-4">
				<View>
					<Label>Name</Label>
					<Input />
				</View>
			</ScrollView>
		</ThemedView>
	);
};

export default Profile;
