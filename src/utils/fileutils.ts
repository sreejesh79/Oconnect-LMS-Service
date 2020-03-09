import path from "path";
import fs from "fs";

class FileUtils {

    public static fileExist(rootFolder: string, filepath: string): boolean {
        const resolvedFilePath = path.join(rootFolder,filepath);
        return fs.existsSync(resolvedFilePath)
    }
}

export default FileUtils;