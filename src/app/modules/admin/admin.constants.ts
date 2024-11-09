// Searchable and filterable fields
export const adminSearchableFields: string[] = [
  "id",
  "email",
  "contactNo",
  "name.firstName",
  "name.middleName",
  "name.lastName",
];

export const adminFilterableFields: string[] = [
  "searchTerm",
  "id",
  "bloodGroup",
  "email",
  "contactNo",
  "emergencyContactNo",
];

// Relational fields (optional, but useful for consistency)
export const adminRelationalFields: string[] = ["managementDeptId"];

export const adminRelationalFieldsMapper: { [key: string]: string } = {
  managementDeptId: "managementDept",
};

// Event constants for admin-related actions
export const EVENT_ADMIN_CREATED = "admin.created";
export const EVENT_ADMIN_UPDATED = "admin.updated";
