import VideoService from "../services/video.service";

export class VideoController {
    public static async create(req, res): Promise<any> {
        const response: any = await VideoService.create(req.body);
        if (response.error) {
            return res.status(500).json(response);
        } else {
            return res.status(200).json(response);
        }
    }
}