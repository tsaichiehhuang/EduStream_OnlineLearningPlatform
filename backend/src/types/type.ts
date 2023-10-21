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
  File = "file",
}

// TypeBox
import { t } from "elysia";

export const KKFileUploadComplete = t.Object({
  id: t.String({
    format: "uuid",
    default: "00000000-0000-0000-0000-000000000000",
  }),
  uploadId: t.Optional(t.String()),
  checksum_sha1: t.Optional(
    t.String({ pattern: "^[a-zA-Z0-9+/]{27}=$", default: "" })
  ), // base64 encoded SHA-1 checksum
  parts: t.Optional(
    t.Array(
      t.Object({
        part_number: t.Number({ minimum: 1, multipleOf: 1 }),
        etag: t.String(),
      })
    )
  ),
});

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
  instructorId: number;
  time: string;
}

export interface IEnroll {
  id: number;
  classId: number;
  studentId: number;
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
  hwId: number;
  userId: number;
  fileId?: number;
  content?: string;
  score?: number;
}

export interface IStream {
  id: number;
  name: string;
  startTime: Date;
  classId: number;
}

export interface IAnnouncement {
  id: number;
  date: Date;
  content: string;
}

export interface IBlock {
  id: number;
  type: BlockType;
  weekId: number;
  fileId?: number;
  hwId?: number;
  announceId?: number;
}

export interface IWeek {
  id: number;
  classId: number;
  description: string;
  week: number;
}

export interface IToken {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type IKKFileUploadComplete = (typeof KKFileUploadComplete)["static"];
