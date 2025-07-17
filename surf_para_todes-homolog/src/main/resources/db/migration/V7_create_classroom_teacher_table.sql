CREATE TABLE classroom_teachers (
                                    classroom_id INT NOT NULL,
                                    teacher_id INT NOT NULL,
                                    PRIMARY KEY (classroom_id, teacher_id),
                                    FOREIGN KEY (classroom_id) REFERENCES classroom(id),
                                    FOREIGN KEY (teacher_id) REFERENCES users(id)
);
