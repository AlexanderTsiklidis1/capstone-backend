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

CREATE TABLE interviews (
    id SERIAL PRIMARY KEY,
    grade_id INTEGER REFERENCES interview_grades (id),
    review_id INTEGER REFERENCES interview_reviews (id),
    interviewer_id INTEGER REFERENCES users (id),
    interviewee_id INTEGER REFERENCES users (id)
);

CREATE TABLE interview_grades (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    grade TEXT NOT NULL
);

CREATE TABLE interview_reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    review TEXT NOT NULL
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