import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Button from "react-bootstrap/esm/Button";

import { CustomModal } from "./Modal";
import Loader from "./Loader";
import { getTickets, createTicket } from "../fetchFunctions/fetchTickets";
import { TicketCard } from "./TicketCard";
import AddTicketForm from "./AddTicketForm";
import "../styles/CardsSection.css";

export default function CardsSection({ menu }) {
  const { isLoading, error, data } = useQuery(["tickets"], getTickets);
  const queryClient = useQueryClient();

  const [show, setShow] = useState();
  const [newTicketDescription, setNewTicketDescription] = useState();
  const [newTicketTitle, setNewTicketTitle] = useState();

  const addTicketMutation = useMutation(
    (newTicket) => createTicket(newTicket),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tickets");
      },
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return <h1>Something went wrong when fetching tickets!</h1>;
  }

  const handleNewTicketDescription = (description) => {
    setNewTicketDescription(description);
  };

  const handleNewTicketTitle = (title) => {
    setNewTicketTitle(title);
  };

  const handleModalShow = () => setShow(true);
  const handleModalClose = () => setShow(false);

  return (
    <>
      <Button
        className="new-ticket-btn"
        size="lg"
        variant="primary"
        onClick={handleModalShow}
      >
        Add New Ticket
      </Button>
      <CustomModal
        show={show}
        handleClose={handleModalClose}
        title="Add new Adventure Ticket"
        handleSave={() => {
          addTicketMutation.mutate({
            title: newTicketTitle,
            description: newTicketDescription,
          });
          handleModalClose();
        }}
      >
        <AddTicketForm
          handleNewTicketTitle={handleNewTicketTitle}
          handleNewTicketDescription={handleNewTicketDescription}
        />
      </CustomModal>

      <div className="cards-wrapper">
        {data.data.tickets.map((ticket) => {
          return (
            <TicketCard
              key={ticket._id}
              ticketTitle={ticket.title}
              ticketDescription={ticket.description}
              ticketId={ticket._id}
            />
          );
        })}
      </div>
    </>
  );
}
