import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable, StatusBar, View } from "react-native";
import { X } from "lucide-react-native";

export default function OnboardingLayout() {
	const router = useRouter();

	return (
		<>
			<Stack
				screenOptions={{
					headerShown: true,
					headerStyle: {
						backgroundColor: "red",
					},
					headerTitleStyle: {
						fontFamily: "Poppins",
					},
					// headerTitle: "Health Assessment",
					header: () => (
						<View className="px-4 bg-blue-50 py-8 flex-row items-center justify-center" />
					),
					headerTitleAlign: "center",
					// headerRight: () => (
					// 	<Pressable
					// 		onPress={() => router.push("/(tabs)")}
					// 		className="px-4 py-2"
					// 		hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
					// 	>
					// 		<X size={24} color="#000" />
					// 	</Pressable>
					// ),
				}}
			>
				<Stack.Screen name="index" />
			</Stack>
			{/* <StatusBar animated backgroundColor="red" translucent /> */}
		</>
	);
}
