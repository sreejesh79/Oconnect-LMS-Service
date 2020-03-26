import FileModel from '../models/file.model';
import DocumentModel from '../models/document.model';
import ChapterActivityService from "../services/chapteractivity.service";

class DocumentService {

    private static _singleton: boolean = true;
    private static _instance: DocumentService;

    constructor() {
        if (DocumentService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use UserService.instance instead!");
        }
    }

    public static get instance(): DocumentService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new DocumentService();
            this._singleton = true;
        }
        return this._instance;
    }

    public async create(data: any): Promise<any> {  
        const fileObj: any = {
            filename: data.name ? data.name : '',
            mimetype: data.mimeType ? data.mimeType : '',
            url: data.url,
            createdBy: data.user
        }
       const metadata: any = data;
        try {
            const file: any = await FileModel.create(fileObj)
            const document: any = await DocumentModel.create({
                file: file._id,
                type: data.type,
                metadata: JSON.stringify(metadata)
            });
            const chapterEntity: any = await ChapterActivityService.create('none', data.chapters, document._id , 'Document', data.user);
            if ( chapterEntity.error ) {
                return chapterEntity;
            }
           // console.log("chapterEntity._id",chapterEntity);
           // const findChapterEntity: any = await ChapterActivityService.get(chapterEntity._id, {}, {path: 'File'});
          //  return findChapterEntity;
          return chapterEntity;
        } catch (e) {
            return {
                error: true,
                message: e.message
            }
        }
    }

    public async getByChapter(chapter: string): Promise<any> {
        const query: any = {
            chapter: chapter,
            onModel: "Document"
        } 

        const courseByChapter: any = await ChapterActivityService.get("", query,{path: 'file'});
        return courseByChapter;
    }

}

export default DocumentService.instance;