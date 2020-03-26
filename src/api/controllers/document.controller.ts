import DocumentService from '../services/document.service';

export class DocumentController {
    
    public static async create(req: any, res: any): Promise<any> {
        const response: any = await DocumentService.create(req.body);
        if (!response.error) {
            return res.status(200).json(response);
        } else {
            return res.status(500).json(response);
        }
    }

    public static async getByChapter(req: any, res: any): Promise<any> {
        const response: any = await DocumentService.getByChapter(req.params.chapterid);
        if (!response.error) {
            return res.status(200).json(response);
        } else {
            return res.status(500).json(response);
        }
    }
}