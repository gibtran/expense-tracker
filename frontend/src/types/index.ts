// TypeScript interfaces dùng chung phía frontend
export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Expense {
    id: string;
    title: string; 
    amount: number;
    category: Category;
    date: string; // ISO format
    description?: string;
    createdAt: string; // ISO format
}

type Category = 'food' | 'transport' | 'shopping' | 'entertainment' | 'health' | 'other';

export type CreateExpenseDto = Omit<Expense, 'id' | 'createdAt'>;
export type UpdateExpenseDto = Partial<CreateExpenseDto>;