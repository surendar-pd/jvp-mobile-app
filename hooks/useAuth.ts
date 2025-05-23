import { useMutation } from "@tanstack/react-query";

import { router } from "expo-router";
import { toast } from "sonner-native";
import { LoginFormData, SignupFormData } from "@/schemas/auth";
import { authClient } from "@/lib/auth-client";

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
			error instanceof Error && error.message
				? error.message
				: "Something went wrong, please try again."
		);
	}
};

const login = async (data: LoginFormData) => {
	await authClient.signIn.email(
		{
			email: data.email,
			password: data.password,
		},
		{
			onError: (ctx) => {
				if (ctx.error.status === 403) {
					toast.warning("Please verify your email address.");
				} else if (ctx.error.status === 401) {
					toast.error("Invalid email or password.");
				} else {
					toast.error("Something went wrong, please try again.");
				}
			},
			onSuccess: () => {
				router.replace("/(tabs)");
			},
		}
	);
};

export const useLogin = () => {
	return useMutation({
		mutationFn: login,
	});
};

export const useSignup = () => {
	return useMutation({
		mutationFn: signup,
		onSuccess: (result) => {
			const { data } = result;
			router.replace({
				pathname: "/(auth)/verify-email",
				params: {
					email: data.user.email,
				},
			});
		},
		onError: (error) => {
			toast.error(`${error instanceof Error ? error.message : String(error)}`);
		},
	});
};

export const useLogout = () => {
	return useMutation({
		mutationFn: async () => {
			await authClient.signOut();
		},
		onSuccess: () => {
			router.replace("/(auth)");
		},
		onError: (error) => {
			toast.error(`${error instanceof Error ? error.message : String(error)}`);
		},
	});
};
