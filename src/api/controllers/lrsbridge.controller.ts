import LRSBridgeService from "../services/lrsbridge.service";

export class LRSBridgeController {

    public static async fetch(req, res): Promise<any> {
        // res. LRSBridgeService.fetch();
        const fetch: any = await LRSBridgeService.fetch();
        console.log("fetch", fetch);
        res.status(200).json(fetch);
    }

    public static async proxy(req, res): Promise<any> {
        const response: any = await LRSBridgeService.proxyToLRS(req.params, req.query, req.method);
        res.json(response);
    }
}