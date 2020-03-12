import MemberModel from "models/member.model";

class MemberService {
    private static _singleton: boolean = true;
    private static _instance: MemberService;

    constructor() {
        if (MemberService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use MemberService.instance instead!");
        }
    }

    public static get instance(): MemberService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new MemberService();
            this._singleton = true;
        }
        return this._instance;
    }

    public async belongsToChapter(member_id, chapter_id): Promise<any> {
        try {
            const member: any = await MemberModel.findOne({
                _id: member_id,
                chapter: chapter_id
            }).lean();
            return (Object.keys(member).length > 0);
        } catch (e) {
            return {
                error: true,
                message: e.message
            }
        }
       
    }
}

export default MemberService.instance;