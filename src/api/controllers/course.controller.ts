import path from "path";
import CourseService from "../services/course.service";


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
           return res.status(501).json(errorData);
        }
    }

    public static async launch(req, res): Promise <any> {
        console.log(__dirname);
        console.log(`${__dirname}/sample_course`);
        const _root = path.join(__dirname, 'sample_course');
        const rootIndex = path.join(__dirname,'sample_course/index.html' );
       // res.sendFile(req.params.course_name, {root: _root, headers: {'x-sent': true}});
    }
}