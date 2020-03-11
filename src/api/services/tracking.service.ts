import TrackingModel from "models/tracking.model";

class TrackingService {
    private static _singleton: boolean = true;
    private static _instance: TrackingService;
    
    constructor() {
        if (TrackingService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use TrackingService.instance instead!");
        }
    }

    public static get instance(): TrackingService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new TrackingService();
            this._singleton = true;
        }
        return this._instance;
    }

    public async create(data: any): Promise<any> {
        try {
            const newTracking: any = await TrackingModel.create(data);
            console.log(newTracking);
            return newTracking;
        } catch (e) {
            return {
                error: true,
                message: e.message
            }
        }
        
    }

    public async getTrackingData(member: string, entity: string, chapter: string): Promise<any> {
        try {
         const trackingData: any = await TrackingModel.find({
             member: member,
             entity: entity,
             chapter: chapter
         }).lean();
         return trackingData;
 
        } catch (e) {
             return {
                 error: true,
                 message: e.message
             }
        }   
     }
 
}

export default TrackingService.instance;