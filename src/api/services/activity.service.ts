import CMI5Service from "./tracking/cmi5.service";
import XAPIService from "./tracking/basetracking.service";



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
        switch (trackMode) {
            case ActivityService.TRACK_MODE_CMI5 :
                const auData = data.courseStructure.au;
                auData.launch_url = `${activity_path}/${auData.url}`;
                const newCMI5: any = await CMI5Service.create(auData);
                return newCMI5;
            break;
        
        }
    }

    public  getTrackModeFromPackage(packageFolder): string {
        let trackMode: string = "none";
        if (CMI5Service.isExists(packageFolder)) {
            trackMode = ActivityService.TRACK_MODE_CMI5;
        } else {
            trackMode = ActivityService.TRACK_MODE_XAPI;
        }

        return trackMode;
    }

    public  verifyPackage( rootFolder: string, trackMode: string):any {
        let isValid: boolean = true;
        
        switch (trackMode) {
            case ActivityService.TRACK_MODE_CMI5 :
                const data: any = CMI5Service.loadManifest(rootFolder);
               // console.log("data", data);
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
            break;
        }

        return isValid;
    }
    
    
    

    
}

export default ActivityService;