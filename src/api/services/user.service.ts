import UserModel from "models/user.model";

class UserService {

    private static _singleton: boolean = true;
    private static _instance: UserService;

    constructor() {
        if (UserService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use UserService.instance instead!");
        }
    }

    public static get instance(): UserService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new UserService();
            this._singleton = true;
        }
        return this._instance;
    }



    public async getUsersById (userId: string): Promise<any> {
        let user;
        try {
            user = await UserModel.findOne({_id: userId}).lean().exec();
        } catch (e) {
            return {error: true, message: "Invalid User"};
        }
        return user;
        
    }


}

export default UserService.instance;