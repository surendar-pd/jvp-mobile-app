
export async function POST(request: Request) {
	const body = await request.json();
	console.log("Request received:", body);
	// try {
	// 	const body = await request.json();
	// 	console.log("Request body:", body);
	// 	const validatedData = signupSchema.parse(body);
	// 	console.log("Validated Data:", validatedData);

	// 	// Just return the validated data
	// 	return Response.json({
	// 		success: true,
	// 		data: validatedData,
	// 	});
	// } catch (error) {
	// 	console.error("Validation error:", error);
	// 	return Response.json(
	// 		{
	// 			success: false,
	// 			message: "Invalid form data",
	// 			error,
	// 		},
	// 		{ status: 400 }
	// 	);
	// }
}
