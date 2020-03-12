import MemberService from "services/member.service";

export class ChapterValidations {
    
    public static async memberInChapter(req, res, next): Promise<any> {

        if ( MemberService.belongsToChapter(req.query.member_id, req.query.chapter_id)) {
            next();
        } else {
            return res.status(400).send("Invalid Member or Chapter provided");
        }
    }

    public static async courseInChapter(req, res, next): Promise<any> {
        
    }
}
