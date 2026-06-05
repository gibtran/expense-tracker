import {Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    // check token exist
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'No token provided'});
    }

    const token = authHeader.split(' ')[1];
    // Client gửi header dạng: Authorization: Bearer eyJhbG... — cần tách lấy phần sau Bearer

    try {
        // jwt verify token and decode payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id: string; email : string};
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({message: 'Invalid token'});
    };
}