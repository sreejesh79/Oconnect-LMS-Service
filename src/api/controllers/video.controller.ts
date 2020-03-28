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

    public static async getVideos(req, res) : Promise<any> {
        const response: any = await VideoService.getAllVideos();
        if (response.error) {
            return res.status(500).json(response);
        } else {
            return res.status(200).json(response);
        }
    }

    public static async getRecentVideos(req, res) : Promise<any> {
        const response: any = await VideoService.getRecentVideos();
        if (response.error) {
            return res.status(500).json(response);
        } else {
            return res.status(200).json(response);
        }
    }


    public static async getByChapter(req, res): Promise<any> {
        const response: any = await VideoService.getByChapter(req.params.chapterid);
        if (response.error) {
            return res.status(500).json(response);
        } else {
            return res.status(200).json(response);
        }
    }

    public static async createByChapter(req, res): Promise<any> {
        const response: any = await VideoService.createByChapter(req.body);
        if (response.error) {
            return res.status(500).json(response);
        } else {
            return res.status(200).json(response);
        }
    }
}