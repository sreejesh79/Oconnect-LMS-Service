import { MainController } from "controllers/main.controller";
import { UserController } from "controllers/user.controller";
<<<<<<< HEAD
import { CourseController } from "controllers/course.controller";
=======
import { FileController } from "controllers/file.controller";
>>>>>>> 5f84c7f73c38fb048ed0a231cf5fb01ad100e109

class RouterConfig {

    public static routes(router: any): any {
        router.get("/", MainController.index);
        router.get("/api/users", UserController.getUser)
<<<<<<< HEAD
        router.get("/course/launch/:course_name", CourseController.launch);
=======
        router.post("/course/upload", FileController.uploadPackage)
>>>>>>> 5f84c7f73c38fb048ed0a231cf5fb01ad100e109
        
    }
}

export default RouterConfig;
