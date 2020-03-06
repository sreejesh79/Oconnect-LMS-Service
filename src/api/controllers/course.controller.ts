var path = require('path');
export class CourseController {
    public static async launch(req, res): Promise <any> {
        console.log(__dirname);
        console.log(`${__dirname}/sample_course`);
        const _root = path.join(__dirname, 'sample_course');
        const rootIndex = path.join(__dirname,'sample_course/index.html' );
       // res.sendFile(req.params.course_name, {root: _root, headers: {'x-sent': true}});
    }
}