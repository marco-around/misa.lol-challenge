import fastify, { type FastifyError } from "fastify";
import { routes } from "./routes/index.js";

export async function serverSetup() {
	const server = fastify({
		logger: {
			transport: {
				target: "pino-pretty",
				options: {
					translateTime: "HH:MM:ss",
					ignore: "pid,hostname",
				},
			},
		},
	});

	server.register(routes, { prefix: "/api" });

	server.setErrorHandler((err: FastifyError, _req, reply) => {
		if (
			err.code === "FST_ERR_CTP_INVALID_JSON_BODY" ||
			err.code === "FST_ERR_CTP_EMPTY_JSON_BODY"
		) {
			return reply.code(400).send({
				error: "invalid_json",
				message: "Request body is not valid JSON.",
			});
		}

		server.log.error(err);

		return reply.code(err.statusCode ?? 500).send({
			error: "internal_server_error",
		});
	});

	return server;
}
