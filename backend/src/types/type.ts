// Enums
enum UserRole {
  Instructor = "instructor",
  Student = "student",
}

enum FileLocation {
  KKCompany = "kkCompany",
  Local = "local",
}

enum BlockType {
  Homework = "homework",
  Announcement = "announcement",
  Filee = "file",
}

// Interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Class {
  id: string;
  name: string;
  instructorId: string;
  time: string;
}

export interface Enroll {
  id: string;
  classId: string;
  studentId: string;
}

export interface Files {
  id: string;
  name: string;
  path: string;
  location: FileLocation;
}

export interface Homework {
  id: string;
  endTime: Date;
  description: string;
}

export interface Submission {
  id: string;
  hwId: string;
  userId: string;
  fileId?: string;
  content?: string;
  score?: number;
}

export interface Stream {
  id: string;
  name: string;
  startTime: Date;
  classId: string;
}

export interface Announcement {
  id: string;
  date: Date;
  content: string;
}

export interface Block {
  id: string;
  type: BlockType;
  weekId: string;
  fileId?: string;
  hwId?: string;
  announceId?: string;
}

export interface Week {
  id: string;
  classId: string;
  description: string;
  week: number;
}

export interface ErrMessage {
  code: number;
  message: string;
}
