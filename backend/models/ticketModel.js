import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "There needs to be a title"],
  },
  description: {
    type: String,
    required: [true, "There needs to be a description"],
  },
  imageURL: {
    type: String,
  },
  ticketType:{
    type: String
  }
});


const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
