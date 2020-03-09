import CMI5Service from "./tracking/cmi5.service";
import XAPIService from "./tracking/tracking.service";



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

    public async create(data: any):Promise<any> {

    }

    public  getTrackModeFromPackage(packageFolder): string {
        let trackMode: string = "none";
        if (CMI5Service.isExists) {
            trackMode = ActivityService.TRACK_MODE_CMI5;
        } else {
            trackMode = ActivityService.TRACK_MODE_XAPI;
        }

        return trackMode;
    }

    public verifyPackage( rootFolder: string, trackMode: string): boolean {
        let isValid: boolean = true;
        
        switch (trackMode) {
            case ActivityService.TRACK_MODE_CMI5 :
                const data: any = CMI5Service.loadManifest(rootFolder);
                console.log(data);
                isValid = CMI5Service.amIValid(data, rootFolder);
            break;
            case ActivityService.TRACK_MODE_XAPI :
            break;
        }

        return isValid;
    }

    

    
}

export default ActivityService.instance;