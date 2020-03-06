
import multer from "multer";
import path from "path";
import fs from "fs";
import unzipper from "unzipper";
import parser from "xml2json";

import { rootPath } from '../../../root';
class FileService {

    private static _singleton: boolean = true;
    private static _instance: FileService;

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

    public get uploadCoursePackage() { 
        return multer({
        storage: this.storage,
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            if(ext !== '.zip') {
                return callback(new Error('Only zip are allowed'))
            }
            callback(null, true)
        } }).single('coursePackage')
    }

    public async extractFileToFolder(file) {
        const zipPath = file.path;
        return new Promise((resolve,reject) =>{
            const fileExtracted = fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: file.path.replace(".zip","") }));
            fileExtracted.on('finish', (err)=>{
                resolve({error:false})
            })
        })
    }
    public async removeZip(path) {
        return fs.unlinkSync(path)
    }
    public async haveValidFilesInZip(file) {
        const destinationZip = file.path.replace(".zip","");
        return await this.readCMI5XML(destinationZip)
    }

    private async readCMI5XML(rootFolder, filepath="cmi5.xml") {
        let returnJson={error: true, haveCMI5XML: false, haveValidCMI5XML: false}
        try {
            returnJson.haveCMI5XML = this.fileExist(rootFolder,filepath)
            if(returnJson.haveCMI5XML) {
                const CMI5XMLData: string = fs.readFileSync( path.join(rootFolder,filepath), {encoding: 'utf8'});
                const json = JSON.parse(parser.toJson(CMI5XMLData, {reversible: true}));
                const haveValidCMI5XML = this.verifyCMI5XML(json,rootFolder)
                returnJson = {error: false, haveCMI5XML: true, haveValidCMI5XML: haveValidCMI5XML}
            }
        } catch(err) {
            console.error(err)
        }
        return returnJson;
    }

    private verifyCMI5XML(cmi5Json, rootFolder) {
        let isValid= false
        try {
            if(cmi5Json.courseStructure){
                const haveCourseId = cmi5Json.courseStructure.course && 
                cmi5Json.courseStructure.course.id && cmi5Json.courseStructure.course.id.length > 0
                let haveAuId = cmi5Json.courseStructure.au && 
                cmi5Json.courseStructure.au.id && cmi5Json.courseStructure.au.id.length > 0
                if(!haveAuId && cmi5Json.courseStructure.au.length) {
                    haveAuId = true;
                    for(const au of cmi5Json.courseStructure.au) {
                        if(!au.id || au.id.length == 0) {
                            haveAuId = false;
                        }
                    }
                }
                if(haveCourseId && haveAuId && cmi5Json.courseStructure.au.url){
                    const url = cmi5Json.courseStructure.au.url;
                    if(url['$t']){
                        isValid = this.fileExist(rootFolder, url['$t']);
                    }
                }
            }
        } catch(err) {
            console.error(err)
        }
        return isValid;
    }

    private fileExist(rootFolder: string, filepath: string): boolean {
        const resolvedFilePath = path.join(rootFolder,filepath);
        return fs.existsSync(resolvedFilePath)
    }
}

export default FileService.instance;