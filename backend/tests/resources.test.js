import request from "supertest";
import mongoose from "mongoose";
import app from "../app";

const resourceData = {
  title: "Test Resource",
};

const db_URL = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

describe("Resource API", () => {
  let resourceId;

  beforeAll(async () => {
    await mongoose.connect(db_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create a new resource", async () => {
    const res = await request(app).post("/api/v1/resources").send(resourceData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.resource).toHaveProperty("_id");

    resourceId = res.body.data.resource._id;
  });

  it("should get a list of resources", async () => {
    const res = await request(app).get("/api/v1/resources");

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(Array.isArray(res.body.data.resources)).toBe(true);
  });

  it("should get a resource by id", async () => {
    const res = await request(app).get(`/api/v1/resources/${resourceId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.resource._id).toEqual(resourceId);
  });

  it("should update a resource", async () => {
    const updatedData = {
      title: "updated title",
    };

    const res = await request(app)
      .patch(`/api/v1/resources/${resourceId}`)
      .send(updatedData);

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.resource._id).toEqual(resourceId);
  });

  it("should delete a resource", async () => {
    const res = await request(app).delete(`/api/v1/resources/${resourceId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.resource._id).toEqual(resourceId);
  });
});
