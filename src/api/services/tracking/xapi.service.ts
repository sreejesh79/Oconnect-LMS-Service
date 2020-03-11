import BaseTrackingService from "./basetracking.service";
import FileUtils from "../../../utils/fileutils";

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
        return FileUtils.fileExist(rootFolder, "tincan.xml");
    }

}

export default XAPIService.instance;