import CMI5Service from "./tracking/cmi5.service";
import XAPIService from "./tracking/xapi.service";



class ActivityService {
    private static _singleton: boolean = true;
    private static _instance: ActivityService;

    public static readonly TRACK_MODE_CMI5: string = "cmi5";
    public static readonly TRACK_MODE_XAPI: string = "xapi";

    constructor() {
        if (ActivityService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use ActivityService.instance instead!");
        }
    }

    

    public static get instance(): ActivityService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new ActivityService();
            this._singleton = true;
        }
        return this._instance;
    }

    public async create(data: any, trackMode: string, activity_path: string):Promise<any> {
        let auData:any; 
        switch (trackMode) {
            case ActivityService.TRACK_MODE_CMI5 :
                auData = data.courseStructure.au;
                auData.launch_url = `${activity_path}/${auData.url}`;
                const newCMI5: any = await CMI5Service.create(auData);
                return newCMI5;
            break;
             case ActivityService.TRACK_MODE_XAPI :
                const activityData:any = data.tincan.activities.activity;
                auData  = {};
                auData.id = activityData.id;
                auData.title = activityData.name;
                auData.description = activityData.description;
                auData.launch_url = `${activity_path}/${activityData.launch}`;
                const newXAPI: any = await XAPIService.create(auData);
                return newXAPI;
            break;
        
        }
    }

    public  getTrackModeFromPackage(packageFolder): string {
        let trackMode: string = "none";
       console.log('XAPIService.isExists  :',XAPIService.isExists(packageFolder));
        if (CMI5Service.isExists(packageFolder)) {
            trackMode = ActivityService.TRACK_MODE_CMI5;
        } else if(XAPIService.isExists(packageFolder)) {
            trackMode = ActivityService.TRACK_MODE_XAPI;
        }

        return trackMode;
    }

    public  verifyPackage( rootFolder: string, trackMode: string):any {
        let isValid: boolean = true;
        let data: any ;
        switch (trackMode) {
            case ActivityService.TRACK_MODE_CMI5 :
                data = CMI5Service.loadManifest(rootFolder);
                console.log("data", data);
                isValid = CMI5Service.amIValid(data, rootFolder);
                if (isValid) {
                    return data;
                } else {
                    return {
                        error: true,
                        message: "not a valid cmi5.xml"
                    }
                }                
            break;
            case ActivityService.TRACK_MODE_XAPI :
                data = XAPIService.loadManifest(rootFolder);
                console.log("xml data", data);
                isValid = XAPIService.amIValid(data, rootFolder);
                if (isValid) {
                    return data;
                } else {
                    return {
                        error: true,
                        message: "not a valid xapi.xml"
                    }
                }

            break;
        }

        return isValid;
    }
    
    
    

    
}

export default ActivityService;