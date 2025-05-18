/* eslint-disable @typescript-eslint/no-require-imports */
import "../global.css";
import "../i18n";
import "@/components/sheets"; // Import sheets registry

import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import "react-native-reanimated";
import { ErrorBoundary } from "react-error-boundary";
import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import { SheetProvider } from "react-native-actions-sheet";
import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "@/lib/useColorScheme";
import { useAuthStore } from "@/store";
import LanguageToggle from "@/components/language-toggle";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client with production-ready configuration
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 2,
			staleTime: 5 * 60 * 1000, // 5 minutes
			gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime with gcTime)
		},
	},
});

// Error fallback component
const ErrorFallback = ({ error }: { error: Error }) => (
	<View className="flex-1 justify-center items-center p-4">
		<Text>Something went wrong:</Text>
		<Text>{error.message}</Text>
	</View>
);

// Memoized font configuration
const fontConfig = {
	Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
	PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
	PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
	PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
	PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
	PoppinsExtraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
	PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
	PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
	PoppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
};

export const authClient = createAuthClient({
	baseURL: "http://localhost:8081" /* Base URL of your Better Auth backend. */,
	plugins: [
		expoClient({
			scheme: "myapp",
			storagePrefix: "myapp",
			storage: SecureStore,
		}),
	],
});

export default function RootLayout() {
	
	const { isLoggedIn } = useAuthStore();
	const { isDarkColorScheme } = useColorScheme();
	const [loaded, error] = useFonts(fontConfig);

	// Memoize theme to prevent unnecessary re-renders
	const theme = useMemo(
		() => (isDarkColorScheme ? DarkTheme : DefaultTheme),
		[isDarkColorScheme]
	);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	// Handle font loading errors
	if (error) {
		return (
			<View className="flex-1 justify-center items-center p-4">
				<Text className="">Failed to load fonts</Text>
			</View>
		);
	}

	// if (isLoading) {
	// 	return (
	// 		<View className="flex-1 justify-center items-center p-4">
	// 			<ActivityIndicator size="small" color={theme.colors.primary} />
	// 		</View>
	// 	);
	// }

	if (!loaded) {
		return null;
	}
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<ThemeProvider value={theme}>
				<QueryClientProvider client={queryClient}>
					<GestureHandlerRootView className="flex-1">
						<SheetProvider>
							<Stack
								initialRouteName={isLoggedIn ? "(tabs)" : "welcome-consent"}
								screenOptions={{
									headerShown: false,
								}}
							>
								<Stack.Protected guard={isLoggedIn}>
									<Stack.Screen name="(tabs)" />
								</Stack.Protected>
								<Stack.Protected guard={!isLoggedIn}>
									<Stack.Screen
										options={{
											headerShown: true,
											headerRight: () => <LanguageToggle theme="dark" />,
											headerTransparent: true,
											headerTitle: "",
										}}
										name="welcome-consent"
									/>
									<Stack.Screen name="(aux)" />
									<Stack.Screen name="(auth)" />
									<Stack.Screen name="+not-found" />
								</Stack.Protected>
							</Stack>
							<StatusBar style={isDarkColorScheme ? "light" : "dark"} />
							<Toaster richColors position="bottom-center" />
							<PortalHost />
						</SheetProvider>
					</GestureHandlerRootView>
				</QueryClientProvider>
			</ThemeProvider>
		</ErrorBoundary>
	);
}
