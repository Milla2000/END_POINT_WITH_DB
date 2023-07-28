USE NotesDB

BEGIN TRY
    CREATE TABLE myNotesTable(
        id VARCHAR(200) PRIMARY KEY,
        Title VARCHAR(200) NOT NULL,
        Content VARCHAR(MAX) NOT NULL,
        CreatedAt DATETIME NOT NULL
    )
END TRY
BEGIN CATCH
    THROW 50001, 'Table already exists', 1;
END CATCH


-- USE JituConstructions
 
 DROP TABLE IF EXISTS myNotesTable

SELECT * FROM myNotesTable
