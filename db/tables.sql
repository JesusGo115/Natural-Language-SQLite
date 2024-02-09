-- CREATE TABLES

CREATE TABLE IF NOT EXISTS Persons (
	person_id  INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Students (
	id  INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER NOT NULL UNIQUE,
    enrollment_date DATE NOT NULL,
    graduation_date DATE,
    major TEXT,
    
    FOREIGN KEY (person_id) REFERENCES Persons(person_id)
);

CREATE TABLE IF NOT EXISTS Instructors (
	id  INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER NOT NULL UNIQUE,
    pass_rate FLOAT CHECK (pass_rate IS NULL OR pass_rate BETWEEN 0.0 AND 100.0),
    FOREIGN KEY (person_id) REFERENCES Persons(person_id)
);

CREATE TABLE IF NOT EXISTS Courses (
	id   TEXT NOT NULL UNIQUE PRIMARY KEY,
	title	TEXT NOT NULL,
    credit_hours INTEGER NOT NULL,
    department TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Sections ( -- aka "classes"
	id  INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
	course_id	TEXT NOT NULL,
    section_number  INTEGER NOT NULL,
	instructor_id  INTEGER,
    semester TEXT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Courses(id),
    FOREIGN KEY (instructor_id) REFERENCES Instructors(id)
);

CREATE TABLE IF NOT EXISTS Enrollments (
	student_id  INTEGER NOT NULL,
	section_id   TEXT NOT NULL,
	grade   FLOAT CHECK (grade BETWEEN 0.0 AND 5.0),
    
    FOREIGN KEY (student_id) REFERENCES Students(id),
    FOREIGN KEY (section_id) REFERENCES Sections(id)
);