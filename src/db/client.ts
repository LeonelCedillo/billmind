import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js"

const dbUrl = process.env.DB_URL;
if (!dbUrl) throw new Error("Missing DB_URL in .env");

export const conn = postgres(dbUrl);
export const db = drizzle(conn, { schema });