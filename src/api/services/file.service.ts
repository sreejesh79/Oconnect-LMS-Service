
import multer from "multer";
import path from "path";
import fs from "fs";
import unzipper from "unzipper";
import parser from "xml2json";

import { rootPath } from '../../../root';
import FileModel from "models/file.model";
class FileService {

    private static _singleton: boolean = true;
    private static _instance: FileService;
    
    constructor() {
        if (FileService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use FileService.instance instead!");
        }
    }

    public static get instance(): FileService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new FileService();
            this._singleton = true;
        }
        return this._instance;
    }

    public async create(data: any): Promise<any> {
        try {
            const newFile: any = await FileModel.create(data);
            return newFile;
        } catch (e) {
            return {
                error: true,
                message: e.message
            }
        }
        
    }
    
}

export default FileService.instance;