import { MainController } from "controllers/main.controller";
import { UserController } from "controllers/user.controller";
import { FileController } from "controllers/file.controller";
import { CourseController } from "controllers/course.controller";
import { VideoController } from "controllers/video.controller";
import { TrackingController } from "controllers/tracking.controller";
import { LRSBridgeController } from "controllers/lrsbridge.controller";
import { DocumentController } from "controllers/document.controller";

class RouterConfig {

    public static routes(router: any): any {
      //  router.get("/", MainController.index);
        router.get("/api/users", UserController.getUser);
        router.post("/api/v1/admin/course/upload", CourseController.uploadPackage);
        router.post("/api/v1/admin/course/create", CourseController.create);
        router.post("/api/v1/admin/course/chapter/enroll", CourseController.enrollForChapter);
        router.post("/api/v1/admin/course/enroll",CourseController.enrollMember);
        router.post("/api/v1/admin/video/create", VideoController.create);
        router.post("/api/v1/admin/file/create", FileController.create);
        router.get("/api/v1/courses/:chapter", CourseController.getByChapter);
        router.get("/api/v1/courses/enroll/member/:member_id/chapter/:chapter_id", CourseController.getEnrollmentsForMember);
        router.post("/api/v1/tracking", TrackingController.create);
        router.get("/api/v1/tracking/:entity/member/:member_id/chapter/:chapter_id", TrackingController.getForMemberAndChapter);
        router.get("/launch/:enrollId", CourseController.launch);
        router.get("/fetch", LRSBridgeController.fetch);
        router.all("/api/v1/lrs/*", LRSBridgeController.proxy);
       // router.get("/api/v1/fetch")
        router.get("/api/v1/get/videos", VideoController.getVideos);
        router.get("/api/v1/get/recent/videos", VideoController.getRecentVideos);
        router.post("/api/v1/document/create", DocumentController.create);
        router.get("/api/v1/document/chapter/:chapterid", DocumentController.getByChapter);
        }
}

export default RouterConfig;
