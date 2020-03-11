import { MainController } from "controllers/main.controller";
import { UserController } from "controllers/user.controller";
import { FileController } from "controllers/file.controller";
import { CourseController } from "controllers/course.controller";
import { VideoController } from "controllers/video.controller";

class RouterConfig {

    public static routes(router: any): any {
        router.get("/", MainController.index);
        router.get("/api/users", UserController.getUser);
        router.post("/api/v1/admin/course/upload", CourseController.uploadPackage);
        router.post("/api/v1/admin/course/create", CourseController.create);
        router.post("/api/v1/admin/video/create", VideoController.create);
        router.post("/api/v1/admin/file/create", FileController.create);
        }
}

export default RouterConfig;
