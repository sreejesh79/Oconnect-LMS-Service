import FileService from "../services/file.service";
import VideoModel from "../models/video.model";

class VideoService {
    private static _singleton: boolean = true;
    private static _instance: VideoService;

    constructor() {
        if (VideoService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use VideoService.instance instead!");
        }
    }

    public static get instance(): VideoService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new VideoService();
            this._singleton = true;
        }
        return this._instance;
    }

    public async getAllVideos(): Promise<any> {
        return await VideoModel.find({}).populate(["videoUrl", "thumbnail"]).lean();
    }

    public async getRecentVideos(): Promise<any> {
        return await VideoModel.find().sort({createdAt: -1}).limit(5).populate(["videoUrl", "thumbnail"]).lean()
    }

    public async create(data: any): Promise<any> {
        const videoFile: any = await FileService.create({
            url: data.videoUrl,
            createdBy: data.user
        });
        if ( !videoFile.error ) {
            const thumbnail: any = await FileService.create({
                url: data.thumbnail,
                createdBy: data.user
            })
            if ( !thumbnail.error ) {
                try {
                    const newVideo: any = await VideoModel.create({
                        title: data.title,
                        description: data.description,
                        videoUrl: videoFile._id,
                        thumbnail: thumbnail._id
                    })
                    return newVideo;
                } catch (e) {
                    return {
                        error: true,
                        message: e.message
                    }
                }
                
            } else {
                return thumbnail;
            }
        } else {
            return videoFile;
        }
        
    }
}

export default VideoService.instance;