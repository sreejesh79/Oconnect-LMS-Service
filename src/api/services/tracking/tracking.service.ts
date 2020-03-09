import fs from "fs";
import parser from "xml2json";

class TrackingService {

    public isExists(rootFolder: String): Boolean {
        return false;
    }

    public loadManifest(filePath: string): any {
        const CMI5XMLData: string = fs.readFileSync(filePath, {encoding: 'utf8'});
        const json = JSON.parse(parser.toJson(CMI5XMLData, {reversible: true}));
        return json;
    }

    public amIValid(data: any, rootFolder: string = ""): boolean {
        return false;
    }

    protected validLaunchURL(): boolean {
        return false;
    }

   
}

export default TrackingService;