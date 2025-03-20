import { useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getResourcesByTicket } from "../fetchFunctions/fetchResources";
import { useMutation, useQuery } from "@tanstack/react-query";
import Comments from "./Comments";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faComment } from "@fortawesome/free-solid-svg-icons";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function TicketDescription() {
  const location = useLocation();
  const props = location.state; // Access the passed props
  const [showComments, setShowComments] = useState("none");
  // console.log('Printing stuff');
  console.log(props.ticketId);
  // console.log(props.ticketDescription);
  const handleDownload = useMutation((ticketId) => downloadFile(ticketId));

  const downloadFile = (ticketId) => {
    const fileName = "Test";
    const aTag = document.createElement("a");
    aTag.href = "https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi"; //url to be changed to one that serves the needed file
    aTag.target = "_blank";
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  const handleComment = () => {
    if (showComments == "flex") {
      console.log("proba");
      setShowComments("none");
    } else {
      setShowComments("flex");
      console.log("none");
    }
  };

  // Comment out next three lines after routing
  // ticketId = "6468e11804ec5b82c0b8d102";
  // ticketDescription =
  //   "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta fuga necessitatibus, qui, beatae, officiis amet quis iste animi dolore debitis fugiat. Nulla veritatis aliquam nam! Ratione libero atque exercitationem eligendi?";
  // ticketTitle = "Test title";

  // Comment out next three lines after routing
  //  ticketId = "6468e11804ec5b82c0b8d102";
  //  ticketDescription = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta fuga necessitatibus, qui, beatae, officiis amet quis iste animi dolore debitis fugiat. Nulla veritatis aliquam nam! Ratione libero atque exercitationem eligendi?";
  //  ticketTitle = "Test title";

  const { isLoading, error, data } = useQuery(["resourcesByTicket"], () =>
    getResourcesByTicket(props.ticketId)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "25%" }}>
          <Card>
            <h3>Learning materials</h3>
            {/* {isLoading ? <p>Loading...</p> : data.data.resources[0].name} */}
            <ul>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                data.data.resources.map((resource) => {
                  return <li>{resource.name}</li>;
                })
              )}
            </ul>
          </Card>
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              className="ticket-button"
              style={{ display: "flex", flexDirection: "row" }}
              onClick={() => handleDownload.mutate(props.ticketId)}
            >
              {/* <img src="/download2.png" style={{marginRight: "0"}} /> */}
              <FontAwesomeIcon
                icon={faDownload}
                size="2xl"
                style={{
                  color: "#ffffff",
                  marginTop: "auto",
                  marginBottom: "auto",
                  padding: "2%",
                }}
              />
              <p
                style={{
                  marginLeft: "20%",
                  marginRight: "80%",
                  marginTop: "6%",
                }}
              >
                Download
              </p>
            </Button>
            <Button
              className="ticket-button"
              style={{ display: "flex", flexDirection: "row" }}
              onClick={() => handleComment()}
            >
              {/* <img src="/upload.png" style={{marginRight: "0"}} /> */}
              <FontAwesomeIcon
                icon={faComment}
                size="2xl"
                style={{
                  color: "#ffffff",
                  marginTop: "auto",
                  marginBottom: "auto",
                  padding: "2%",
                }}
              />
              <p
                style={{
                  marginLeft: "20%",
                  marginRight: "80%",
                  marginTop: "6%",
                }}
              >
                Comment
              </p>
            </Button>
          </div>
        </div>
        <div style={{ marginLeft: "auto", width: "75%", height: "100%" }}>
          <Card
            style={{ minHeight: "300px", backgroundColor: "rgb(75 149 215)" }}
          >
            <p style={{ color: "white" }}>
              <h1 style={{ padding: "2%" }}>{props.ticketTitle}</h1>
              <p>{props.ticketDescription}</p>
            </p>
          </Card>
        </div>
      </div>
      <Comments ticketId={props.ticketId} showComments={showComments}>
        {" "}
        Comment section{" "}
      </Comments>
    </div>
  );
}
