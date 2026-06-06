export type Recurrence = "once" | "monthly" | "yearly";

export interface Bill {
  id: string,
  ownerId: string,
  name: string,
  recurrence: Recurrence;
  amount?: string,
  dueDate?: string,
  dueDayOfMonth?: number,
  dueMonth?: number,
  isPaid: boolean,
}

export interface Member {
  userId: string;
  userName: string;
  email: string;
}

export interface Rule {
  id: string;
  daysBeforeDue: number;
}

export interface BillDetails {
  bill: Bill;
  members: Member[];
  rules: Rule[];
}