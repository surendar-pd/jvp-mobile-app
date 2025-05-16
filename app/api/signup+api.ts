import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { SignupFormData } from "@/schemas/auth";
import { PrismaClient } from "../../lib/generated/prisma";

// Initialize Prisma client
const prisma = new PrismaClient();

export async function POST(request: Request) {
	try {
		// Parse request body
		const data: SignupFormData = await request.json();

		// Validate required fields
		if (!data.name || !data.email || !data.password) {
			return Response.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Check if user with this email already exists
		const existingUser = await prisma.users.findFirst({
			where: {
				email: data.email,
			},
		});

		if (existingUser) {
			return Response.json(
				{ error: "User with this email already exists" },
				{ status: 409 }
			);
		}

		// Generate a salt and hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(data.password, salt);

		// Generate a UUID for the user
		const userId = uuidv4();

		// Create the user in the database
		const user = await prisma.users.create({
			data: {
				id: userId,
				name: data.name,
				email: data.email,
				password: hashedPassword,
				date_created: new Date(),
				date_updated: new Date(),
			},
		});

		// Return user without sensitive information
		const { password, ...userWithoutPassword } = user;
		return Response.json(userWithoutPassword, { status: 201 });
	} catch (error) {
		console.error("Signup error:", error);
		return Response.json({ error: "Failed to create user" }, { status: 500 });
	}
}
