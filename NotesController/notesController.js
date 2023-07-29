const { v4 } = require("uuid");
const mssql = require("mssql");
const { NotesConfig } = require("../Config/config");
const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

class Notes {
  constructor(id, title, content, createdAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}

const dotenv = require("dotenv");
dotenv.config();

// creating a new note
async function creatingaNote(req, res) {
  try {
    // Extract note data from the request body
    const { title, content } = req.body;

    const id = v4();
    const createdAt = new Date();
    // new Notes(id, title, content, createdAt);

    await mssql.connect(NotesConfig);
    const pool = await mssql.connect();

    const query =
      "INSERT INTO myNotesTable (Id, Title, Content, CreatedAt) " +
      "VALUES (@id, @title, @content, @createdAt)";

    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("title", mssql.VarChar, title)
      .input("content", mssql.Text, content)
      .input("createdAt", mssql.DateTime, createdAt)
      .query(query);

    mssql.close();
    console.log("New note created successfully.");
    res.status(201).json({ message: "New note created successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error." });
  }
}

// to pull all notes from the database
async function gettingallnotes(req, res) {
  try {
    await mssql.connect(NotesConfig);
    const pool = await mssql.connect();
    const result = await pool.request().query("SELECT * FROM myNotesTable");
    mssql.close();

    console.log("Notes:", result.recordset);

    // Send the notes as JSON response
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error." });
  }
}


// Function to get a single note by its ID
async function noteGettingById(req, res) {
  try {
    
    const id = req.params.id;

    await mssql.connect(NotesConfig);
    const pool = await mssql.connect();

    const query = "SELECT * FROM myNotesTable WHERE ID = @id";
    const result = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .query(query);

    mssql.close();

    // Check if a note with the specified ID was found
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Note not found." });
    }


    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error." });
  }
}


// Function to update a note by its ID
async function noteUpdatingByID(req, res) {
  try {
    const id= req.params.id;
    const updatedNote = req.body;
    // Notes(id, title, content, createdAt);
    await mssql.connect(NotesConfig);
    const pool = await mssql.connect();
    const createdAt = new Date();

    const query = `
    UPDATE myNotesTable
    SET Title = @title, 
    Content = @content, 
    CreatedAt = @createdAt
    WHERE ID = @id`;

    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("title", mssql.VarChar, updatedNote.title)
      .input("content", mssql.Text, updatedNote.content)
      .input("createdAt", mssql.DateTime, createdAt)
      .query(query);

    mssql.close();
    console.log("Successfully updated note.");
    console.log(updatedNote);

    // Send a success response to the client
    res.status(200).json({ message: "Successfully updated note." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error." });
  }
}

// Function to delete a note by its ID
async function noteDeletingById(req, res) {
  try {
    const id = req.params.id;
    console.log("delete note", id);
    await mssql.connect(NotesConfig);
    const pool = await mssql.connect();
    // console.log(id);

    const query = `DELETE FROM myNotesTable WHERE ID = @id`;
    await pool.request().input("id", mssql.VarChar, id).query(query);

    mssql.close();
    console.log(`Successfully deleted note. ${id}`);

    // Send a success response to the client
    res.status(200).json({ message: `Successfully deleted note. ${id}` });
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




