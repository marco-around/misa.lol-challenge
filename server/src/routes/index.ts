import type { FastifyInstance } from "fastify";
import { profileRoutes } from "./profile.js";

export async function routes(fastify: FastifyInstance) {
	fastify.register(profileRoutes);
}
