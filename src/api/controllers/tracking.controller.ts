import ChapterActivityService from "../services/chapteractivity.service";
import TrackingService from "../services/tracking.service";

export class TrackingController {

    public static async create(req, res): Promise<any> {
        const response: any = await TrackingService.create(req.body);
        if( !response.error) {
            return res.status(200).json(response);
        } else {
            return res.status(500).json(response);
        }
    }

    public static async getForMemberAndChapter(req, res): Promise<any> { 
        const response: any = await TrackingService.getTrackingData(req.params.member_id, req.params.entity, req.params.chapter_id);
        if(!response.error) {
            return res.status(200).json(response);
        } else 
            return res.status(500).json(response);
        }
    }
}

