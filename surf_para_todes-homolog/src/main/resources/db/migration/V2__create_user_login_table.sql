CREATE TABLE user_login (
                            id INT IDENTITY(1,1) PRIMARY KEY,

                            full_name VARCHAR(100) NOT NULL,
                            email VARCHAR(100) NOT NULL UNIQUE,
                            password VARCHAR(255) NOT NULL,

                            phone VARCHAR(15),

                            created_at DATETIME DEFAULT GETDATE(),

                            role VARCHAR(50) NOT NULL,

                            user_id INT NOT NULL UNIQUE,

                            CONSTRAINT fk_user_login_user FOREIGN KEY (user_id) REFERENCES users(id)
);
