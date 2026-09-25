import { serverSetup } from "./setup.js";

const PORT = 3000;
const HOST = "0.0.0.0";

const server = await serverSetup();

try {
	await server.listen({ port: PORT, host: HOST });
	server.log.info(`API running!`);
} catch (error) {
	server.log.error(error);
	process.exit(1);
}
