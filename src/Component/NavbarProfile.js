import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Image,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import LogoApp from "./logo/Frame.svg";
import Search from "./logo/search_black_24dp.svg";
import Profile from "../All_Img/bd1680f33671fd642f3a61e0d6ce3de7.jpg";
import "./Navbar.css";
import styledComponents from "styled-components";

const StyleProfile = styledComponents.div`
span{
    padding: 0px;
    margin: 0px;
}
.morebutton{
    width: 54px;
    height: 54px;
}
.imguser{
    object-fit: cover;
}
.nav_img{
    padding: 0px;
}
.dropdown-menu{
 
}
.dropdown-toggle::after {
    visibility: hidden;
  }
`;

export default function NavbarProfile() {
  return (
    <Navbar className="nav" style={{ background: "#FFF" }} expand="md">
      <Container fluid="lg">
        <Navbar.Brand href="#home" as={Link} to="/">
          <img src={LogoApp} alt="LogoApp" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ height: "80px" }}>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              หน้าหลัก
            </Nav.Link>
            <Nav.Link as={Link} to="/StartProject">
              เริ่มโปรเจค
            </Nav.Link>
          </Nav>
          <Nav.Link className="nav_A">
            <img src={Search} alt="Search" />
          </Nav.Link>
          <StyleProfile>
            {" "}
            <Nav.Link className="nav_img">
              <Dropdown className="morebutton" align="end">
                <Dropdown.Toggle
                  id="dropdown"
                  className="dropdown-box"
                  as="span"
                >
                  <Image
                    className="imguser"
                    width={54}
                    height={54}
                    src={Profile}
                    alt="Profile"
                    roundedCircle
                  />
                  <Dropdown.Menu style={{ width: "80px" }}>
                    <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Setting</Dropdown.Item>
                    <Dropdown.Item eventKey="3">My Project</Dropdown.Item>
                    <Dropdown.Item eventKey="4">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Toggle>
              </Dropdown>
            </Nav.Link>
          </StyleProfile>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
