import Resource from "../models/resourceModel.js";

export const getResources = async (req, res) => {
  const resources = await Resource.find();

  res.status(200).json({
    status: "success",
    data: {
      resources,
    },
  });
};

export const getResourcesByTicket = async (req, res) => {
  const resources = await Resource.find({ ticketId: `${req.params.ticketId}` });

  if (!resources) {
    throw new Error(`Resource with id ${req.params.tikcetId} not found!`);
  }

  res.status(200).json({
    status: "success",
    data: {
      resources,
    },
  });
};

export const getResourceById = async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    throw new Error(`Resource with id ${req.params.id} not found!`);
  }

  res.status(200).json({
    status: "success",
    data: {
      resource,
    },
  });
};

export const createResource = async (req, res) => {
  const resource = await Resource.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      resource,
    },
  });
};

export const updateResource = async (req, res, next) => {
  const resource = await Resource.findByIdAndUpdate(req.params.id, req.body);

  if (!resource) {
    throw new Error(`Resource with id:${req.params.id} not found!`);
  }

  res.status(200).json({
    status: "success",
    data: {
      resource,
    },
  });
};

export const deleteResource = async (req, res, next) => {
  const resource = await Resource.findByIdAndDelete(req.params.id, req.body);

  if (!resource) {
    throw new Error(`Resource with id:${req.params.id} not found!`);
  }

  res.status(200).json({
    status: "success",
    data: {
      resource,
    },
  });
};
