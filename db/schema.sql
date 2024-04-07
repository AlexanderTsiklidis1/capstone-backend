DROP DATABASE IF EXISTS capstone_interviews_dev;
CREATE DATABASE capstone_interviews_dev;

\c capstone_interviews_dev;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE interview_grades (
    id SERIAL PRIMARY KEY,
    interviewee_id INTEGER REFERENCES users (id),
    admin_id INTEGER REFERENCES users (id),
    grade TEXT NOT NULL,
    comment TEXT
);

CREATE TABLE interview_reviews (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES users (id),
    interviewee_id INTEGER REFERENCES users (id),
    review TEXT NOT NULL
);

CREATE TABLE interviews (
    id SERIAL PRIMARY KEY,
    grade_id INTEGER REFERENCES interview_grades (id),
    review_id INTEGER REFERENCES interview_reviews (id),
    admin_id INTEGER REFERENCES users (id),
    interviewee_id INTEGER REFERENCES users (id),
    date DATE
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    notification TEXT NOT NULL
);

CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    badge_title TEXT NOT NULL,
    badge_requirement TEXT NOT NULL
);

CREATE TABLE user_role (
    user_id INTEGER REFERENCES users (id),
    admin BOOLEAN,
    interviewee BOOLEAN
);

CREATE TABLE prompts (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    prompt TEXT NOT NULL
);

CREATE TABLE bookings (
    user_id INTEGER REFERENCES users (id),
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES users (id),
    date DATE,
    admin_confirmed BOOLEAN,
    video_meeting_id TEXT NOT NULL,
    expiration_time INTEGER
);

CREATE TABLE available_times (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES users (id),
    start_time TIME,
    end_time TIME,
    date DATE
);

CREATE TABLE user_bookings (
    user_id INTEGER REFERENCES users (id),
    available_times_id INTEGER REFERENCES available_times (id),
    bookings_id INTEGER REFERENCES bookings (id),
    admin_id INTEGER REFERENCES users (id),
    id SERIAL PRIMARY KEY
);

CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    interview_id INTEGER REFERENCES interviews (id),
    interviewee_id INTEGER REFERENCES users (id),
    admin_id INTEGER REFERENCES users (id),
    prompt_1_id INTEGER REFERENCES prompts (id),
    prompt_1_grade INTEGER NOT NULL,
    prompt_1_notes TEXT,
    prompt_2_id INTEGER REFERENCES prompts (id),
    prompt_2_grade INTEGER NOT NULL,
    prompt_2_notes TEXT,
    prompt_3_id INTEGER REFERENCES prompts (id),
    prompt_3_grade INTEGER NOT NULL,
    prompt_3_notes TEXT,
    prompt_4_id INTEGER REFERENCES prompts (id),
    prompt_4_grade INTEGER NOT NULL,
    prompt_4_notes TEXT,
    prompt_5_id INTEGER REFERENCES prompts (id),
    prompt_5_grade INTEGER NOT NULL,
    prompt_5_notes TEXT,
    prompt_6_id INTEGER REFERENCES prompts (id),
    prompt_6_grade INTEGER NOT NULL,
    prompt_6_notes TEXT,
    prompt_7_id INTEGER REFERENCES prompts (id),
    prompt_7_grade INTEGER NOT NULL,
    prompt_7_notes TEXT,
    prompt_8_id INTEGER REFERENCES prompts (id),
    prompt_8_grade INTEGER NOT NULL,
    prompt_8_notes TEXT,
    total_grade INTEGER NOT NULL
);