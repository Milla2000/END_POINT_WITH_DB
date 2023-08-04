const { Router } = require("express");
const {
  creatingaNote,
  gettingallnotes,
  noteGettingById,
  noteUpdatingByID,
  noteDeletingById,
} = require("../NotesController/notesController");

const Noteroutes = Router();

Noteroutes.post("/", creatingaNote);
Noteroutes.get("/", gettingallnotes);
Noteroutes.get("/:id", noteGettingById);
Noteroutes.put("/:id", noteUpdatingByID);
Noteroutes.delete("/:id", noteDeletingById);

module.exports = {
  Noteroutes,
};
