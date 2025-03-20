import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

const db_URL = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

const ticketData = {
  title: "Test Ticket",
  description: "This is a description for the test ticket",
  imageURL: "https://example.com/image.jpg",
  ticketType: "Test Type",
};

const ticketDataUpdate = {
  title: "Updated Test Ticket",
  description: "This is an updated description for the test ticket",
  imageURL: "https://example.com/new-image.jpg",
  ticketType: "Updated Test Type",
};

beforeAll(async () => {
  await mongoose.connect(db_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

let ticketId;

describe("Ticket API", () => {
  it("should create a new ticket", async () => {
    const res = await request(app).post("/api/v1/tickets").send(ticketData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.ticket.title).toEqual(ticketData.title);
    ticketId = res.body.data.ticket._id;
  });

  it("should get a list of tickets", async () => {
    const res = await request(app).get("/api/v1/tickets");
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(Array.isArray(res.body.data.tickets)).toBe(true);
  });

  it("should get a ticket by id", async () => {
    const res = await request(app).get(`/api/v1/tickets/${ticketId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.ticket._id).toEqual(ticketId);
  });

  it("should update a ticket", async () => {
    const res = await request(app)
      .patch(`/api/v1/tickets/${ticketId}`)
      .send(ticketDataUpdate);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.ticket.title).toEqual(ticketDataUpdate.title);
  });

  it("should delete a ticket", async () => {
    const res = await request(app).delete(`/api/v1/tickets/${ticketId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
  });
});


afterAll(() => {
  mongoose.connection.close();
});
