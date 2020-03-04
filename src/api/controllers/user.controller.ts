import { Request, Response, NextFunction } from "express";
import UserService from 'services/user.service';

export class UserController {
    /**
     * API user
     * GET /api/user/get
     */
    public static getUser = async (req: Request, res: Response, next: NextFunction) => {
        console.log("UserController.getUser")
      try {
        const user: any = await UserService.getUsersById("")
        console.log(user);
         res.status(200)
         return res.json({ data: user });
      } catch (err) {
        next(err);
      }
    };
  
    /**
     * POST add user's
     * POST /api/user/create
     */
    public static create = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {
          body: user,
        } = req;
        return res.status(200).json({ data: `Your name is ${user}. Ola!` });
      } catch (err) {
        next(err);
      }
    };
  }
  