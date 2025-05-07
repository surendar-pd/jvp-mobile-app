/* eslint-disable @typescript-eslint/no-require-imports */
import "../global.css";
import "../i18n";

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
import { useColorScheme } from "@/lib/useColorScheme";
import { AuthProvider } from "../context/AuthContext";

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

export default function RootLayout() {
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

	if (!loaded) {
		return null;
	}

	return (
		<AuthProvider>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<ThemeProvider value={theme}>
					<QueryClientProvider client={queryClient}>
						<GestureHandlerRootView className="flex-1">
							<Stack
								initialRouteName="welcome-consent"
								screenOptions={{
									headerShown: false,
								}}
							>
								<Stack.Screen name="welcome-consent" />
								<Stack.Screen name="(aux)" />
								<Stack.Screen name="(auth)" />
								<Stack.Screen name="(tabs)" />
								<Stack.Screen name="+not-found" />
							</Stack>
							<StatusBar style={isDarkColorScheme ? "light" : "dark"} />
							<Toaster richColors position="bottom-center" />
							<PortalHost />
						</GestureHandlerRootView>
					</QueryClientProvider>
				</ThemeProvider>
			</ErrorBoundary>
		</AuthProvider>
	);
}
