import ChapterModel from "models/chapter.model";
import CourseEnrollModel from "models/courseenroll.model";
import AUModel from "models/au.model";

class CourseEnrollService {

    private static _singleton: boolean = true;
    private static _instance: CourseEnrollService;

    constructor() {
        if (CourseEnrollService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use CourseEnrollService.instance instead!");
        }
    }

    public static get instance(): CourseEnrollService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new CourseEnrollService();
            this._singleton = true;
        }
        return this._instance;
    }

    public async enrollMembersToCourse(data: any):Promise<any> {
        try {
           // const chapterData: any = await ChapterModel.findById(chapter_id, "members").lean();
           // console.log("chapterData",chapterData);
            const members: Array<any> = data.members;
            if (members.length > 0){
               const enrollData: Array<any> = this.prepareDataForEnroll(data)
                
               const enrolls: any = await CourseEnrollModel.create(enrollData);
               console.log(enrolls);
               return enrolls;
            } else {
                return {
                    error: true,
                    message: "members not found"
                } 
            }
        } catch (e) {
            console.log(e);
            return {
                error: true,
                message: e.message
            }
        }

        try {

        } catch(e) {

        }

    }
    
     private  prepareDataForEnroll(data): Array<any> {
        const retArray: Array<any> = [];
        const chapter: string = data.chapter;
        const course: string = data.course;
        const members: Array<any> = data.members;
        try {
            for( let memb of members ) {
                const tempObj: any = {
                    chapter: memb.chapter,
                    course: course,
                    member: memb.member,
                }

                retArray.push(memb);
            }
        } catch (e) {
            console.log(e);
            return [];
        }
        return retArray;
    }
    public async enrollMember(data: any): Promise<any> {
        try {
            const enroll: any = await CourseEnrollModel.create(data);
            return enroll;
        } catch (e) {
            return {
                error: true,
                message: e.message
            }
        }

    }

    public async getEnrollMent(enroll_id: string): Promise<any> {
        const enroll: any = await CourseEnrollModel.findById(enroll_id)
                                                    .populate({
                                                        path: "course",
                                                        populate: {path: "sco", model: AUModel}
                                                    })
                                                    .lean();
        return enroll;
    }

    public async getAllEnrollmentForMember(member_id, chapter_id): Promise<any> {
        try {
            const enrolls: any = await CourseEnrollModel.find({member: member_id, chapter: chapter_id}).lean();
            return enrolls;
        } catch(e) {
            return {
                error: true,
                message: e.message
            }
        }
    }

    public async updateTracking(enroll_id: string): Promise<any> {
        try {
            const tracking: any = await CourseEnrollModel.findByIdAndUpdate(enroll_id, {tracking: 'i'});
            return tracking;
        } catch (e) {
            return {
                error: true,
                message: e.message
            }
        }
    }
}

export default CourseEnrollService.instance;