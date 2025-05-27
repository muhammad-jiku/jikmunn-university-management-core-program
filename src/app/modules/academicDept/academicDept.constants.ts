export const academicDeptFilterableFields: string[] = [
  "searchTerm",
  "id",
  "academicFacultyId",
];

export const academicDeptSearchableFields: string[] = ["title"];

export const academicDeptRelationalFields: string[] = ["academicFacultyId"];
export const academicDeptRelationalFieldsMapper: { [key: string]: string } = {
  academicFacultyId: "academicFaculty",
};

export const EVENT_ACADEMIC_DEPT_CREATED = "academic-dept.created";
export const EVENT_ACADEMIC_DEPT_UPDATED = "academic-dept.updated";
export const EVENT_ACADEMIC_DEPT_DELETED = "academic-dept.deleted";
