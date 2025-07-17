CREATE TABLE classroom_schedule (
                                    classroom_id INT NOT NULL,
                                    schedule_id INT NOT NULL,
                                    active BIT DEFAULT 1,

                                    CONSTRAINT PK_classroom_schedule PRIMARY KEY (classroom_id, schedule_id),

                                    CONSTRAINT FK_classroom_schedule_classroom
                                        FOREIGN KEY (classroom_id) REFERENCES classroom(id)
                                            ON DELETE CASCADE,

                                    CONSTRAINT FK_classroom_schedule_schedule
                                        FOREIGN KEY (schedule_id) REFERENCES schedule(id)
                                            ON DELETE CASCADE
);
