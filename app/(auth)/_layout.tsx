import { Redirect, Stack } from "expo-router";
import { useTranslation } from "react-i18next";

import { useSession } from "@/hooks/useSession";

export default function AuthLayout() {
	const { t } = useTranslation();
	const { isAuthenticated } = useSession();

	// If user is logged in, redirect to tabs
	if (isAuthenticated) {
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
			<Stack.Screen
				name="verify-email"
				options={{
					title: t("verification"),
				}}
			/>
		</Stack>
	);
}
