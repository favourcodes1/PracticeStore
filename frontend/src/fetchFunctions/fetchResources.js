export const getResources = async () => {
  const res = await fetch("http://localhost:3005/api/v1/resources");

  if (!res.ok) {
    throw new Error("Error when trying to fetch resources");
  }

  return res.json();
};

export const getResourcesByTicket = async (id) => {
  const res = await fetch(
    `http://localhost:3005/api/v1/resources/getByTicket/${id}`
  );

  if (!res.ok) {
    throw new Error("Error when trying to fetch resources");
  }

  return res.json();
};

export const createResource = async (body) => {
  const res = await fetch("http://localhost:3005/api/v1/resources", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Error when trying to create new resource");
  }
};

export const updateResource = async (id, title) => {
  const res = await fetch(`http://localhost:3005/api/v1/resources/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Error when trying to update resource");
  }
};

export const deleteResource = async (resourceId) => {
  const res = await fetch(
    `http://localhost:3005/api/v1/resources/${resourceId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Error when trying to delete a resource");
  }
};
