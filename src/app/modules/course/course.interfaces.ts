export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  prerequisiteCourses: IPrerequisiteCourseRequest[];
};

export type IPrerequisiteCourseRequest = {
  courseId: string;
  isDeleted?: null;
};

export type ICourseFilterRequest = {
  searchTerm?: string | undefined;
};
