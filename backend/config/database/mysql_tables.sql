-- USE WITH CAUTION!! This DELETES and RECONSTRUCTS ALL TABLES,
-- which means YOU WILL LOST ALL DATA!

DROP DATABASE IF EXISTS EduStream;

CREATE DATABASE EduStream;

USE EduStream;

DROP TABLE IF EXISTS User;

CREATE TABLE User (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('instructor', 'student') NOT NULL
    UNIQUE (email)
);

DROP TABLE IF EXISTS Class;

CREATE TABLE Class (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    instructorId INT UNSIGNED NOT NULL,
    time VARCHAR(50) NOT NULL,
    FOREIGN KEY (instructorId) REFERENCES User(id)
);

DROP TABLE IF EXISTS Enroll;

CREATE TABLE Enroll (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    classId INT UNSIGNED NOT NULL,
    studentId INT UNSIGNED NOT NULL,
    FOREIGN KEY (classId) REFERENCES Class(id),
    FOREIGN KEY (studentId) REFERENCES User(id)
);

DROP TABLE IF EXISTS File;

CREATE TABLE File (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    location ENUM('kkCompany', 'local') NOT NULL
);

DROP TABLE IF EXISTS Homework;

CREATE TABLE Homework (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    endTime DATETIME NOT NULL,
    description TEXT NOT NULL
);

DROP TABLE IF EXISTS Submission;

CREATE TABLE Submission (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hwId INT UNSIGNED NOT NULL,
    userId INT UNSIGNED NOT NULL,
    fileId CHAR(36),
    content TEXT,
    score FLOAT,
    FOREIGN KEY (hwId) REFERENCES Homework(id),
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (fileId) REFERENCES File(id)
);

DROP TABLE IF EXISTS Stream;

CREATE TABLE Stream (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    startTime DATETIME NOT NULL,
    classId INT UNSIGNED NOT NULL,
    FOREIGN KEY (classId) REFERENCES Class(id)
);

DROP TABLE IF EXISTS Announcement;

CREATE TABLE Announcement (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    date DATETIME NOT NULL,
    content TEXT NOT NULL
);

DROP TABLE IF EXISTS Week;

CREATE TABLE Week (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    classId INT UNSIGNED NOT NULL,
    description TEXT NOT NULL,
    week TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (classId) REFERENCES Class(id)
);

DROP TABLE IF EXISTS Block;

CREATE TABLE Block (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type ENUM('homework', 'announcement', 'file') NOT NULL,
    weekId INT UNSIGNED NOT NULL,
    fileId CHAR(36),
    hwId INT UNSIGNED,
    announceId INT UNSIGNED,
    FOREIGN KEY (weekId) REFERENCES Week(id),
    FOREIGN KEY (fileId) REFERENCES File(id),
    FOREIGN KEY (hwId) REFERENCES Homework(id),
    FOREIGN KEY (announceId) REFERENCES Announcement(id)
);