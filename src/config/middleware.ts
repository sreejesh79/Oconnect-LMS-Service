import loggerMiddleware from '../api/middlewares/logger';
import Validate from '../api/middlewares/validate';
class Middleware {

    public static routes(app: any): void {
        app.all("*",  loggerMiddleware);
       // app.use("/api/*", Validate.authenticateUser);
        // app.use('/course/*')
    }
}

export default Middleware;