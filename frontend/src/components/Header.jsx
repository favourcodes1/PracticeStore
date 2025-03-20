// import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/Picture1.jpg";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="header-container">
        <div className="logo-header">
          <img className="logo-image" src={logo} alt="" />
        </div>
      </div>
      <div className="nav-links">
        <Navbar bg="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto my-nav">
              <Link to="/" className="link" href="#home">
                Adventure Ticket Templates
              </Link>
              <Link to="./uploadedTickets" className="link" href="#link">
                Uploaded Adventure Tickets
              </Link>
              <Link to="./myTickets" className="link" href="#link">
                My Tickets
              </Link>
              <Link to="./learning-resources" className="link" href="#link">
                Learning Resources
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}
