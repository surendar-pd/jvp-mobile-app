import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";

import { useAuth } from "@/context/AuthContext";

export default function Index() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="small" />
			</View>
		);
	}

	// If authenticated, redirect to home screen
	if (isAuthenticated) {
		return <Redirect href="/(tabs)" />;
	}

	// If not authenticated, redirect to auth screen
	return <Redirect href="/(auth)" />;
}
