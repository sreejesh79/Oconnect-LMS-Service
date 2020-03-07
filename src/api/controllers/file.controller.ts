import { Request, Response, NextFunction } from "express";
import FileService from '../services/file.service';



export class FileController {

    public static uploadPackage = async(req: any, res: any) =>{
            console.log(req.file);
        FileService.uploadCoursePackage(req,res,async function (err) {
            if(err) {
                console.log(err);
                return res.end("Error uploading file.");
            }
            let haveValidFilesInZip: any = {};
            const response: any = await FileService.extractFileToFolder(req.file)
            if(!response.error) {
                haveValidFilesInZip = await FileService.haveValidFilesInZip(req.file);
                haveValidFilesInZip.activity_path = response.activity_path;
                haveValidFilesInZip.activity_name = response.activity_name;
                haveValidFilesInZip.activity_url = `${req.headers.host}/course/${response.activity_name}`

                FileService.removeZip(req.file.path)
            }
            return res.json({ data: haveValidFilesInZip });
            
        });
    }
    
}