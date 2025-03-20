import React from "react";
import Form from "react-bootstrap/Form";

export default function Form_({
  handleNewTicketDescription,
  handleNewTicketTitle,
}) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="Enter title"
          onChange={(event) => handleNewTicketTitle(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          placeholder="Enter Description"
          onChange={(event) => handleNewTicketDescription(event.target.value)}
        />
      </Form.Group>
    </Form>
  );
}
