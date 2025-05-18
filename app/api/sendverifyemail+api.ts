import path from "path";
import { promises as fs } from "fs";
import nodemailer from "nodemailer";

// In-memory rate limiting variables
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 5;

export async function POST(req: Request) {
	// Rate limiting check
	const ip =
		req.headers.get("x-forwarded-for") ||
		req.headers.get("x-real-ip") ||
		"unknown";
	const now = Date.now();
	const rateLimitData = rateLimitMap.get(ip) || { count: 0, timestamp: now };

	if (now - rateLimitData.timestamp < RATE_LIMIT_WINDOW) {
		if (rateLimitData.count >= MAX_REQUESTS) {
			return Response.json(
				{ error: "Too many requests, please try again later." },
				{ status: 429 }
			);
		} else {
			rateLimitData.count++;
		}
	} else {
		rateLimitData.count = 1;
		rateLimitData.timestamp = now;
	}
	rateLimitMap.set(ip, rateLimitData);

	try {
		// Parse request body
		const body = await req.json();

		// Validate with Zod schema
		// const result = contactFormSchema.safeParse(body);
		// if (!result.success) {
		// 	return NextResponse.json(
		// 		{ error: result.error.format() },
		// 		{ status: 400 }
		// 	);
		// }

		const { name, email, url } = body.data;

		// Read the HTML template from disk
		const templatePath = path.join(
			process.cwd(),
			"components/email-templates/verify-email.html"
		);
		let templateHtml = await fs.readFile(templatePath, "utf8");

		// Replace placeholders in the template with actual values.
		templateHtml = templateHtml
			.replace(/\${name}/g, name)
			.replace(/\${url}/g, url);

		// Configure Nodemailer transport
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER, // Your email
				pass: process.env.EMAIL_PASS, // App password
			},
		});

		// Email options for the initial email
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: "New Contact Form Submission",
			html: templateHtml,
		};

		// Send the first email
		await transporter.sendMail(mailOptions);

		return Response.json({
			success: true,
			message: "Email sent successfully!",
		});
	} catch (error) {
		console.error("Error sending email:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
