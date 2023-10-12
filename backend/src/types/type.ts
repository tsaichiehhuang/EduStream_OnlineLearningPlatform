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
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface Class {
  id: string;
  name: string;
  instructorId: string;
  time: string;
}

interface Enroll {
  id: string;
  classId: string;
  studentId: string;
}

interface Files {
  id: string;
  name: string;
  path: string;
  location: FileLocation;
}

interface Homework {
  id: string;
  endTime: Date;
  description: string;
}

interface Submission {
  id: string;
  hwId: string;
  userId: string;
  fileId?: string;
  content?: string;
  score?: number;
}

interface Stream {
  id: string;
  name: string;
  startTime: Date;
  classId: string;
}

interface Announcement {
  id: string;
  date: Date;
  content: string;
}

interface Block {
  id: string;
  type: BlockType;
  weekId: string;
  fileId?: string;
  hwId?: string;
  announceId?: string;
}

interface Week {
  id: string;
  classId: string;
  description: string;
  week: number;
}
