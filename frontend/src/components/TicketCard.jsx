import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTicket } from "../fetchFunctions/fetchTickets";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
// import 'bootstrap/dist/css/bootstrap.min.css';

export function TicketCard({
  ticketTitle,
  ticketDescription,
  ticketId,
  userId,
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteTicketMutation = useMutation(
    (ticketId) => deleteTicket(ticketId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tickets");
      },
    }
  );

  const handleDownload = useMutation((ticketId) => downloadFile(ticketId));

  const downloadFile = (ticketId) => {
    console.log("entered");
    const fileName = "Test";
    const aTag = document.createElement("a");
    aTag.href = "https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi"; //url to be changed to one that serves the needed file
    aTag.target = "_blank";
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  const handleUpload = useMutation((ticketId, userId) =>
    console.log("this is the upload method. Edit me!")
  );


  const handleViewClick = () => {
    navigate(`ticket-description/${ticketId}`, {
      state: {
        ticketId: ticketId,
        ticketDescription: ticketDescription,
        ticketTitle: ticketTitle,
      },
    });
  };

  return (
    <Card className="card-background" style={{ width: "18rem" }}>
      <Card.Body style={{ display: "flex", flexDirection: "column" }}>
        <Card.Title className="p-2">{ticketTitle}</Card.Title>
        <Card.Img variant="top" src="/studying-kid.jpg" />
        <Card.Text style={{ padding: 20 }}>{ticketDescription}</Card.Text>
      </Card.Body>
      <div style={{ marginTop: "auto", marginLeft: "auto" }}>
        <Button
          className="transparent-button mb-0"
          onClick={() => handleDownload.mutate(ticketId)}
        >
          {/* <img alt="" src="/download2.png"/> */}
          <FontAwesomeIcon
            icon={faDownload}
            size="2xl"
            style={{ color: "#4b95d7" }}
          />
        </Button>

        <Button
          className="transparent-button"
          style={{ marginTop: "8px" }}
          onClick={() => handleUpload.mutate(ticketId, userId)}
        >
          {/* <img alt="" src="/upload.png"/> */}
          <FontAwesomeIcon
            icon={faUpload}
            size="2xl"
            style={{ color: "#4b95d7" }}
          />
        </Button>

        <Button onClick={handleViewClick} style={{ marginTop: "15px" }}>
          View
        </Button>

        <Button
          variant="danger"
          style={{ marginTop: "15px" }}
          onClick={() => deleteTicketMutation.mutate(ticketId)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}
