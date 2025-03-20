import React from 'react'
import Card from "react-bootstrap/Card";
import { deleteComment } from '../fetchFunctions/fetchComments';
import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ReactTimeAgo from 'react-time-ago'


TimeAgo.addDefaultLocale(en)
export default function Comment({commentId, commentContents, userName, commentDate}) {
    userName = "testUser"; //line to be deleted when the functionality for fetching users is added
    
    const handleDelete = () => {
      deleteComment(commentId);
      window.location.reload(false);
    }

  return (
    <Card style={{display: "flex", flexDirection: "column",backgroundColor: "white", width: "60%", marginLeft:"auto", marginRight: "auto"}}>
    <div style={{display: "flex", flexDirection: "row"}}>
    <p style={{marginRight: "auto"}}> {commentContents}</p>
    <Button variant='danger' onClick={handleDelete}>Delete</Button>
    </div>
    <div style={{display: "flex", flexDirection: "row"}}>
    <p style = {{fontSize: "0.75em", marginLeft: "0px"}}>Posted by: {userName}</p>
    <p style = {{fontSize: "0.75em", marginLeft: "auto"}}><ReactTimeAgo date={commentDate}/></p>
    </div>
    </Card>
  )
}
