export async function sendVerificationEmail({
	user,
	url,
}: {
	user: { name: string; email: string };
	url: string;
}) {
	// Get the base URL for the API request
	const baseUrl =
		process.env.BETTER_AUTH_URL ||
		process.env.EXPO_PUBLIC_API_URL ||
		"http://localhost:8081";
	const apiEndpoint = `${baseUrl}/api/sendverifyemail`;

	const res = await fetch(apiEndpoint, {
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
}
