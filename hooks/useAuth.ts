import { useMutation } from "@tanstack/react-query";

import { router } from "expo-router";
import { toast } from "sonner-native";
import { LoginFormData, SignupFormData } from "@/schemas/auth";
import { useAuthStore } from "@/store";
import { authClient } from "@/app/_layout";

const signup = async (data: SignupFormData) => {
	try {
		const { data: authResponse, error } = await authClient.signUp.email({
			email: data.email,
			password: data.password,
			name: data.name,
		});

		if (error) {
			throw new Error(error.message);
		}
		return { data: authResponse };
	} catch (error) {
		throw new Error(
			`${error instanceof Error ? error.message : String(error)}`
		);
	}
};

const login = async (data: LoginFormData) => {
	try {
		const { data: AuthResponse, error } = await authClient.signIn.email({
			email: data.email,
			password: data.password,
		});

		if (error) {
			throw new Error(error.message);
		}
		return { data: AuthResponse };
	} catch (error) {
		throw new Error(
			`${error instanceof Error ? error.message : String(error)}`
		);
	}
};

export const useLogout = () => {
	const { setLoggedIn } = useAuthStore();

	const logout = async () => {
		setLoggedIn(false);
	};
	return {
		logout,
	};
};

export const useLogin = () => {
	const { setLoggedIn } = useAuthStore();

	return useMutation({
		mutationFn: login,
		onSuccess: (_data) => {
			setLoggedIn(true);
			router.replace("/(tabs)");
			// Handle successful login (e.g., redirect to dashboard)
		},
		onError: (error) => {
			toast.error(`${error instanceof Error ? error.message : String(error)}`);
		},
	});
};

export const useSignup = () => {
	return useMutation({
		mutationFn: signup,
		onSuccess: (result) => {
			const { data } = result;

			// Handle successful signup (e.g., redirect to login)
			router.replace("/(onboarding)");
		},
		onError: (error) => {
			toast.error(`${error instanceof Error ? error.message : String(error)}`);
		},
	});
};

export const useLogOut = () => {
	const { setLoggedIn } = useAuthStore();

	return useMutation({
		mutationFn: async () => {
			await authClient.signOut();
			setLoggedIn(false);
		},
		onSuccess: () => {
			router.replace("/(auth)");
		},
		onError: (error) => {
			toast.error(`${error instanceof Error ? error.message : String(error)}`);
		},
	});
};
