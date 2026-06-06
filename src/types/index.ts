export type BillReminderEvent = {
  billId: string;
  billName: string;
  amount?: string;
  recurrence: "once" | "monthly" | "yearly";  
  dueDate?: Date;
  dueDayOfMonth?: number;
  dueMonth?: number;
  daysBeforeDue: number;
  recipientUsername: string;
  recipientEmail: string;
};

export type JWTConfig = {
  defaultDuration: number;
  secret: string;
  issuer: string;
}