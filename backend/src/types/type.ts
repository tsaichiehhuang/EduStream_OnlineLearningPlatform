// Enums
export enum UserRole {
  instructor = "instructor",
  student = "student",
}

export enum FileLocation {
  KKCompany = "kkCompany",
  Local = "local",
}

export enum BlockType {
  Homework = "homework",
  Announcement = "announcement",
  Filee = "file",
}

// Interfaces
export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

export interface IClass {
  id: number;
  name: string;
  instructorId: string;
  time: string;
}

export interface IEnroll {
  id: number;
  classId: string;
  studentId: string;
}

export interface IFiles {
  id: number;
  name: string;
  path: string;
  location: FileLocation;
}

export interface IHomework {
  id: number;
  endTime: Date;
  description: string;
}

export interface ISubmission {
  id: number;
  hwId: string;
  userId: string;
  fileId?: string;
  content?: string;
  score?: number;
}

export interface IStream {
  id: number;
  name: string;
  startTime: Date;
  classId: string;
}

export interface IAnnouncement {
  id: number;
  date: Date;
  content: string;
}

export interface IBlock {
  id: number;
  type: BlockType;
  weekId: string;
  fileId?: string;
  hwId?: string;
  announceId?: string;
}

export interface IWeek {
  id: number;
  classId: string;
  description: string;
  week: number;
}

export interface IToken {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
