import { Request, Response, NextFunction } from "express";
import FileService from '../services/file.service';

export class FileController {
    public static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        const response: any = await FileService.create(req.body);
        return response;
    }
}