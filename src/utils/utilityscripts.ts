import { v4 as uuid4 } from 'uuid';

class UtilityScripts {
    public static machine_name(name: string): string {
        return name.toLowerCase().replace(" ", "_");
    }

    public static generatePassword(): string {
        const generatePassword = require('password-generator');
        return generatePassword(8, false);
    }

    public static generateUUID():string {
        return uuid4();
    }

    public static serializeObject(obj, prefix: any = undefined): any {
        var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push((v !== null && typeof v === "object") ?
        UtilityScripts.serializeObject(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
    }
}

export default UtilityScripts;
