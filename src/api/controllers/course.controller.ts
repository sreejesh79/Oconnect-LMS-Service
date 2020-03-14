import path from "path";
import CourseService from "../services/course.service";
import CourseEnrollService from "../services/courseenroll.service";

export class CourseController {

    public static async uploadPackage(req, res):Promise<any> {
        try {
            const response = await CourseService.uploadPackage(req, res);
           // const response: any = await F.extractFileToFolder(req.file)
            res.json(response);
        } catch (e) {

        }
    }

    public static async create(req, res): Promise<any> {
        try {
            const response = await CourseService.createNew(req.body);
            return res.status(200).json(response);
        } catch (e) {
            console.log(e);
            const errorData = {
                error: true,
                message: e.message
            }
           return res.status(500).json(errorData);
        }
    }

    public static async getByChapter(req, res): Promise<any> {
        const chapter: string = req.params.chapter;
        const response: any = await CourseService.getByChapter(chapter);
        if(!response.error) {
            return res.status(200).json(response);
        } else {
            return res.status(500).json(response);
        }
    }
    public static async enrollForChapter(req, res): Promise<any> {
        const response: any = await CourseEnrollService.enrollMembersToCourse(req.body.chapter, req.body.course);
        console.log(response);
        if ( !response.error ) {
            return res.status(200).json(response);
        } else {
            return res.status(500).json(response);
        }
    }

    public static async enrollMember(req, res): Promise<any> {
        const response: any = await CourseEnrollService.enrollMember(req.body);
        if ( !response.error ) {
            return res.status(200).json(response);
        } else {
            return res.status(500).json(response);
        }
    }

    public static async getEnrollmentsForMember(req, res): Promise<any> {
        const response: any = await CourseEnrollService.getAllEnrollmentForMember(req.params.member_id, req.params.chapter_id);
        if ( !response.error ) {
            return res.status(200).json(response);
        } else {
            return res.status(500).json(response);
        }
    }

    public static async launch(req, res): Promise <any> {
       
     const response: any = await CourseService.getLaunchURL(req.params.enrollId);
      if (!response.error ) {
          const updateTracking: any = await CourseEnrollService.updateTracking(req.params.enrollId);
          if (!updateTracking.error ) {
            try {
                return  res.render("launch",response);
            } catch (e) {
               res.status(500).json(e.message);
            }
          } else {
            return res.status(500).json(updateTracking);
          }
        } else {
        return res.status(500).json(response);
      }
    }
}