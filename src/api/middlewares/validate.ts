import { Request, Response } from 'express'

export default class Validate {
    public static token = async (req: Request, res: Response, next) => {
        console.log("In Middleware >> token");
        const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['authorization'];
        if(token){
            try{
                
                    console.log("calling next");
                    next();
    
                
            }catch(err){
                console.log(err);
                return res["tokenError"](401,err);
            }
        }else{
            return res["tokenError"](401,'no token found');
        }
    }
    public static authenticateUser = async (req: Request, res: Response, next) => {
        console.log("In Middleware >> authenticateUser");
        const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['authorization'];
        if(token === "Ashish"){
            try{
                
                    console.log("calling next");
                    next();
    
                
            }catch(err){
                console.log(err);
                return res["forbidden"](401,err);
            }
        }else{
            return res["forbidden"](401,'forbidden');
        }
    }
}
