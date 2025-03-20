import Ticket from "../models/ticketModel.js";

export const getTickets = async (req, res) => {
  const tickets = await Ticket.find();

  res.status(200).json({
    status: "success",
    data: {
      tickets,
    },
  });
};

export const getTicketById = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new Error(`Ticket with id ${req.params.id} not found!`);
  }

  res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
};

export const createTicket = async (req, res) => {
  const ticket = await Ticket.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      ticket,
    },
  });
};

export const updateTicket = async (req, res, next) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!ticket) {
    throw new Error(`Ticket with id:${req.params.id} not found!`);
  }

  res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
};

export const deleteTicket = async (req, res, next) => {
  const ticket = await Ticket.findByIdAndDelete(req.params.id, req.body);

  if (!ticket) {
    throw new Error(`Ticket with id:${req.params.id} not found!`);
  }

  res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
};
