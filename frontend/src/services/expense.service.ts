import api from "./api";
import { CreateExpenseDto, UpdateExpenseDto } from "../types";
export const getExpenses = async () => {
    const response = await api.get('/expenses');
    return response.data;
}

export const createExpense = async (data:CreateExpenseDto ) => {
    const response = await api.post('/expenses', data
    )
    return response.data;
}

export const updateExpense = async (data: UpdateExpenseDto, id: string) => {
    const response = await api.put(`/expenses/${id}`, data);
    return response.data;
}

export const deleteExpense = async (id: string) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
}