CREATE TABLE classroom_teachers
(
    classroom_id int NOT NULL,
    teacher_id   int NOT NULL,
    CONSTRAINT pk_classroom_teachers PRIMARY KEY (classroom_id, teacher_id)
)
GO

ALTER TABLE classroom
    ADD created_at datetime
GO

ALTER TABLE classroom
    ADD name varchar(255)
GO

CREATE UNIQUE NONCLUSTERED INDEX IX_pk_user_schedule ON user_schedule (user_id, schedule_id)
GO

ALTER TABLE classroom_teachers
    ADD CONSTRAINT fk_clatea_on_classroom FOREIGN KEY (classroom_id) REFERENCES classroom (id)
GO

ALTER TABLE classroom_teachers
    ADD CONSTRAINT fk_clatea_on_users FOREIGN KEY (teacher_id) REFERENCES users (id)
GO

DECLARE @sql [nvarchar](MAX)
SELECT @sql = N'ALTER TABLE classroom DROP CONSTRAINT ' + QUOTENAME([df].[name])
FROM [sys].[columns] AS [c]
         INNER JOIN [sys].[default_constraints] AS [df] ON [df].[object_id] = [c].[default_object_id]
WHERE [c].[object_id] = OBJECT_ID(N'classroom')
  AND [c].[name] = N'createdAt'
EXEC sp_executesql @sql
GO

ALTER TABLE classroom
    DROP COLUMN createdAt
GO

DECLARE @sql [nvarchar](MAX)
SELECT @sql = N'ALTER TABLE classroom DROP CONSTRAINT ' + QUOTENAME([df].[name])
FROM [sys].[columns] AS [c]
         INNER JOIN [sys].[default_constraints] AS [df] ON [df].[object_id] = [c].[default_object_id]
WHERE [c].[object_id] = OBJECT_ID(N'classroom')
  AND [c].[name] = N'updatedAt'
EXEC sp_executesql @sql
GO

ALTER TABLE classroom
    DROP COLUMN updatedAt
GO