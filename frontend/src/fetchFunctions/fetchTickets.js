export const getTickets = async () => {
  const res = await fetch("http://localhost:3005/api/v1/tickets");

  if (!res.ok) {
    throw new Error("Error when trying to fetch tickets");
  }

  return res.json();
};

export const createTicket = async (body) => {
  const res = await fetch("http://localhost:3005/api/v1/tickets", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Error when trying to create new ticket");
  }
};

export const deleteTicket = async (ticketId) => {
  const res = await fetch(`http://localhost:3005/api/v1/tickets/${ticketId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error when trying to delete a ticket");
  }
};
