import fs from "fs";
// import parser from "xml2json";
import parser from "fast-xml-parser";

class TrackingService {

    public isExists(rootFolder: String): Boolean {
        return false;
    }

    public loadManifest(filePath: string): any {
        const CMI5XMLData: string = fs.readFileSync(filePath, {encoding: 'utf8'});
        if( parser.validate(CMI5XMLData) === true) { //optional (it'll return an object in case it's not valid)
        const options = {
            attributeNamePrefix : "",
            ignoreAttributes : false,
            parseAttributeValue : true
        }; 
        var jsonObj = parser.parse(CMI5XMLData, options);
            console.log(jsonObj.courseStructure.course.title);
            return jsonObj;
        } else {
            return {
                error: true,
                message: "not valid xml"
            }
        }
       // const json = JSON.parse(parser.parse(CMI5XMLData));
        //console.log(json);
       // return json;
    }

    public amIValid(data: any, rootFolder: string = ""): boolean {
        return false;
    }

    protected validLaunchURL(): boolean {
        return false;
    }

    public async create(data: any): Promise<any>  {

    }

   
}

export default TrackingService;