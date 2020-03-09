import multer from "multer";
import path from "path";
import fs from "fs";
import unzipper from "unzipper";
import parser from "xml2json";
import pify from "pify";

import { rootPath } from '../../../root';
import ActivityService from "./activity.service";
import { LMSConstants, CourseConstants } from "config/constants";

class CourseService {
    private static _singleton: boolean = true;
    private static _instance: CourseService;

    public storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadDir = rootPath+"/.tmp/"+file.fieldname
            if(!fs.existsSync(uploadDir)){
                fs.mkdirSync(uploadDir, { recursive: true })
            }
            cb(null, uploadDir)
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const filename = path.basename(file.originalname, ext)
          cb(null, filename + '-' + Date.now()+ext)
        }
      })

      private upload = pify(multer({
        storage: this.storage,
        fileFilter: function (req, file, callback) {
            console.log("file",file);
            var ext = path.extname(file.originalname);
            if(ext !== '.zip') {
                return callback(new Error('Only zip are allowed'))
                //return new Error('Only zip are allowed');
            }
            // return true;
           callback(null, true)
        } }).single('coursePackage'));
        
    constructor() {
        if (CourseService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use UserService.instance instead!");
        }
    }

    public static get instance(): CourseService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new CourseService();
            this._singleton = true;
        }
        return this._instance;
    }

    public async uploadPackage(req: any, res: any): Promise<any> {
        try {
            await this.upload(req, res);
            delete req.file.destination;
            delete req.file.path;
            return req.file;
        } catch (e) {
            return {
                error: true,
                message: e.message
            }
        }
        

    }

    public async createNew(data: any): Promise<any> {
        if ( data.trackmode != "none") {
            const zipPath: string = path.join(CourseConstants.COURSE_PACKAGE_FOLDER_PATH, data.filaname);
            const fileExtract: any = await this.extractFileToFolder(zipPath);
            if(!fileExtract.error) {
                const trackMode: string = ActivityService.getTrackModeFromPackage(fileExtract.activity_path);
                const isValid : boolean = ActivityService.verifyPackage(fileExtract.activity_path, trackMode);
                
            // return isValid;

            }
        }
        
    }

    private async extractFileToFolder(file) {
        const zipPath = file.path;
        return new Promise((resolve,reject) =>{
            // const fileExtracted = fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: file.path.replace(".zip","") }));
            const date = new Date();
            const timestamp = date.getTime();
            const foldername = `activity${timestamp}`
            const outputpath = path.join(rootPath, `./courses/${foldername}`);
            // console.log(file.path);
    
            const fileExtracted = fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: outputpath }));
            fileExtracted.on('finish', (err)=>{
                if(err) {
                    return resolve({error: true, errorMsg: err})
                }
                resolve({error:false, activity_path: outputpath, activity_name: foldername});
            })
        })
    }

    public  removeZip(path) {
        return fs.unlinkSync(path)
    }

}

export default CourseService.instance;