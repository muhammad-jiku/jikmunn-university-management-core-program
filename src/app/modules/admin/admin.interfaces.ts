// Filter request type for querying admins
export type IAdminFilterRequest = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  managementDeptId?: string; // relational field
};

// Admin creation event type
export type AdminCreatedEvent = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  designation: string;
  email: string;
  contactNo: string;
  profileImage?: string;
  managementDept: {
    syncId: string;
  };
};
