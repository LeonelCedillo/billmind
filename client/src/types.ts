export interface Bill {
  id: string,
  ownerId: string,
  name: string,
  amount: string | null,
  dueDate: string,
  recurrence: string,
  isPaid: boolean,
  createdAt: string
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