const { getAllBooks, getBookById, addBook } = require("../book.js");
const { app, validateBook } = require("../index.js");
const http = require("http");
const request = require("supertest");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  validateBook: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3002, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API TEST", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("create new book test", async () => {
    const mockBook = {
      title: "1996",
      author: "sudhir",
    };

    const result = await request(server).post("/api/book/new").send(mockBook);
    expect(result.status).toBe(201);
    expect(result.body).toEqual({
      id: 5,
      title: "1996",
      author: "sudhir",
    });
  });

  test("Throw error message if wrong data provided", async () => {
    const mockBook = {
      title: 1996,
      author: "sudhir",
    };
    const result = await request(server).post("/api/book/new").send(mockBook);
    expect(result.status).toBe(400);
    expect(result.body.error).toEqual("Book title is invalid!");
  });
});
