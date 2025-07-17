CREATE TABLE user_schedule (
                               user_id INT NOT NULL,
                               schedule_id INT NOT NULL,

                               PRIMARY KEY (user_id, schedule_id),

                               CONSTRAINT fk_user_schedule_user FOREIGN KEY (user_id) REFERENCES users(id),
                               CONSTRAINT fk_user_schedule_schedule FOREIGN KEY (schedule_id) REFERENCES schedule(id)
);

