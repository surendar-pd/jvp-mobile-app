import { PrismaClient } from "./generated/prisma";

// For React Native, we're going to create a simple instance of the client
// without the global attachment which is more suitable for server environments

let prismaInstance: PrismaClient | undefined;

function getPrismaClient(): PrismaClient {
	if (!prismaInstance) {
		prismaInstance = new PrismaClient();
	}
	return prismaInstance;
}

export const prisma = getPrismaClient();

export default prisma;
