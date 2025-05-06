import { useMutation } from "@tanstack/react-query";

import { LoginFormData, SignupFormData } from "@/schemas/auth";

const signup = async (data: SignupFormData) => {
	const response = await fetch("/api/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error("Signup failed");
	}

	return response.json();
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

export const useLogin = () => {
	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			console.log("Login successful:", data);
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
		onSuccess: (data) => {
			console.log("Signup successful:", data);
			// Handle successful signup (e.g., redirect to login)
		},
		onError: (error) => {
			console.error("Signup error:", error);
			// Handle error (e.g., show error message)
		},
	});
};
