import { MainController } from "controllers/main.controller";
import { UserController } from "controllers/user.controller";
import { FileController } from "controllers/file.controller";
import { CourseController } from "controllers/course.controller";

class RouterConfig {

    public static routes(router: any): any {
        router.get("/", MainController.index);
        router.get("/api/users", UserController.getUser);
        router.post("/api/v1/admin/courses/upload", CourseController.uploadPackage);    
        }
}

export default RouterConfig;
