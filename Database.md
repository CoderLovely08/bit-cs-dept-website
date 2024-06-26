# Database schema and Table Queries

```sql

-- AdminInfo
CREATE TABLE AdminInfo(
    admin_id SERIAL PRIMARY KEY,
    admin_full_name VARCHAR NOT NULL,
    admin_email VARCHAR NOT NULL,
    admin_password VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE YearInfo(
    year_id SERIAL PRIMARY KEY,
    year_name VARCHAR NOT NULL,
);

-- SemesterInfo
CREATE TABLE SemesterInfo(
    semester_id SERIAL PRIMARY KEY,
    semester_name VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- SubjectsInfo
CREATE TABLE SubjectsInfo(
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR NOT NULL,
    subject_code VARCHAR NOT NULL,
    semester_id INT NOT NULL,
    FOREIGN KEY (semester_id) REFERENCES SemesterInfo(semester_id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- GalleryImages
CREATE TABLE GalleryImages(
    image_id SERIAL PRIMARY KEY,
    image_title VARCHAR NOT NULL,
    image_link VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- NoticeInfo
CREATE TABLE NoticeInfo(
    notice_id SERIAL PRIMARY KEY,
    notice_title VARCHAR NOT NULL,
    pdf_link VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- AcademicCalendarInfo
CREATE TABLE AcademicCalendarInfo(
    calendar_id SERIAL PRIMARY KEY,
    calendar_title VARCHAR NOT NULL,
    academic_year VARCHAR NOT NULL,
    pdf_link VARCHAR NOT NULL,
    year_id INT NOT NULL,
    FOREIGN KEY (year_id) REFERENCES YearInfo(year_id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- QuestionPaperInfo
CREATE TABLE QuestionPaperInfo(
    paper_id SERIAL PRIMARY KEY,
    paper_title VARCHAR NOT NULL,
    pdf_link VARCHAR NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES SubjectsInfo(subject_id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ModelPaperInfo
CREATE TABLE ModelPaperInfo(
    paper_id SERIAL PRIMARY KEY,
    paper_title VARCHAR NOT NULL,
    pdf_link VARCHAR NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES SubjectsInfo(subject_id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- SessionalPaperInfo
CREATE TABLE SessionalPaperInfo(
    paper_id SERIAL PRIMARY KEY,
    paper_title VARCHAR NOT NULL,
    pdf_link VARCHAR NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES SubjectsInfo(subject_id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE SyllabusInfo(
	syllabus_id SERIAL PRIMARY KEY,
	syllabus_title VARCHAR NOT NULL,
	pdf_link VARCHAR NOT NULL,
	semester_id INT NOT NULL,
	FOREIGN KEY (semester_id) REFERENCES SemesterInfo(semester_id)
);

CREATE TABLE FacultyInfo(
	faculty_id SERIAL PRIMARY KEY,
	faculty_name VARCHAR NOT NULL,
	image_link VARCHAR NOT NULL,
    experience INT NOT NULL DEFAULT 0,
    description VARCHAR,
);

CREATE TABLE EventsInfo(
	event_id SERIAL, 
	event_title VARCHAR NOT NULL, 
	event_date timestamp NOT NULL,
    image_link VARCHAR NOT NULL,
	event_description VARCHAR NOT NULl,
	created_at timestamp
);

CREATE TABLE LabManualsInfo(
    manual_id SERIAL PRIMARY KEY,
    manual_title VARCHAR NOT NULL,
    semester_id INT NOT NULL,
    subject_id INT NOT NULL,
    pdf_link_src VARCHAR NOT NULL,
    FOREIGN KEY (semester_id) REFERENCES SemesterInfo(semester_id),
    FOREIGN KEY (subject_id) REFERENCES SubjectsInfo(subject_id)
);

CREATE TABLE StudentInfo(
	student_id SERIAL PRIMARY KEY,
	student_email VARCHAR UNIQUE NOT NULL,
	student_password VARCHAR NOT NULL,
	semester_id INT REFERENCES SemesterInfo(semester_id)
);

CREATE TABLE PaidEventsInfo(
	event_id SERIAL PRIMARY KEY,
	event_title VARCHAR NOT NULL, 
	event_date timestamp NOT NULL,
    image_link VARCHAR NOT NULL,
	event_description VARCHAR NOT NULl,
	amount INT NOT NULL DEFAULT 0,
	qr_link VARCHAR NOT NULL,
	collection_amount INT NOT NULL,
	created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE TransactionsInfo(
	transaction_id SERIAL PRIMARY KEY,
	transaction_amount INT NOT NULL DEFAULT 0,
	event_id INT REFERENCES PaidEventsInfo(event_id),
	student_id INT REFERENCES StudentInfo(student_id),
	created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE ContactFormInfo (
	contact_id SERIAL PRIMARY KEY,
	contact_name VARCHAR,
	contact_email VARCHAR,
	contact_phone VARCHAR,
	contact_message VARCHAR
);

INSERT INTO SemesterInfo(semester_name) 
VALUES 
('First'),
('Second'),
('Third'),
('Fourth'),
('Fifth'),
('Sixth')

INSERT INTO SubjectsInfo(subject_name, subject_code, semester_id) VALUES
('OOP - Object Oriented Programming using C++', '22316', 3),
('DSU - Data structures using C', '22317', 3),
('CGR - Computer Graphics', '22318', 3),
('DBS - Database systems', '22319', 3),
('DTE - Digital Techniques', '22320', 3)

```
