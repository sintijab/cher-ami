import { createExpressApp } from "./server";
import prisma from "./prisma";

async function main() {
  const app = await createExpressApp();
  const defaultPort = 4000;
  const port = process.env.PORT || defaultPort;
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
    const shutdown = async () => {
      console.log("Shutting down server...");
      await prisma.$disconnect();
      server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
      });
    };
  
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
