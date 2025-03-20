import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "There needs to be a title"],
  },
});

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
