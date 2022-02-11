import React from 'react'
import { Navbar,Nav,Button,Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import LogoApp from './logo/Frame.svg'
import Search  from './logo/search_black_24dp.svg'
import './Navbar.css'


export default function Navbar1() {
    return (
         
           
            <Navbar  className="nav" style={{background:"#FFF"}}  bg="light" expand ="md"  >
            <Container  fluid ="lg" >
            <Navbar.Brand href="#home" as={Link} to="/"><img src ={LogoApp} alt='LogoApp'/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{height:"80px"}}>
            <Nav className="me-auto">
                <Nav.Link as ={Link} to ="/">หน้าหลัก</Nav.Link>
                <Nav.Link as ={Link} to ="/StartProject">เริ่มโปรเจค</Nav.Link>
               
            </Nav>
                <Nav.Link className="nav_A">
                <img src ={Search} alt='Search'/>
                </Nav.Link>
                <Nav.Link className ="nav_A" as ={Link} to="/Login">
                เข้าสู่ระบบ
                </Nav.Link>
                <Nav.Link className="Nav_btn" as ={Link} to="/Create" >
                <Button className ="btn_1" variant="primary">สร้างบัญชี</Button>
                </Nav.Link>
                {/* <span className="material-icons" href ="/">search</span>{''}
                <a className ="nav_A" as ={Link} to="/Login">เข้าสู่ระบบ</a>
                <Button className ="btn_1" variant="primary">สร้างบัญชี</Button> */}
            
            </Navbar.Collapse>
            </Container>
            </Navbar>
          
        
    )
}