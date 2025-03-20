import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: [true, "There needs to be content to the comment"],
  },
  ticketId: {
    type: String,
    required: [true, "There needs to be a ticket id"],
  },
  userId: {
    type: String,
    required: [true, "There needs to be a user id"]
  },
  date: {
    type: Date,
    required: [true, "There needs to be a date for the comment"]
  }

});


const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
