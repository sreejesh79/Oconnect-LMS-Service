import FileUtils from "../../../utils/fileutils";
import TrackingService from "./tracking.service";
import AUModel from "../../models/au.model";

class CMI5Service extends TrackingService {
    private static _singleton: boolean = true;
    private static _instance: CMI5Service;

    constructor() {
        super();
        if (CMI5Service._singleton) {
            throw new SyntaxError("This is a singleton class. Please use CMI5Service.instance instead!");
        }
    }

    public static get instance(): CMI5Service{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new CMI5Service();
            this._singleton = true;
        }
        return this._instance;
    }

    public isExists(rootFolder: string): Boolean {
        console.log(rootFolder);
        return FileUtils.fileExist(rootFolder, "cmi5.xml");
    }

    public loadManifest(rootFolder: string): any {
        return super.loadManifest(rootFolder + "/" + "cmi5.xml");
    }

    public amIValid(data: any, rootFolder: string = ""):boolean {
        let isValid= false
        try {
            if(data.courseStructure){
                const haveCourseId = data.courseStructure.course && 
                data.courseStructure.course.id && data.courseStructure.course.id.length > 0
                let haveAuId = data.courseStructure.au && 
                data.courseStructure.au.id && data.courseStructure.au.id.length > 0
                if(!haveAuId && data.courseStructure.au.length) {
                    haveAuId = true;
                    for(const au of data.courseStructure.au) {
                        if(!au.id || au.id.length == 0) {
                            haveAuId = false;
                        }
                    }
                }
                if(haveCourseId && haveAuId && data.courseStructure.au.url){
                    const url = data.courseStructure.au.url;
                    if(url['$t']){
                        isValid = FileUtils.fileExist(rootFolder, url['$t']);
                    }
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
        data.url = JSON.stringify(data.url);
       const newAu: any = await AUModel.create(data);
       return newAu;
    }
}

export default CMI5Service.instance;
