import { useMutation } from "@tanstack/react-query";

import { router } from "expo-router";
import { toast } from "sonner-native";
import { LoginFormData, SignupFormData } from "@/schemas/auth";
import { useAuthStore } from "@/store";

const signup = async (data: SignupFormData) => {
	try {
		// Call the API endpoint for signup
		const response = await fetch("/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		// Check if response is successful
		if (!response.ok) {
			const errorData = await response.json();
			toast.error(errorData.error || "An error occurred during signup");
		}

		// Parse and return the response
		const user = await response.json();
		return user;
	} catch (error) {
		throw new Error(
			`Signup failed: ${error instanceof Error ? error.message : String(error)}`
		); // Rethrow the error to be handled by the mutation
	}
};

const login = async (data: LoginFormData) => {
	const response = await fetch("/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error("Login failed");
	}
	return response.json();
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
			router.replace("/(onboarding)");
			// Handle successful login (e.g., redirect to dashboard)
		},
		onError: (error) => {
			console.error("Login error:", error);
			// Handle error (e.g., show error message)
		},
	});
};

export const useSignup = () => {
	return useMutation({
		mutationFn: signup,
		onSuccess: (_data) => {
			// Handle successful signup (e.g., redirect to login)
			router.replace("/(onboarding)");
		},
		// onError: (error) => {
		// 	toast.error(
		// 		`Signup error: ${error instanceof Error ? error.message : String(error)}`
		// 	);
		// 	// Handle error (e.g., show error message)
		// },
	});
};
