import {
  Admin,
  BloodGroup,
  Faculty,
  Gender,
  Student,
  User,
  UserRole,
} from "@prisma/client";
import httpStatus from "http-status";
import config from "../../../config";
import ApiError from "../../../errors/handleApiError";
import { prisma } from "../../../shared/prisma";
import { AdminCreatedEvent } from "../admin/admin.interfaces";
import { hashPassword } from "../auth/auth.utils";
import { FacultyCreatedEvent } from "../faculty/faculty.interfaces";
import { StudentCreatedEvent } from "../student/student.interfaces";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";

// Student's id creation
const insertStudentIntoDB = async (
  studentData: Student,
  userData: User,
): Promise<User | null> => {
  if (!userData.password) {
    userData.password = config.default.student_pass as string;
  }

  // Hash the password before saving
  userData.password = await hashPassword(userData.password);
  userData.role = UserRole.STUDENT;

  const academicSemester = await prisma.academicSemester.findUnique({
    where: { id: studentData.academicSemesterId },
  });

  if (!academicSemester) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Academic semester not found");
  }

  try {
    // Step 1: Generate a unique student ID based on the academic semester
    const studentId = await generateStudentId(academicSemester);
    studentData.studentId = studentId;

    // Step 2: Create Student first to ensure the studentId exists
    const newStudent = await prisma.student.create({
      data: {
        ...studentData,
      },
    });

    // Step 3: Now create the User with the new studentId
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        userId: newStudent.studentId, // Set userId to match studentId
        studentId: newStudent.studentId, // Link to the newly created Student
      },
    });

    console.log("Student created:", newStudent);
    console.log("User created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error during user creation:", error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create user profile",
    );
  }
};

// Sample function to handle an event and create a Student and User
const createStudentFromEvent = async (e: StudentCreatedEvent) => {
  const studentData: Partial<Student> = {
    studentId: e.id,
    firstName: e.name.firstName,
    lastName: e.name.lastName,
    middleName: e.name.middleName,
    email: e.email,
    contactNo: e.contactNo,
    gender: e.gender as Gender,
    bloodGroup: e.bloodGroup as BloodGroup,
    academicSemesterId: e.academicSemester.syncId,
    academicDepartmentId: e.academicDepartment.syncId,
    academicFacultyId: e.academicFaculty.syncId,
  };

  const userData: Partial<User> = {
    userId: e.id,
    password: config.default.student_pass as string,
    role: UserRole.STUDENT,
  };

  const data = await insertStudentIntoDB(
    studentData as Student,
    userData as User,
  );
  console.log("Result:", data);
};

// Sample function to update student from an event
const updateStudentFromEvent = async (e: any): Promise<void> => {
  const isExist = await prisma.student.findFirst({
    where: {
      studentId: e.id,
    },
  });

  if (!isExist) {
    await createStudentFromEvent(e);
    return;
  } else {
    const student: Partial<Student> = {
      studentId: e.id,
      firstName: e.name.firstName,
      lastName: e.name.lastName,
      middleName: e.name.middleName,
      profileImage: e.profileImage,
      email: e.email,
      contactNo: e.contactNo,
      gender: e.gender as Gender,
      bloodGroup: e.bloodGroup as BloodGroup,
      academicDepartmentId: e.academicDepartment.syncId,
      academicFacultyId: e.academicFaculty.syncId,
      academicSemesterId: e.academicSemester.syncId,
    };
    await prisma.student.update({
      where: {
        studentId: e.id,
      },
      data: student as Student,
    });
  }
};

// Faculty's id creation
const insertFacultyIntoDB = async (
  facultyData: Faculty,
  userData: User,
): Promise<User | null> => {
  if (!userData.password) {
    userData.password = config.default.faculty_pass as string;
  }

  // Hash the password before saving
  userData.password = await hashPassword(userData.password);
  userData.role = UserRole.FACULTY;

  try {
    // Step 1: Generate a unique faculty ID
    const facultyId = await generateFacultyId();
    facultyData.facultyId = facultyId;

    // Step 2: Create Faculty first to ensure the facultyId exists
    const newFaculty = await prisma.faculty.create({
      data: {
        ...facultyData,
      },
    });

    // Step 3: Now create the User with the new facultyId
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        userId: newFaculty.facultyId, // Set userId to match facultyId
        facultyId: newFaculty.facultyId, // Link to the newly created Faculty
      },
    });

    console.log("Faculty created:", newFaculty);
    console.log("User created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error during user creation:", error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create user profile",
    );
  }
};

// Sample function to handle an event and create a Faculty and User
const createFacultyFromEvent = async (e: FacultyCreatedEvent) => {
  const facultyData: Partial<Faculty> = {
    facultyId: e.id,
    firstName: e.name.firstName,
    lastName: e.name.lastName,
    middleName: e.name.middleName,
    email: e.email,
    contactNo: e.contactNo,
    gender: e.gender as Gender,
    bloodGroup: e.bloodGroup as BloodGroup,
    designation: e.designation,
    academicDepartmentId: e.academicDepartment.syncId,
    academicFacultyId: e.academicFaculty.syncId,
  };

  const userData: Partial<User> = {
    userId: e.id,
    password: config.default.faculty_pass as string,
    role: UserRole.FACULTY,
  };

  const data = await insertFacultyIntoDB(
    facultyData as Faculty,
    userData as User,
  );
  console.log("Result:", data);
};

// Sample function to update faculty from an event
const updateFacultyFromEvent = async (e: any): Promise<void> => {
  const isExist = await prisma.faculty.findFirst({
    where: {
      facultyId: e.id,
    },
  });

  if (!isExist) {
    await createFacultyFromEvent(e);
    return;
  } else {
    const faculty: Partial<Faculty> = {
      facultyId: e.id,
      firstName: e.name.firstName,
      lastName: e.name.lastName,
      middleName: e.name.middleName,
      profileImage: e.profileImage,
      email: e.email,
      contactNo: e.contactNo,
      gender: e.gender as Gender,
      bloodGroup: e.bloodGroup as BloodGroup,
      designation: e.designation,
      academicDepartmentId: e.academicDepartment.syncId,
      academicFacultyId: e.academicFaculty.syncId,
    };
    await prisma.faculty.update({
      where: {
        facultyId: e.id,
      },
      data: faculty as Faculty,
    });
  }
};

// Admin's id creation
const insertAdminIntoDB = async (
  adminData: Admin,
  userData: User,
): Promise<User | null> => {
  if (!userData.password) {
    userData.password = config.default.admin_pass as string;
  }

  // Hash the password before saving
  userData.password = await hashPassword(userData.password);
  userData.role = UserRole.ADMIN;

  try {
    // Step 1: Generate a unique admin ID
    const adminId = await generateAdminId();
    adminData.adminId = adminId;

    // Step 2: Create Admin first to ensure the adminId exists
    const newAdmin = await prisma.admin.create({
      data: {
        ...adminData,
      },
    });

    // Step 3: Now create the User with the new adminId
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        userId: newAdmin.adminId, // Set userId to match adminId
        adminId: newAdmin.adminId, // Link to the newly created Admin
      },
    });

    console.log("Admin created:", newAdmin);
    console.log("User created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error during user creation:", error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create user profile",
    );
  }
};

// Sample function to handle an event and create a Admin and User
const createAdminFromEvent = async (e: AdminCreatedEvent) => {
  const adminData: Partial<Admin> = {
    adminId: e.id,
    firstName: e.name.firstName,
    lastName: e.name.lastName,
    middleName: e.name.middleName,
    email: e.email,
    contactNo: e.contactNo,
    gender: e.gender as Gender,
    bloodGroup: e.bloodGroup as BloodGroup,
    designation: e.designation,
    managementDeptId: e.managementDept.syncId,
  };

  const userData: Partial<User> = {
    userId: e.id,
    password: config.default.admin_pass as string,
    role: UserRole.ADMIN,
  };

  const data = await insertAdminIntoDB(adminData as Admin, userData as User);
  console.log("Result:", data);
};

// Sample function to update admin from an event
const updateAdminFromEvent = async (e: any): Promise<void> => {
  const isExist = await prisma.admin.findFirst({
    where: {
      adminId: e.id,
    },
  });

  if (!isExist) {
    await createAdminFromEvent(e);
    return;
  } else {
    const admin: Partial<Admin> = {
      adminId: e.id,
      firstName: e.name.firstName,
      lastName: e.name.lastName,
      middleName: e.name.middleName,
      profileImage: e.profileImage,
      email: e.email,
      contactNo: e.contactNo,
      gender: e.gender as Gender,
      bloodGroup: e.bloodGroup as BloodGroup,
      designation: e.designation,
      managementDeptId: e.managementDeptId.syncId,
    };
    await prisma.admin.update({
      where: {
        adminId: e.id,
      },
      data: admin as Admin,
    });
  }
};

export const UserServices = {
  insertStudentIntoDB,
  createStudentFromEvent,
  updateStudentFromEvent,
  insertFacultyIntoDB,
  createFacultyFromEvent,
  updateFacultyFromEvent,
  insertAdminIntoDB,
  createAdminFromEvent,
  updateAdminFromEvent,
};
