import BaseTrackingService from "./basetracking.service";
import FileUtils from "../../../utils/fileutils";
import AUModel from "../../models/au.model";
class XAPIService extends BaseTrackingService{

    private static _singleton: boolean = true;
    private static _instance: XAPIService;

    constructor() {
       super();
        if (XAPIService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use XAPIService.instance instead!");
        }
    }

    public static get instance(): XAPIService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new XAPIService();
            this._singleton = true;
        }
        return this._instance;
    }
    public isExists(rootFolder: string): Boolean {
        console.log('rootFolder : ',  rootFolder);
        return FileUtils.fileExist(rootFolder, "_tincan.xml");         
    }
     public loadManifest(rootFolder: string): any {
        return super.loadManifest(rootFolder + "/" + "_tincan.xml");
    }
    public amIValid(data: any, rootFolder: string = ""):boolean {
        let isValid= false
        try {
            if(data.tincan){
                const haveActivityId = data.tincan.activities &&
                                       data.tincan.activities.activity &&
                                       data.tincan.activities.activity.id && 
                                       data.tincan.activities.activity.id.length > 0 &&
                                       data.tincan.activities.activity.id.indexOf('http://')!= -1 ;                
                const haveLaunchHTML = data.tincan.activities &&
                                       data.tincan.activities.activity &&
                                       data.tincan.activities.activity.launch &&
                                       data.tincan.activities.activity.launch['#text'].length > 0               
                console.log('haveLaunchHTML  : ',haveLaunchHTML);
              if(haveActivityId && haveLaunchHTML){
                    const url = data.tincan.activities.activity.launch['#text'];
                    console.log('url  : ',url);
                    isValid = FileUtils.fileExist(rootFolder,url);     
                    console.log('isValid  : ',isValid);               
                }
            }
        } catch(err) {
            console.error(err)
        }
        return isValid;
    }
     public async create(data: any): Promise<any> {
        data.title = JSON.stringify(data.title);
        data.description = JSON.stringify(data.description);
        console.log("data", data);
        // data.url = JSON.stringify(data.url);
        try {
            const newAu: any = await AUModel.create(data);
            console.log("newAu", newAu);
            return newAu;
        } catch (e) {
            console.log(e);
        }

    }
}


export default XAPIService.instance;