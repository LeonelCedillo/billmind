import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Built-in middleware to parse JSON request bodies
app.use(express.json());

async function main() {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});