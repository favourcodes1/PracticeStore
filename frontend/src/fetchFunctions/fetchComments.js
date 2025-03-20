export const getComments = async () => {
  const res = await fetch("http://localhost:3005/api/v1/comments");

  if (!res.ok) {
    throw new Error("Error when trying to fetch comments");
  }

  return res.json();
};

export const getCommentsByTicket = async (id) => {
  const res = await fetch(
    `http://localhost:3005/api/v1/comments/getByTicketId/${id}`
  );

  if (!res.ok) {
    throw new Error("Error when trying to fetch comments");
  }

  return res.json();
};
export const createComment = async (body) => {
  const res = await fetch("http://localhost:3005/api/v1/comments", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Error when trying to create new comment");
  }
};

export const deleteComment = async (commentId) => {
  const res = await fetch(
    `http://localhost:3005/api/v1/comments/${commentId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Error when trying to delete a comment");
  }
};
