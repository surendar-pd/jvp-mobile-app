import { Redirect } from "expo-router";
// import { View, ActivityIndicator } from "react-native";
import { useAuthStore } from "@/store";

export default function Index() {
	const { isLoggedIn } = useAuthStore();
	// if (isLoading) {
	// 	return (
	// 		<View className="flex-1 items-center justify-center">
	// 			<ActivityIndicator size="small" />
	// 		</View>
	// 	);
	// }

	// If authenticated, redirect to home screen
	if (isLoggedIn) {
		return <Redirect href="/(tabs)" />;
	}

	// If not authenticated, redirect to auth screen
	return <Redirect href="/welcome-consent" />;
}
