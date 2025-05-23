import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();
export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "mysql",
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }, _request) => {
			const baseUrl = process.env.EXPO_PUBLIC_API_URL!;
			const res = await fetch(`${baseUrl}/api/sendverifyemail`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					data: {
						name: user.name,
						email: user.email,
						url: url,
					},
				}),
			});

			const _result = await res.json();
			if (res.status !== 200) {
				throw new Error(_result.error);
			}
		},
	},
	trustedOrigins: ["myapp://", "https://xlwj9d64-8081.use.devtunnels.ms"],
});
