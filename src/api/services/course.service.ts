import multer from "multer";
import path from "path";
import fs from "fs";
import unzipper from "unzipper";
import parser from "xml2json";
import pify from "pify";

import { rootPath } from '../../../root';
import ActivityService from "./activity.service";
import { LMSConstants, CourseConstants } from "config/constants";
import CourseModel from "models/course.model";
import ChapterActivityService from "./chapteractivity.service";
import CourseEnrollService from "./courseenroll.service";
import UtilityScripts from "../../utils/utilityscripts";

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
           // const auData: any = {};
           let courseData: any = {};
            const zipPath: string = path.join(CourseConstants.COURSE_PACKAGE_FOLDER_PATH, data.filename);
            const fileExtract: any = await this.extractFileToFolder(zipPath);
            console.log("fileExtract", fileExtract);
            if(!fileExtract.error) {
                const trackMode: string = ActivityService.instance.getTrackModeFromPackage(fileExtract.activity_path);
                console.log("trackMode", trackMode);
                const isValidData : any = ActivityService.instance.verifyPackage(fileExtract.activity_path, trackMode);
                console.log("fileExtract", fileExtract);                
                if (isValidData && !isValidData.error) {
                    const newActivity: any = await ActivityService.instance.create(isValidData, trackMode, fileExtract.activity_name);
                    const newCourse: any = await this.createCourse(trackMode, isValidData, newActivity);
                   // const findCourse: any = await CourseModel.findById(newCourse._id).populate("sco");
                   const newChapterActivity: any = await ChapterActivityService.create(trackMode, data.chapters, newCourse._id, "Course", data.user);
                   if (newChapterActivity.error) {
                       return newChapterActivity;
                   }
                   const findChapterActivity: any = await ChapterActivityService.get(newChapterActivity._id, {}, {path:'sco'});
                    // return findCourse;
                   // return isValidData;
                   return findChapterActivity;
                } else {
                    return isValidData;
                }
            // return isValid;

            }
        }
        
    }

    private async extractFileToFolder(file) {
        const zipPath = file;
        return new Promise((resolve,reject) =>{
            // const fileExtracted = fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: file.path.replace(".zip","") }));
            const date = new Date();
            const timestamp = date.getTime();
            const foldername = `activity${timestamp}`
            const outputpath = path.join(rootPath, `../courses/${foldername}`);
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

    private async createCourse(trackMode: string, data: any, newActivity: any): Promise <any> {
        let courseData: any;
        switch (trackMode) {
            case ActivityService.TRACK_MODE_CMI5:
                courseData = data.courseStructure.course;
                console.log("courseData", courseData);
                courseData.title = JSON.stringify(courseData.title);
                courseData.description = JSON.stringify(courseData.description);
                courseData.sco = newActivity._id;
                courseData.onModel = "AU";

                const newCourse: any = await CourseModel.create(courseData);
                return newCourse;
                break;
            case ActivityService.TRACK_MODE_XAPI:
                courseData = {};  
                const activityData:any = data.tincan.activities.activity;
                console.log('data  ',data);            
                courseData.id = activityData['id'];
                courseData.title = JSON.stringify(activityData.name);
                courseData.description = JSON.stringify(activityData.description['#text']);
                courseData.sco = newActivity._id;
                courseData.onModel = "AU";
                console.log('_courseData ',courseData);
                const _newCourse: any = await CourseModel.create(courseData);
                return _newCourse;
                break;

        }
    }

    public async getByChapter(chapter: string = ""): Promise<any> {
        let query: any = {};
        if (!chapter || chapter == "") {
            query = {
                onModel: "Course"
            } 
        } else {
            query = {
                chapter: chapter,
                onModel: "Course"
            } 
        }
        

        const courseByChapter: any = await ChapterActivityService.get("", query,{path: 'sco'});
        return courseByChapter;
    }
    
    public async getLaunchURL(enroll_id: string): Promise<any> {
        try {
            const enrollData: any = await CourseEnrollService.getEnrollMent(enroll_id);
            console.log("enrollData",enrollData);
            if (!enrollData.error && enrollData._id) {
                const endpoint: string  = LMSConstants.LMS_END_POINT;
            const fetchUrl: string =  LMSConstants.FETCH_URL;
            console.log(fetchUrl);
            const actor: any =  {
                "objectType": "Agent", 
                "account": {
                        "homePage": LMSConstants.LMS_HOST_URL,
                        "name": enrollData.member
                    }
                };
            const actorSerialized: any = UtilityScripts.serializeObject(actor);
            const registration: string = enrollData.registration;
            if (!enrollData.course) {
                const courseData: any = CourseModel.findOne({sort: { 'created_at' : 1}}).populate("sco");
                enrollData.course = courseData;
            }
            const activityId: string = enrollData.course.sco.id;

            const launch_url = enrollData.course.sco.launch_url;
            const launchParams: any = {
                launch_url: launch_url,
                endpoint: encodeURIComponent(endpoint),
                fetch : encodeURIComponent(fetchUrl),
                actor : encodeURIComponent(JSON.stringify(actor)),
                registration : registration,
                activityId : encodeURIComponent(activityId),
                auth: "Basic NmQxMDA3ZWQxMjBjNDcxYTkxNTlkZDc5ZjBmZDU5NTk4NzQ3ZmZkNjo2ZDE5Y2E1MWFmOGFlYjU3NTcwZWVjMjk3MWNjMjYwNDNjOWMyMmQx"
                }

                console.log(launchParams);
            // const launchURLWithParams: string = `${LMSConstants.LMS_COURSE_PATH}/${launch_url}?endpoint=${encodeURIComponent(endpoint)}&fetch=${encodeURIComponent(fetchUrl)}&actor=${encodeURIComponent(JSON.stringify(actor))}&registration=${registration}&activityId=${encodeURIComponent(activityId)}`;
           return launchParams;
           
    
        } else {
                return enrollData;
            }
            
        } catch (e) {
            return {
                error: true,
                message: e.message
            }
        }
        
        

    }

    public async getCoursesForAdmin(): Promise<any> {
        const courses: any = await CourseModel.find().lean();
        return courses;
    }

}

export default CourseService.instance;