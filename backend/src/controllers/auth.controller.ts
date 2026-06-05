import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client";

export const register = async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body;

        // check exist email
        const existing = await prisma.user.findUnique({where: {email}});
        if (existing) return res.status(400).json({message: "Email already in use"});

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword}
        })

        const secret = process.env.JWT_SECRET
        if (!secret) throw new Error("JWT_SECRET is not defined");
        // create token
        const token = jwt.sign(
            {id: user.id, email: user.email},
            secret,
            {expiresIn: "7d"}
        )

        res.status(201).json({message: 'Registration successfully', token, user: {
            id: user.id,
            name: user.name,
            email: user.email
        }})
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({where: {email}});

        if(!user) return res.status(401).json({message: "Invalid email or password"});

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({message: "Invalid email or password"});

        const secret = process.env.JWT_SECRET
        if (!secret) throw new Error("JWT_SECRET is not defined");
        const token = jwt.sign(
            {id: user.id, email: user.email},
            secret,
            {expiresIn: "7d"}
        )

        res.json({message: 'Login successfully', token, user: {
            id: user.id,
            name: user.name,
            email: user.email
        }})
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}