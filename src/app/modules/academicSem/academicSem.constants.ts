export const academicSemSearchableFields = [
  "title",
  "code",
  "startMonth",
  "endMonth",
];

export const academicSemFilterableFields = [
  "searchTerm",
  "code",
  "startMonth",
  "endMonth",
];

export const academicSemTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};

export const academicSemTitles: string[] = ["Autumn", "Summer", "Fall"];
export const academicSemCodes: string[] = ["01", "02", "03"];
export const academicSemMonths: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const EVENT_ACADEMIC_SEM_CREATED = "academic-sem.created";
export const EVENT_ACADEMIC_SEM_UPDATED = "academic-sem.updated";
export const EVENT_ACADEMIC_SEM_DELETED = "academic-sem.deleted";
