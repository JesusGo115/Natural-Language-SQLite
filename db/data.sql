-- INSERT DATA

INSERT INTO Instructors
    (person_id, pass_rate)
VALUES
    (1, 100), -- Dallin
    (3, NULL),
    (4, 99),
    (5, 90),
    (6, 95);

INSERT INTO Students
    (person_id, enrollment_date, graduation_date)
VALUES
    (1, "2020-01-01","2024-01-01"), -- Dallin
    (2, "2022-07-01", NULL), -- Jacob
    (8, "2022-07-01", NULL),
    (9, "2022-01-01", NULL),
    (10,"2022-01-01", NULL),
    (11,"2022-01-01", "2024-01-01"),
    (12,"2023-07-01", "2023-07-02");

INSERT INTO Persons
    (title, first_name, last_name)
VALUES
    ("Student Instructor",  "Dallin", "Wise"),
    (NULL,                  "Jacob", "Wise"),
    ("Associate Professor", "Fred", "Clift"),
    ("Professor",           "Cory", "Barker"),
    ("Research Professor",  "Jacob", "Crandall"),

    ("Research Professor",  "Ryan", "Farrell"),
    (NULL,                  "Rick", "Anderson"),
    (NULL,                  "Luke", "Bacigalupi"),
    (NULL,                  "Carson", "Chubbuck"),
    (NULL,                  "Kimball", "Jardine"),

    (NULL,                  "John", "Smith"),
    (NULL,                  "Sally", "Mae");

INSERT INTO Courses
    (id, title, credit_hours, department)
VALUES
    ("CS 142", "Introduction to Computer Programming", 3, "Computer Science"),
    ("CS 111", "Introduction to Computer Science", 3, "Computer Science"),
    ("A GTG 100", "American Heritage", 3, "General Ed"),
    ("CS 202", "Software Engineering Lab 1", 1, "Computer Science"),
    ("CS 203", "Software Engineering Lab 2", 1, "Computer Science"),

    ("CS 204", "Software Engineering Lab 3", 1, "Computer Science"),
    ("CS 224", "Introduction to Computer Systems", 3, "Computer Science"),
    ("MATH 213", "Introduction to Linear Algebra", 2, "Math"),
    ("MATH 215", "Computational Linear Algebra", 1, "Math"),
    ("CS 235", "Data Structures and Algorithms", 3, "Computer Science"),

    ("CS 236", "Descrete Structures", 3, "Computer Science"),
    ("CS 240", "Advanced Programming Concepts", 4, "Computer Science"),
    ("CHEM 105", "General College Chemistry 1 ", 4, "Chemistry"),
    ("CS 260", "Web Programming", 3, "Computer Science"),
    ("CS 312", "Algorithm Design and Analysis", 3, "Computer Science"),

    ("CS 465", "Computer Security", 3, "Computer Science");


INSERT INTO Sections
    (course_id, section_number, instructor_id, semester)
VALUES
    ("CS 142", 1, NULL, "Winter 2020"),    ("CS 142", 2, NULL, "Winter 2020"),    ("CS 142", 3, NULL, "Winter 2020"),
    ("CS 142", 1, NULL, "Fall 2020"),      ("CS 142", 2, NULL, "Fall 2020"),      ("CS 142", 3, NULL, "Fall 2020"),  
    ("CS 142", 1, NULL, "Winter 2021"),    ("CS 142", 2, NULL, "Winter 2021"),    ("CS 142", 3, NULL, "Winter 2021"),
    ("CS 142", 1, NULL, "Fall 2021"),      ("CS 142", 2, NULL, "Fall 2021"),      ("CS 142", 3, NULL, "Fall 2021"),  
    ("CS 142", 1, NULL, "Winter 2022"),    ("CS 142", 2, NULL, "Winter 2022"),    ("CS 142", 3, NULL, "Winter 2022"), -- 15

    ("CS 111", 1, NULL, "Fall 2022"),      ("CS 111", 2, NULL, "Fall 2022"),      ("CS 111", 3, NULL, "Fall 2022"),
    ("CS 111", 1, NULL, "Winter 2023"),    ("CS 111", 2, NULL, "Winter 2023"),    ("CS 111", 3, NULL, "Winter 2023"),
    ("CS 111", 1, NULL, "Fall 2023"),      ("CS 111", 2, NULL, "Fall 2023"),      ("CS 111", 3, NULL, "Fall 2023"), -- 24
    ("A GTG 100", 42, NULL, "Fall 2022"), -- 25
    
    ("CS 312", 2, 5, "Fall 2023"), -- 26
    ("CS 260", 4, NULL, "Winter 2023"),
    ("CS 236", 2, 3, "Winter 2023"),
    ("CS 224",  7, 3, "Fall 2022"),
    ("CS 235", 2, 4, "Fall 2022"),
    
    ("CS 465", 1, 2, "Fall 2023"), -- 31
    ("MATH 213", 1, NULL, "Fall 1999"), ("MATH 213", 1, 1, "Fall 2025"); -- dallin as teacher

INSERT INTO Enrollments
    (student_id, section_id, grade)
VALUES
    (1, 31, 4.00), (1, 32, 4.00), (1, 25,  3.00), -- Dallin

    (2, 33, 0.00), (2, 26, 4.00), (2, 27, 2.70), (2, 28, 4.00), (2, 29, 4.00), -- Jacob Wise
    (2, 30, 4.00), (2, 31, 3.70),

    (3, 25, 3.30), -- Luke

    -- Carson

    (5, 25, 4.00), (5, 26, 4.00), -- Kimball

    (6, 25, 2.00), -- John

    (7, 25, 5.00), (7, 26, 4.00), (7, 30, 4.00); -- Sally
