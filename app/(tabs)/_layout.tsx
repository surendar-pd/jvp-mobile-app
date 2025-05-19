import { Tabs, Redirect } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthStore } from "@/store";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	// If user is not logged in, redirect to login
	if (!isLoggedIn) {
		return <Redirect href="/(auth)" />;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						position: "absolute",
					},
				}),
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: true,
					headerTitle: "JVP",
					headerTitleStyle: {
						fontFamily: "Poppins",
					},
					tabBarIcon: ({ color, focused }) => (
						<IconSymbol
							size={24}
							name={focused ? "house.fill" : "house"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				redirect={false}
				options={{
					href: null,
					title: "Explore",
					tabBarIcon: ({ color, focused }) => (
						<IconSymbol
							size={24}
							name={focused ? "paperplane.fill" : "paperplane"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: true,
					headerTitle: "My Profile",

					headerBackButtonDisplayMode: "minimal",
					headerTitleStyle: {
						fontFamily: "Poppins",
					},
					tabBarIcon: ({ color, focused }) => (
						<IconSymbol
							size={24}
							name={focused ? "person.fill" : "person"}
							color={color}
						/>
					),
					tabBarIconStyle: {
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					},
				}}
			/>
			<Tabs.Screen
				name="upload"
				options={{
					title: "Upload",
					animation: "fade",
					href: null,
				}}
			/>
		</Tabs>
	);
}
