import type { FastifyInstance } from "fastify";
import { getProfile, updateProfile } from "../persistence/in-memory-profile.js";
import { updateProfileSchema } from "../schemas/update-profile-schema.js";

export async function profileRoutes(fastify: FastifyInstance) {
	fastify.get("/profile", (_, reply) => {
		const profile = getProfile();

		return reply.code(200).send(profile);
	});

	fastify.put("/profile", async (req, reply) => {
		const result = updateProfileSchema.safeParse(req.body);

		if (!result.success) {
			const errors = Object.fromEntries(
				result.error.issues.map((issue) => [
					issue.path.join(".") || "body",
					issue.message,
				]),
			);

			return reply.code(400).send({ error: "validation_failed", errors });
		}

		const profile = result.data;

		updateProfile(profile);

		return reply.code(200).send(profile);
	});
}
