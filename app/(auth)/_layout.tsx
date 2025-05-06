import { Redirect, Stack } from "expo-router";
import { useTranslation } from "react-i18next";

import { useAuthStore } from "@/store";


export default function AuthLayout() {
	const { t } = useTranslation();
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	// If user is logged in, redirect to tabs
	if (isLoggedIn) {
		return <Redirect href="/(tabs)" />;
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: t("login"),
				}}
			/>
			<Stack.Screen
				name="signup"
				options={{
					title: t("signup"),
				}}
			/>
		</Stack>
	);
}
