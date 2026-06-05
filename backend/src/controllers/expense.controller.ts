import { Response } from "express";
import {prisma} from '../prisma/client'
import { AuthRequest } from "../types";

// CREATE
export const createExpense = async (req:AuthRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const {title, amount, date, category, description} = req.body;

        const expense = await prisma.expense.create({
            data: {
                title,
                amount: parseFloat(amount),
                date: new Date(date),
                category,
                description,
                userId
            }
        })

        res.status(201).json({
            message: "Expense created successfully",
            expense
        });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}

// READ
export const getExpenses = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const expenses = await prisma.expense.findMany({
            where: {userId: userId},
            orderBy: {date: 'desc'}
        })
        res.json({
            message: "Expenses retrieved successfully",
            expenses
        });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}

// UPDATE
export const updateExpense = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const expenseId = req.params.id;

        const expense = await prisma.expense.findUnique({
            where: {id: expenseId, userId: userId}
        })

        if (!expense) return res.status(404).json({message: "Expense not found"});

        const {title, amount, date, category, description} = req.body;

        const newExpense = await prisma.expense.update({
            where: {id: expenseId},
            data: {
                title: title ? title : expense.title,
                amount: amount ? parseFloat(amount) : expense.amount,
                date: date ? new Date(date) : expense.date,
                category: category ? category : expense.category,
                description: description ? description : expense.description
            }
        })

        res.json({
            message: "Expense updated successfully",
            newExpense
        });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}

// DELETE
export const deleteExpense = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const expenseId = req.params.id;

        const expense = await prisma.expense.findUnique({
            where: {id: expenseId, userId: userId}
        })

        if(!expense) return res.status(404).json({message: "Expense not found"});

        await prisma.expense.delete({
            where: {id: expenseId}
        })

        res.status(200).json({message: "Expense deleted successfully"});
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}