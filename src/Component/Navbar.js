import React, { useEffect, useRef, useState } from "react";
import {
    Navbar,
    Nav,
    Button,
    Container,
    Dropdown,
    Image,
    Form,
    FormControl,
    Fade,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
import LogoApp from "./logo/Frame.svg";
import Search from "./logo/search_black_24dp.svg";
import "./Navbar.css";
import firebase from "firebase/compat/app";
import styledComponents from "styled-components";
import axios from "axios";
import { element } from "prop-types";

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

export default function Navbar1() {
    const [currentUser, setCurrentUser] = useState([]);
    const [userData, setUserData] = useState([]);
    const [userImage, setUserImage] = useState("");
    const [project, setProject] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            if (user) {
                axios
                    .get(process.env.REACT_APP_API_ENDPOINT + "/api/users")
                    .then((res) => {
                        const resUser = res.data;
                        const thisUser = resUser.find((x) => x.id === user.uid);
                        // console.log(typeof thisUser.id);
                        if (isMounted) {
                            setUserData(thisUser);
                        }

                    });
            }
        });
        axios
            .get(process.env.REACT_APP_API_ENDPOINT + "/api/project")
            .then((res) => {
                const resProjectName = res.data;
                if (isMounted) {
                    setProject(resProjectName);
                }
                // console.log(resProjectName)
            });
        return () => {
            isMounted = false;
        };
    }, []);

    function Logout() {
        firebase.auth().signOut();
        window.location.reload(false);
    }

    //  console.log(updatedName)

    // function GetAuthentication() {
    //     return new Promise((resolve, reject) => {
    //         firebase.auth().onAuthStateChanged(user => {
    //             setCurrentUser(user)

    //         })
    //         resolve()
    //     })
    // }

    // function GetUserData() {
    //     return new Promise((resolve, reject) => {

    //         resolve()
    //     })
    // }

    // function FindUser() {
    //     return new Promise((resolve, reject) => {
    //         const thisUser = userData.find(x => x.id === currentUser.uid)
    //         console.log(typeof thisUser);
    //         setUserData(thisUser)
    //         resolve()
    //     })
    // }

    // async function run() {
    //     await GetAuthentication();
    //     await GetUserData();
    //     await FindUser();
    // }

    return (
        <Navbar className="nav" style={{ background: "#F5F5F5" }} expand="md">
            <Container fluid="lg">
                <Navbar.Brand href="#home" as={Link} to="/">
                    <img src={LogoApp} alt="LogoApp" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {!currentUser ? (
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
                        <Nav.Link className="nav_A" as={Link} to="/Login">
                            เข้าสู่ระบบ
                        </Nav.Link>
                        <Nav.Link className="Nav_btn" as={Link} to="/Signup">
                            <Button className="btn_1" variant="primary">
                                สร้างบัญชี
                            </Button>
                        </Nav.Link>
                    </Navbar.Collapse>
                ) : (
                    <Navbar.Collapse id="basic-navbar-nav" style={{ height: "80px" }}>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">
                                หน้าหลัก
                            </Nav.Link>
                            <Nav.Link as={Link} to="/StartProject">
                                เริ่มโปรเจค
                            </Nav.Link>
                        </Nav>
                        <Form className="box-cotent d-flex">
                            <Fade in={open}>
                                <div>
                                    <FormControl
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={(e) => {
                                            const search = e.target.value;
                                            const nameFilter = project.filter((val) => {
                                                return val.project_name
                                                    .toLowerCase()
                                                    .includes(search.toLowerCase());
                                            });
                                            if (search === "") {
                                                setSearchTerm([]);
                                            } else {
                                                setSearchTerm(nameFilter);
                                            }
                                        }}
                                    />
                                    {searchTerm.length != 0 && (
                                        <div className="search-drop">
                                            <div>
                                                {searchTerm.slice(0, 5).map((curName, index) => {

                                                    return (
                                                        <NavLink key={index} to={`/ProjectDetail/${curName.id}`} style={{ color: "black", textDecoration: 'none' }} >
                                                            <div className="search-menu"
                                                            >
                                                                <img
                                                                    width={24}
                                                                    height={24}
                                                                    style={{ marginRight: "20px" }}
                                                                    src={curName.project_image_link}
                                                                />
                                                                {curName.project_name}
                                                            </div>
                                                        </NavLink>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Fade>
                        </Form>

                        <Nav.Link className="nav_A" onClick={() => setOpen(!open)}>
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
                                            src={
                                                userData.user_image_link
                                                    ? userData.user_image_link
                                                    : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                            }
                                            alt="Profile"
                                            roundedCircle
                                        />
                                        <Dropdown.Menu style={{ width: "80px" }}>
                                            <Dropdown.Item eventKey="1" as={NavLink}
                                                to={`/Profile/${userData.id}`}
                                                style={{ color: "black", textDecoration: "none" }}>
                                                Profile
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="1" as={NavLink}
                                                to={`/Profilesetting/${userData.id}`}
                                                style={{ color: "black", textDecoration: "none" }}
                                            >

                                                Setting

                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="4" onClick={() => Logout()} >
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Toggle>
                                </Dropdown>
                            </Nav.Link>
                        </StyleProfile>
                    </Navbar.Collapse>
                )}
            </Container>
        </Navbar>
    );
}
