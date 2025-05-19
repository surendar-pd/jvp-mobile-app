import { router, Stack } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UploadLayout() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerShown: true,
						title: "Profile",
						headerTitle: "My Profile",
						headerTitleStyle: {
							fontFamily: "Poppins",
						},
					}}
				/>
				<Stack.Screen
					name="edit"
					options={{
						headerShown: true,
						headerTitleStyle: {
							fontFamily: "Poppins",
						},
						headerLeft: () => (
							<ChevronLeft onPress={() => router.back()} size={24} />
						),
						title: "Edit Profile",
					}}
				/>
			</Stack>
		</SafeAreaView>
	);
}
