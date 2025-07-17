CREATE TABLE users (
                       id INT IDENTITY(1,1) PRIMARY KEY,

                       user_role INT NOT NULL,
                       register_name VARCHAR(100) NOT NULL,
                       social_name VARCHAR(100),

                       birth_date DATE NOT NULL,

                       guardian_name VARCHAR(100) NOT NULL,
                       guardian_relationship VARCHAR(50) NOT NULL,
                       guardian_phone VARCHAR(15) NOT NULL,

                       gender VARCHAR(20),
                       race VARCHAR(20),

                       phone VARCHAR(15),
                       email VARCHAR(100),

                       schooling INT NOT NULL,

                       role VARCHAR(50) NOT NULL,

                       active BIT DEFAULT 1,

                       created_at DATETIME2 DEFAULT GETDATE(),

                       CONSTRAINT uq_users_email UNIQUE (email)
);
