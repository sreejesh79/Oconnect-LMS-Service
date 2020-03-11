import { MainController } from "controllers/main.controller";
import { UserController } from "controllers/user.controller";
import { FileController } from "controllers/file.controller";
import { CourseController } from "controllers/course.controller";
import { VideoController } from "controllers/video.controller";
import { TrackingController } from "controllers/tracking.controller";

class RouterConfig {

    public static routes(router: any): any {
        router.get("/", MainController.index);
        router.get("/api/users", UserController.getUser);
        router.post("/api/v1/admin/course/upload", CourseController.uploadPackage);
        router.post("/api/v1/admin/course/create", CourseController.create);
        router.post("/api/v1/admin/video/create", VideoController.create);
        router.post("/api/v1/admin/file/create", FileController.create);
        router.get("/api/v1/courses/:chapter", CourseController.getByChapter);
        router.post("/api/v1/tracking", TrackingController.create);
        router.get("/api/v1/tracking/:entity/member/:member_id/chapter/:chapter_id", TrackingController.getForMemberAndChapter);
        }
}

export default RouterConfig;
