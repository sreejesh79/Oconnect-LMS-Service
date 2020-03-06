import { MainController } from "controllers/main.controller";
import { UserController } from "controllers/user.controller";
import { CourseController } from "controllers/course.controller";

class RouterConfig {

    public static routes(router: any): any {
        router.get("/", MainController.index);
        router.get("/api/users", UserController.getUser)
        router.get("/course/launch/:course_name", CourseController.launch);
        
    }
}

export default RouterConfig;
