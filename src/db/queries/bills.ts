import { db } from "../client.js";
import { type NewBill, bills, type NewBillMember, billMembers} from "../schema.js";


export async function createBill(newBill: NewBill) {
  const [result] = await db.insert(bills).values(newBill).returning();
  return result;
}


export async function addBillMember(billMember: NewBillMember) {
  const [result] = await db.insert(billMembers).values(billMember).returning();
  return result;
}