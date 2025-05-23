import { useMemo } from "react";
import { authClient } from "@/lib/auth-client";

// Define the session type for better TypeScript support
export type Session = {
	user?: {
		id: string;
		name?: string;
		email?: string;
		emailVerified?: boolean;
		image?: string | null;
	};
} | null;

/**
 * Custom hook for accessing the authentication session state
 *
 * @returns An object containing session data and authentication status
 */
export function useSession() {
	const { data: session, isPending, error } = authClient.useSession();

	// Derive isAuthenticated from session state
	const isAuthenticated = useMemo(() => !!session?.user, [session]);

	return {
		session,
		isAuthenticated,
		isLoading: isPending,
		error,
	};
}
