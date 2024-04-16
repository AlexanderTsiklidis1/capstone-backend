DROP DATABASE IF EXISTS capstone_interviews_dev;
CREATE DATABASE capstone_interviews_dev;

\c capstone_interviews_dev;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    role TEXT,
    photo_url TEXT
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    meeting_id VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    invitee_id INTEGER REFERENCES users (id),
    inviter_id INTEGER REFERENCES users (id),
    start_time TIMESTAMP NOT NULL,
    UNIQUE(meeting_id)
);

-- CREATE TABLE interviews (
--     id SERIAL PRIMARY KEY,
--     grade_id INTEGER REFERENCES interview_grades (id),
--     review_id INTEGER REFERENCES interview_reviews (id),
--     admin_id INTEGER REFERENCES users (id),
--     interviewee_id INTEGER REFERENCES users (id),
--     date DATE
-- );

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


CREATE TABLE prompts (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    prompt TEXT NOT NULL
);

-- CREATE TABLE user_bookings (
--     user_id INTEGER REFERENCES users (id),
--     available_times_id INTEGER REFERENCES available_times (id),
--     bookings_id INTEGER REFERENCES bookings (id),
--     admin_id INTEGER REFERENCES users (id),
--     id SERIAL PRIMARY KEY
-- );

CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    events_id INTEGER REFERENCES events (id),
    invitee_id INTEGER REFERENCES users (id),
    inviter_id INTEGER REFERENCES users (id),
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
    total_grade INTEGER
);