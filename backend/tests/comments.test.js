import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

const db_URL = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

const commentData = {
  contents: "Test Comment",
  ticketId: "60c72b0fa3c5a11111111111",
  userId: "60c72b0fa3c5a22222222222",
  date: new Date(),
};

const commentDataUpdate = {
  contents: "Updated Test Comment",
};

beforeAll(async () => {
  await mongoose.connect(db_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

let commentId;

describe("Comment API", () => {
  it("should create a new comment", async () => {
    const res = await request(app).post("/api/v1/comments").send(commentData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.comment.contents).toEqual(commentData.contents);
    commentId = res.body.data.comment._id;
  });

  it("should get a list of comments", async () => {
    const res = await request(app).get("/api/v1/comments");
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(Array.isArray(res.body.data.comments)).toBe(true);
  });

  it("should get a comment by id", async () => {
    const res = await request(app).get(`/api/v1/comments/${commentId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.comment._id).toEqual(commentId);
  });

  it("should update a comment", async () => {
    const res = await request(app)
      .patch(`/api/v1/comments/${commentId}`)
      .send(commentDataUpdate);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.comment.contents).toEqual(commentDataUpdate.contents);
  });

  it("should delete a comment", async () => {
    const res = await request(app).delete(`/api/v1/comments/${commentId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
