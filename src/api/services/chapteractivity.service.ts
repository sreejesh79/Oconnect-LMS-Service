import ChapterActivityModel from "../models/chapteractivity.model";

class ChapterActivityService {
    private static _singleton: boolean = true;
    private static _instance: ChapterActivityService;

    constructor() {
        if (ChapterActivityService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use ChapterActivityService.instance instead!");
        }
    }

    

    public static get instance(): ChapterActivityService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new ChapterActivityService();
            this._singleton = true;
        }
        return this._instance;
    }

    public async create(trackMode: string, chapters: Array<string>, entity: string, onModel: string, user: string): Promise<any> {
       try {
           const manyData: Array<any> = this._convertToMany({
            trackmode: trackMode,
            chapters: chapters,
            entity: entity,
            onModel: onModel,
            createdBy: user
        })
        const newChapterActivity: any = await ChapterActivityModel.create(manyData);
        return newChapterActivity;

       } catch (e) {
           console.log(e);
            return {
                error: true,
                message: e.message
            }
       }
        
    }

    private _convertToMany(data: any): Array<any> {
        const chapters: Array<string> = data.chapters;
        let retData: Array<any> = [];
        try {
            for (let chap of chapters) {
                let tempObj: any = {};
                Object.assign(tempObj, data);
                delete tempObj.chapters;
                tempObj.chapter = chap;
                retData.push(tempObj);
            }
        } catch(e) {
            console.log(e);
            return [];
        }
        return retData
    }
    public async get(id: string = "", query: any = {}): Promise<any> {
        if (id != "") {
            const chapterActivity: any = await ChapterActivityModel.findById(id)
                                                                    .populate({
                                                                        path: "entity",
                                                                        populate: {path: "sco"}
                                                                    }).lean();
            return chapterActivity;
        } else if(Object.keys(query).length !== 0) {
            const chapterActivity: any = await ChapterActivityModel.find(query)
                                                                .populate({
                                                                    path: "entity",
                                                                    populate: {path: "sco"}
                                                                }).lean();
            return chapterActivity;
        } else {
            const chapterActivity: any = await ChapterActivityModel.find()
                                                                .populate({
                                                                    path: "entity",
                                                                    populate: {path: "sco"}
                                                                }).lean();
            return chapterActivity;
        }
    }

    

}

export default ChapterActivityService.instance;