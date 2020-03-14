import axios from "axios";

class LRSBridgeService {
    private static _singleton: boolean = true;
    private static _instance: LRSBridgeService;

    constructor() {
        if (LRSBridgeService._singleton) {
            throw new SyntaxError("This is a singleton class. Please use LRSBridgeService.instance instead!");
        }
    }

    public static get instance(): LRSBridgeService{
        if (!this._instance) {
            this._singleton = false;
            this._instance = new LRSBridgeService();
            this._singleton = true;
        }
        return this._instance;
    }

    public async fetch(): Promise<any> {

        return {

            "auth-token": "NmQxMDA3ZWQxMjBjNDcxYTkxNTlkZDc5ZjBmZDU5NTk4NzQ3ZmZkNjo2ZDE5Y2E1MWFmOGFlYjU3NTcwZWVjMjk3MWNjMjYwNDNjOWMyMmQx"
        }
    }

    public async proxyToLRS(params: string, query: any, method: string ): Promise<any> {
       // console.log(params);
       const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');
      /* try {
        const axiosInstance: any = axios.create({
            baseURL: "http://localhost:3000/data/xAPI",
            headers: {
                'Authorization': "Basic NmQxMDA3ZWQxMjBjNDcxYTkxNTlkZDc5ZjBmZDU5NTk4NzQ3ZmZkNjo2ZDE5Y2E1MWFmOGFlYjU3NTcwZWVjMjk3MWNjMjYwNDNjOWMyMmQx"
            }
           });
           const fullPath: string = `${params[0]}?${queryString}`;
           console.log(fullPath);
           const response: any = await axios[method.toLowerCase()](fullPath);
          // console.log("response",response.response);
           return response;
       } catch(e) {
        console.log(e);
       }*/
       return queryString;

    }
}

export default LRSBridgeService.instance;
