import { MainController } from "controllers/main.controller";
import { UserController } from "controllers/user.controller";

class RouterConfig {

    public static routes(router: any): any {
        router.get("/", MainController.index);
        router.get("/api/users", UserController.getUser)
        
    }
}

export default RouterConfig;
