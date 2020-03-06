class CourseService {
    private static _singleton: boolean = true;
    private static _instance: CourseService;

    constructor() {
        if (CourseService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use UserService.instance instead!");
        }
    }

    public static get instance(): CourseService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new CourseService();
            this._singleton = true;
        }
        return this._instance;
    }

    // public async launch
}