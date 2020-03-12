import path from 'path';
export class LMSConstants {
    public static readonly LMS_HOST_URL: string = process.env.LMS_HOST_URL;
    public static readonly TMP_FOLDER_PATH: string = path.join(__dirname, '../.tmp');
    public static readonly LMS_END_POINT: string =  path.join(LMSConstants.LMS_HOST_URL, "/api/v1/lrs");
    public static readonly FETCH_URL: string = path.join(LMSConstants.LMS_HOST_URL, "/api/v1/fetch");
    public static readonly LMS_COURSE_PATH: string = path.join(LMSConstants.LMS_HOST_URL, "/course");
}

export class CourseConstants {
    public static readonly COURSE_PACKAGE_FOLDER_PATH: string = path.join(LMSConstants.TMP_FOLDER_PATH, "coursePackage");
    public static readonly COURSES_FOLDER_PATH: string = path.join(__dirname, '../../courses');
}