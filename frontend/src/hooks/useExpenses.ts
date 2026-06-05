import {useState, useEffect} from 'react';
import * as expenseService from '../services/expense.service';
import { Expense, CreateExpenseDto, UpdateExpenseDto } from '../types';

export const useExpenses = () => {
    const [expenses, setEpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchExpenses = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await expenseService.getExpenses();
            setEpenses(data.expenses);
        } catch {
            setError("Failed to load expenses.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    const addExpense = async (data: CreateExpenseDto) => {
        await expenseService.createExpense(data);
        await fetchExpenses();
    }

    const editExpense = async (data: UpdateExpenseDto, id: string) => {
        await expenseService.updateExpense(data, id);
        await fetchExpenses();
    }

    const removeExpense = async (id: string) => {
        await expenseService.deleteExpense(id);
        await fetchExpenses();
    }

    return {expenses, loading, error, addExpense, editExpense, removeExpense};
}