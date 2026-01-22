import { Course } from './Course';

// Vom Backend (DTO)
export interface RegistrationDto {
  id: string;
  name: string;
  birthdate: string;
  newsletter: boolean;
  course?: Course;
  courseId: number;
  isDeleting: boolean;
}

export interface RegistrationModel {
  name: string;
  birthdate: string;
  newsletter: boolean;
  courseId: number;
}
