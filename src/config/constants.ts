import path from 'path';
export class LMSConstants {
    public static readonly TMP_FOLDER_PATH: string = path.join(__dirname, '../.tmp');
}

export class CourseConstants {
    public static readonly COURSE_PACKAGE_FOLDER_PATH: string = path.join(LMSConstants.TMP_FOLDER_PATH, "coursePackage");
    public static readonly COURSES_FOLDER_PATH: string = path.join(__dirname, '../../courses');
}