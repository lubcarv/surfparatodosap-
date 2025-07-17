CREATE TABLE classroom (
                           id INT IDENTITY(1,1) PRIMARY KEY,
                           created_at DATETIME2 DEFAULT GETDATE(),
                           updated_at DATETIME2 NULL
);
