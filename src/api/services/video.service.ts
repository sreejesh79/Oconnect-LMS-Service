import FileService from "../services/file.service";
import VideoModel from "../models/video.model";
import ChapterActivityService from "./chapteractivity.service";

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
            try {
                const newVideo: any = await VideoModel.create({
                    title: data.title,
                    description: data.description,
                    videoUrl: videoFile._id,
                    thumbnail: data.thumbnail
                })
               return newVideo;

            } catch (e) {
                return {
                    error: true,
                    message: e.message
                }
            }
        } else {
            return videoFile;
        }
        
    }

    public async createByChapter(data: any): Promise<any> {
        const newVideo: any = await this.create(data);
        if (!newVideo.error) {
            const chapterActiivity: any = await ChapterActivityService.create("none", data.chapters, newVideo._id, "Video", data.user);
            if (chapterActiivity.error) {
                return chapterActiivity;
            } else {
                return newVideo;
            }
        } else {
            return newVideo;
        }
    }

    public async getByChapter(chapter: string): Promise<any> {
        const query: any = {
            chapter: chapter,
            onModel: "Video"
        } 

        const courseByChapter: any = await ChapterActivityService.get("", query,{path: 'videoUrl'});
       return courseByChapter;
    }
}

export default VideoService.instance;