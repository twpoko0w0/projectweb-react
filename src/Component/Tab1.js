import React from 'react';
import { Container, Nav, Tab, Accordion, Row, Col } from 'react-bootstrap';
import IconLock from './logo/lock_black_24dp.svg'
import styled from 'styled-components';
import './Tab1.css'
import ComLink1 from './ComLink1';
import CardProfile from './Card/CardProfile';
import CardTeam from './Card/CardTeam';
import Accordion1 from './Accordion/Accordion1';
import FormFAQ from './Form/FormFAQ ';


const StyleTab1 = styled.div`
height: 100vh;
.grop-1{
    margin:60px;
  align-items: center;
}
.box-content{
    float: left;
} 
.borderleft{
  margin-top: 40px;
  padding: 0px 18px 20px 28px ; 
  height: 960px;
  overflow: hidden;
  overflow-y: scroll;
  border-left: 1px solid #DCDCDC;
}
`;

function Tab1({ objectTag, currentUser, ownerProfile, projectDetail, id, isUserJoin, member, tagRel, projectTag, isUserMember, user }) {

    const props = {
        objectTag, currentUser, ownerProfile, projectDetail, id, isUserJoin, member, tagRel, projectTag, isUserMember, user
    }
    const mapObj = objectTag.map((x, index) => {
        return (
            <div key={index} className="sgaid">
                <Accordion defaultActiveKey="0" style={{ maxWidth: "641px", Height: "100%", borderRadius: "12px" }} >
                    <Accordion.Item eventKey={x.key} >
                        <Accordion.Header >
                            <span style={{ padding: "0" }}>{x.project_tag_name}</span> {''}
                            <span style={{ padding: "0 130px", color: "#0d6efd" }}> {x.project_quantity}</span>
                        </Accordion.Header>
                        <Accordion.Body className="text-secondary">
                            {x.project_role}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        )
    })
    return (
        <StyleTab1>
            <Container style={{ maxWidth: "1140px" }}>
                <Tab.Container style={{ height: "72px" }} defaultActiveKey="link-2" >
                    <Nav style={{ height: "72px" }} >
                        <Nav.Item  >
                            <Nav.Link className="Items-1" eventKey="link-1" disabled>
                                <img src={IconLock} alt='Lock' />
                                รายละเอียด</Nav.Link >
                        </Nav.Item>
                        <Nav.Item  >
                            <Nav.Link className="Items-2" eventKey="link-2"> ตำแหน่งที่ต้องการ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item  >
                            <Nav.Link className="Items-3" eventKey="link-3"> คำถามที่พบบ่อย</Nav.Link>
                        </Nav.Item>

                    </Nav>
                    <hr className="MM" />

                    <Tab.Content className="Tab-Grid">
                        <Tab.Pane eventKey="link-1" style={{ marginTop: "72px" }}>
                            <h1>dsadad</h1>
                        </Tab.Pane>
                        <Tab.Pane eventKey="link-2" style={{ marginTop: "72px" }}>
                            <Row >
                                <Col sm={8}>
                                    <div className="mt-5">{mapObj}</div>
                                </Col>
                                <Col className="borderleft" sm={4}>
                                    <div className="box-content">
                                        <div className="ms-0">
                                            <CardProfile  {...props} />
                                            <br />
                                            <CardTeam  {...props} />
                                        </div>
                                    </div></Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="link-3" style={{ marginTop: "72px" }}>
                            <Row>
                                <Col sm={8}>
                                    <Accordion1 />
                                    <FormFAQ />
                                </Col>
                                <Col className="borderleft" sm={4}>
                                    <div className="box-content">
                                        <div className="ms-0">
                                            <CardProfile {...props} />
                                            <br />
                                            <CardTeam {...props} />
                                        </div>
                                    </div></Col>
                            </Row>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </StyleTab1>
    );
}

export default Tab1;
