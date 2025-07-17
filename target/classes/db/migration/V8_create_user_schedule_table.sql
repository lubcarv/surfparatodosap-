CREATE TABLE user_schedule (
                                    student_id INT NOT NULL,
                                    schedule_id INT NOT NULL,
                                    PRIMARY KEY (student_id, schedule_id),
                                    FOREIGN KEY (schedule_id) REFERENCES schedule(id),
                                    FOREIGN KEY (student_id) REFERENCES users(id)
);
