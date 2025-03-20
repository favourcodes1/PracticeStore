import Comment from "../models/commentModel.js";

export const getComments = async (req, res) => {
  const comments = await Comment.find();

  res.status(200).json({
    status: "success",
    data: {
      comments,
    },
  });
};

// export const getResourcesByTicket = async (req, res) => {
//     const resources = await Resource.find({ticketId: `${req.params.ticketId}`});

//     if (!resources) {
//       throw new Error(`Resource with id ${req.params.tikcetId} not found!`);
//     }

//     res.status(200).json({
//       status: "success",
//       data: {
//         resources,
//       },
//     });
// }

export const getCommentById = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    throw new Error(`Comment with id ${req.params.id} not found!`);
  }

  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
};

export const getCommentByTicketId = async (req, res) => {
  console.log(req.params.ticketId);
  const comments = await Comment.find({ ticketId: `${req.params.ticketId}` });

  if (!comments) {
    throw new Error(`Ticket with id ${req.params.ticketId} not found!`);
  }

  res.status(200).json({
    status: "success",
    data: {
      comments,
    },
  });
};

export const createComment = async (req, res) => {
  const comment = await Comment.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      comment,
    },
  });
};

export const updateComment = async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!comment) {
    throw new Error(`Comment with id:${req.params.id} not found!`);
  }

  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
};

export const deleteComment = async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id, req.body);

  if (!comment) {
    throw new Error(`Comment with id:${req.params.id} not found!`);
  }

  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
};
