import "dotenv/config";
import amqp from "amqplib";
import { BillReminderPrefix, ExchangeBillMindDL, ExchangeBillMindTopic } from "../routing/routing.js";
import { SimpleQueueType, AckType, subscribeJSON } from "../pubsub/consume.js";
import type { BillReminderEvent } from "../types/index.js";
import { sendReminderEmail } from "./mailer.js";


async function main() {
  // Connection string (This is how your application will know where to connect to the RabbitMQ server):
  const rabbitConnString = process.env.RABBITMQ_URL;
  if (!rabbitConnString) throw new Error("Missing RABBITMQ_URL in .env");
  const conn = await amqp.connect(rabbitConnString); // creates a new connection to rabbitMQ
  console.log("BillMind notifier connected to RabbitMQ!");

  ["SIGINT", "SIGTERM"].forEach((signal) =>
    process.on(signal, async () => {
      try {
        await conn.close();
        console.log("RabbitMQ connection closed.");
      } catch (err) {
        console.error("Error closing RabbitMQ connection:", err);
      } finally {
        process.exit(0);
      }
    }),
  );

  const ch = await conn.createChannel();
  await ch.assertExchange(ExchangeBillMindTopic, "topic", { durable: true });
  await ch.assertExchange(ExchangeBillMindDL, "fanout", { durable: true });

  // Declare a durable queue bound to the DL exchange
  const dlQueue = await ch.assertQueue("billmind_dl_queue", { durable: true});
  await ch.bindQueue(dlQueue.queue, ExchangeBillMindDL, ""); // fanout ignores routing keys

  // Declares a Single queue (and binds it to an Exhange) 
  // subscribing to all reminder events via wildcard
  await subscribeJSON(
    conn, 
    ExchangeBillMindTopic, 
    `${BillReminderPrefix}.all`, // Queue: one queue for all reminders
    `${BillReminderPrefix}.*`,   // RKey: matches bill.reminder.anyone
    SimpleQueueType.Transient, 
    handlerLog()
  );
}

export function handlerLog(): (event: BillReminderEvent) => Promise<AckType>{
  return async (event: BillReminderEvent): Promise<AckType> => {
    try {
      await sendReminderEmail(event);
      console.log(`Reminder: ${event.recipientUsername} - ${event.billName} due in ${event.daysBeforeDue} days`);
      return AckType.Ack;
    } catch (err) {
      return AckType.NackDiscard;
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
})