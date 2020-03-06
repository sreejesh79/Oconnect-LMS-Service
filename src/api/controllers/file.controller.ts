import { Request, Response, NextFunction } from "express";
import FileService from '../services/file.service';



export class FileController {

    public static uploadPackage = async(req: Request, res: Response, next: NextFunction) =>{
            
        FileService.uploadCoursePackage(req,res,async function (err) {
            if(err) {
                return res.end("Error uploading file.");
            }
            let haveValidFilesInZip = {};
            const response: any = await FileService.extractFileToFolder(req.file)
            if(!response.error) {
                haveValidFilesInZip = await FileService.haveValidFilesInZip(req.file);
                FileService.removeZip(req.file.path)
            }
            return res.json({ data: haveValidFilesInZip });
            
        });
    }
    
}