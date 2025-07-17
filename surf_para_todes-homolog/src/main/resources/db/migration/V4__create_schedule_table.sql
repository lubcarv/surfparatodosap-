CREATE TABLE schedule (
                          id INT IDENTITY(1,1) PRIMARY KEY,
                          shift VARCHAR(10) NOT NULL CHECK (shift IN ('manhã', 'tarde')),
                          schedule_time VARCHAR(20) NOT NULL,
                          active BIT DEFAULT 1
);
