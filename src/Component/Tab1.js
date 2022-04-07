import React from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import IconLock from './logo/lock_black_24dp.svg'
import styled from 'styled-components';
import './Tab1.css'
import ComLink1 from './ComLink1';
import CardProfile from './Card/CardProfile';
import CardTeam from './Card/CardTeam';
import Accordion1 from './Accordion/Accordion1';
import FormFAQ from './Form/FormFAQ ';

const StyleTab1 = styled.div`
.Tab-Grid{
display: grid;
grid-template-columns: auto auto ;
}
.grop-1{
    margin:60px;
  align-items: center;
}
`;

const Icon1 =()=><span class="material-icons">lock </span>

function Tab1() {
  return (
  <StyleTab1>
  <Container  style={{maxWidth:"1140px"}}>
      <Tab.Container  style={{height:"72px"}} defaultActiveKey="link-2" >
        <Nav style={{height:"72px"}} >
        <Nav.Item  >
            <Nav.Link className="Items-1" eventKey="link-1" disabled>
                <img  src ={IconLock} alt='Lock'/>
                รายละเอียด</Nav.Link >
        </Nav.Item>
        <Nav.Item  >
            <Nav.Link  className="Items-2" eventKey="link-2"> ตำแหน่งที่ต้องการ</Nav.Link>
        </Nav.Item>
        <Nav.Item  >
            <Nav.Link className="Items-3" eventKey="link-3"> คำถามที่พบบ่อย</Nav.Link>
        </Nav.Item>
        <Nav.Item >
            <Nav.Link  className="Items-4"  eventKey="link-4" disabled> รีวิว</Nav.Link>
        </Nav.Item>
        </Nav>
        <hr className="MM"/>
        <Tab.Content className="Tab-Grid">
            <Tab.Pane eventKey="link-1">
                <h1>dsadad</h1>
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
                <ComLink1/>
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
                <Accordion1/>
                <FormFAQ/>
            </Tab.Pane>
            {/* <Tab.Pane eventKey="link-4">
                <h1>aaa</h1>
            </Tab.Pane> */}
            
            <div className="grop-1">
            <CardProfile/>
            <br/>
            <CardTeam/>
            </div>
            
        </Tab.Content>
      </Tab.Container>
  </Container>
  
  
  </StyleTab1>
  );
}

export default Tab1;
