const { v4 } = require("uuid");
const mssql = require("mssql");
const { NotesConfig } = require("../Config/config");

class Notes {
  constructor(id, title, content, createdAt) {
    this.id = id;
    this.NoteTitle = title;
    this.NoteContent = content;
    this.CreatedAt = createdAt;
  }
}

// const mssql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();


// creating a new note
async function creatingaNote(note) {
  try {
    const id = v4();
    await mssql.connect(NotesConfig);
    const pool = await mssql.connect();
    const query = `INSERT INTO myNotesTable (Id, Title, Content, CreatedAt) 
                        VALUES ('${note.id}', '${note.NoteTitle}', '${
      note.Content
    }', '${note.CreatedAt.toISOString()}')`;
    await pool.request().query(query);
    mssql.close();
    console.log("New note created successfully.");
  } catch (err) {
    console.error(err.message);
  }
}

// to pull all notes from the database
async function gettingallnotes() {
  try {
    await mssql.connect(NotesConfig);
    const pool = await mssql.connect();
    const result = await pool.request().query("SELECT * FROM myNotesTable");
    mssql.close();
    return result.recordset;
  } catch (err) {
    console.error(err.message);
    return [];
  }
}

// Function to get a single note by its ID
async function noteGettingById(id) {
  try {
    await mssql.connect(NotesConfig);
    const pool = await mssql.connect();
    const result = await pool
      .request()
      .query(`SELECT * FROM myNotesTable WHERE ID = '${id}'`);
    mssql.close();
    return result.recordset[0];
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

// Function to update a note by its ID
async function noteUpdatingByID(id, updatedNote) {
  try {
    await mssql.connect(NotesConfig);
    const pool = await mssql.connect();
    const query = `
    UPDATE myNotesTable
    SET Title = '${updatedNote.NoteTitle}', 
    Content = '${updatedNote.NoteContent}', 
    CreatedAt = '${updatedNote.CreatedAt.toISOString()}'
    WHERE ID = '${id}'`;
    await pool.request().query(query);
    mssql.close();
    console.log("successfully updated note.");
  } catch (err) {
    console.error(err.message);
  }
}

// Function to delete a note by its ID
async function noteDeletingById(id) {
  try {
    await mssql.connect(NotesConfig);
    const pool = await mssql.connect();
    const query = `DELETE FROM notesTable WHERE ID = '${id}'`;
    await pool.request().query(query);
    mssql.close();
    console.log("successfully deleted note.");
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  Notes,
  creatingaNote,
  gettingallnotes,
  noteGettingById,
  noteUpdatingByID,
  noteDeletingById,
};





