import React from 'react'
import Card from "react-bootstrap/Card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCommentsByTicket, createComment, deleteComment} from '../fetchFunctions/fetchComments';
import Comment from './Comment';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Loader from './Loader';

// import {useMutation} from '@tanstack/react-query'

// import { MDBInput } from 'mdb-react-ui-kit';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Comments({ticketId, showComments}) {
  const { isLoading, error, data } = useQuery(["commentsByTicket"], () => getCommentsByTicket(ticketId) );
  const [commentValue, setCommentValue] = useState("");
  const {mutate, isLoadingComment, isError} = useMutation(createComment, {
    onSuccess: (successData) => {
      console.log(successData)
    }
  })

  if(isLoadingComment){
    return <Loader/>
  }

  const handleChange = (event) => {
    setCommentValue(event.target.value);
    console.log(commentValue);
  };

  const handleSubmit = (event) => {
    if(commentValue != undefined && commentValue != ''){
    const newComment = {
      ticketId: ticketId,
      contents: commentValue,
      userId: "123",
      date: new Date()
    }

    mutate(newComment);
    window.location.reload(false);
  }
  };

  

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
    <Card style={{backgroundColor: "gray"}}>
    <div style={{display: showComments, flexDirection: "column"}}>
      <Form >
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        {/* <Form.Label>Comment</Form.Label> */}
        <Form.Control as="textarea" rows={1} style={{resize: "none"}} onChange={handleChange} placeholder='Add a comment'/>
      </Form.Group>
    </Form>
    <Button onClick={handleSubmit} style={{marginLeft: "auto"}}>Submit</Button>
    </div>
        <Card.Title>Comment section</Card.Title>
        <Card.Body> 
        {isLoading ? <p>Loading...</p> : data.data.comments.map((comment) => {
          return (
            <Comment commentId = {comment._id} commentContents={comment.contents} commentDate={comment.date}></Comment>
          );
        })}
        </Card.Body>
    </Card>
    </div>
  )
}
