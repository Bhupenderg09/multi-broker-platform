import { buildApp } from "./app";

async function bootstrap(): Promise<void> {
  const app = buildApp();
  const port = Number(process.env.PORT || 8787);
  await app.listen({ host: "0.0.0.0", port });
  app.log.info({ port }, "multi-broker api started");
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
