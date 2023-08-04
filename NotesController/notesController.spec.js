
const mssql = require("mssql");
const { creatingaNote, gettingallnotes } = require("./notesController");


jest.mock("mssql");


const req = {
  body: {
    title: "Test Note",
    content: "This is a test note content.",
  },
};

// Mocked response data
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe("creatingaNote function", () => {
  it("should create a new note successfully", async () => { 
    const pool = {
      connected: true, // Mock the connected property
      request: jest.fn().mockReturnThis(),
    };
    mssql.connect.mockResolvedValue(pool);

    const queryResult = { rowsAffected: [1] };
    pool.request().query.mockResolvedValue(queryResult);

    await creatingaNote(req, res);

    expect(mssql.connect).toHaveBeenCalled();
    expect(pool.request).toHaveBeenCalled();
    expect(pool.request().query).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "New note created successfully.",
    });
  });

  it("handle internal server error", async () => {
    // Mock the mssql.connect method 
    mssql.connect.mockRejectedValue(new Error("Mocked database error"));

    await creatingaNote(req, res);

    expect(mssql.connect).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error." });
  });
});

