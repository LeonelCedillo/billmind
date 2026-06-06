import "dotenv/config";
import nodemailer from "nodemailer";
import { type BillReminderEvent } from "../types/index.js";


export async function sendReminderEmail(event:BillReminderEvent): Promise<void> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_PASSWORD;
  if (!gmailUser || !gmailPassword) {
    throw new Error("Missing GMAIL_USER or GMAIL_PASSWORD in .env");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    }
  });

  await transporter.sendMail({
    from: `BillMind <${gmailUser}>`,
    to: event.recipientEmail,
    subject: `Reminder: ${event.billName} is due in ${event.daysBeforeDue} days`,
    text: `Hi ${event.recipientUsername}, 
      your bill ${event.billName} ${event.amount ? `of $${event.amount}` : ''} 
      is due ${formatDueDate(event)} (in ${event.daysBeforeDue} days).`
  });
}


function formatDueDate(event: BillReminderEvent): string {
  if (event.recurrence === "once" && event.dueDate) {
    return `on ${new Date(event.dueDate).toLocaleDateString()}`;
  }
  if (event.recurrence === "monthly" && event.dueDayOfMonth) {
    return `on the ${event.dueDayOfMonth}th of this month`;
  }
  if (event.recurrence === "yearly" && event.dueDayOfMonth && event.dueMonth) {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return `on ${months[event.dueMonth - 1]} ${event.dueDayOfMonth}`;
  }
  return "";
}