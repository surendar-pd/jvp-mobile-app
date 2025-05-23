import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
	baseURL:
		"https://xlwj9d64-8081.use.devtunnels.ms" /* Base URL of your Better Auth backend. */,
	plugins: [
		expoClient({
			scheme: "myapp",
			storagePrefix: "myapp",
			storage: SecureStore,
		}),
	],
	
});
