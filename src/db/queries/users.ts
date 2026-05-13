import { eq } from "drizzle-orm";
import { db } from "../client.js";
import { type NewUser, users } from "../schema.js";

export async function createUser(newUser: NewUser) {
  const [result] = await db.insert(users).values(newUser).returning();
  return result;
}


export async function getUserByEmail(email: string) {
  const [result] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  return result;
}