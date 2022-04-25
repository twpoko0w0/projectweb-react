import React, { useState } from 'react';
import { Container, Nav, Tab, Accordion, Row, Col } from 'react-bootstrap';
import IconLock from './logo/lock_black_24dp.svg'
import styled from 'styled-components';
import CardProfile from './Card/CardProfile';
import CardTeam from './Card/CardTeam';
import Accordion1 from './Accordion/Accordion1';
import FormFAQ from './Form/FormFAQ ';
import UndoModal from "./Modal/undoModal"


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
  .Text-allDetail {
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    width: 650px;
  }
  span {
    margin: 0px;
    padding: 0px;
    padding-right: 10px;
  }
  .nav-item {
        cursor: pointer;
  }
  .nav-item a {
    height: 72px;
    margin: 0px;
    padding: 24px;
    color: #707070;
  }
  .nav-item a:hover {
    background: #eaf2ff;
    color: #000;
  }
  .Items-1 {
    display: flex;
  
  }
  .Items-1 img {
    padding-right: 12px;
  }
  .MM {
    position: absolute;
    margin-top: 0px;
    left: 0px;
    width: 100vw;
    z-index: -1;
  }
//   .lock{
//       display: flex;
//   }
`;

function Tab1({ objectTag, currentUser, ownerProfile, projectDetail, id, isUserJoin, member, tagRel, projectTag, isUserMember, user, projectSoftwareRel, software, userJoinReq }) {
    const [undoModalShow, setUndoModalShow] = useState(false);
    const props = {
        objectTag, currentUser, ownerProfile, projectDetail, id, isUserJoin, member, tagRel, projectTag, isUserMember, user, projectSoftwareRel,
        software, undoModalShow, setUndoModalShow, userJoinReq
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
    // onClick={() =>
    // currentUser.uid === ownerProfile.id ?
    //     setUndoModalShow(false) :
    //     isUserMember === -1
    //         ? setUndoModalShow(false) :
    //         isUserJoin === -1
    //             ? setUndoModalShow(true) :
    //             setUndoModalShow(true)

    if (user) {
        return (
            <StyleTab1>
                <Container style={{ maxWidth: "1140px" }}>
                    <Tab.Container style={{ height: "72px" }} defaultActiveKey="link-2" >
                        <Nav style={{ height: "72px" }} >
                            <Nav.Item
                                className="Items-1 "
                                onClick={() => isUserMember === -1 ? setUndoModalShow(true) : null}
                            >
                                <Nav.Link
                                    className='d-flex'
                                    eventKey="link-1"
                                    style={
                                        currentUser.uid === ownerProfile.id
                                            ? null
                                            : isUserMember === -1
                                                ? { background: " rgba(112, 112, 112,0.2)" }
                                                : isUserJoin === -1
                                                    ? null
                                                    : { background: " rgba(112, 112, 112,0.2)" }
                                    }
                                    disabled={
                                        currentUser.uid === ownerProfile.id
                                            ? false
                                            : isUserMember === -1
                                                ? true
                                                : isUserJoin === -1
                                                    ? false
                                                    : true
                                    }
                                >
                                    {currentUser.uid === ownerProfile.id ? null :
                                        isUserMember === -1 ? (
                                            <span className="material-icons">lock</span>
                                        ) : isUserJoin === -1 ? null : (
                                            <span className="material-icons">lock</span>
                                        )}
                                    รายละเอียด
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="Items-1" >
                                <Nav.Link eventKey="link-2"> ตำแหน่งที่ต้องการ</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="Items-1"  >
                                <Nav.Link eventKey="link-3"> คำถามที่พบบ่อย</Nav.Link>
                            </Nav.Item>

                        </Nav>
                        <hr className="MM" />

                        <Tab.Content className="Tab-Grid">
                            <Tab.Pane eventKey="link-1" style={{ marginTop: "72px" }}>
                                <Row>
                                    <Col sm={8}>
                                        <h1>รายละเอียด</h1>
                                        <div className="Text-allDetail">
                                            {projectDetail.project_brief_detail}
                                        </div>
                                        <UndoModal {...props} />
                                    </Col>
                                    <Col className="borderleft" sm={4}>
                                        <div className="box-content">
                                            <div className="ms-0">
                                                <CardProfile {...props} />
                                                <br />
                                                <CardTeam {...props} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
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
    } else {    // ไม่ได้ ล็อกอิน
        return (
            <StyleTab1>
                <Container style={{ maxWidth: "1140px" }}>
                    <Tab.Container style={{ height: "72px" }} defaultActiveKey="link-2" >
                        <Nav style={{ height: "72px" }} >
                            <Nav.Item onClick={() => setUndoModalShow(true)} >
                                <Nav.Link className="Items-1" eventKey="link-1" disabled style={{ background: " rgba(112, 112, 112,0.2)" }}>
                                    <span class="material-icons">lock</span>
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
                                <Row>
                                    <Col sm={8}>
                                        <h1>รายละเอียด</h1>
                                        <div className="Text-allDetail">
                                            พี่ไม่มี Louis Vuitton มีแต่หนี้ก้อนโต นวลน้องคงน้ำตานอง
                                            เพราะต้องช่วยพี่ ออกค่าคอนโด อยู่กับพี่น่ะมันลำบากนะ
                                            หรือว่าน้องจะทน อยู่กับพี่ลำบากนะ หรือว่าน้องจะทน ก็พี่ไม่มี
                                            Balen เเถมค่ารถพี่ส่งไม่ทัน กระเป๋าของพี่ Dior
                                            เเต่ตัวพี่นะไม่มีตังค์ อยู่กับพี่น่ะมันลำบากนะ
                                            หรือว่าน้องจะทน อยู่กับพี่ลำบากนะ หรือว่าน้องจะทนพี่ไม่มี
                                            Louis Vuitton มีแต่หนี้ก้อนโต นวลน้องคงน้ำตานอง
                                            เพราะต้องช่วยพี่ออกค่าคอนโด อยู่กับพี่น่ะมันลำบากนะ
                                            หรือว่าน้องจะทน อยู่กับพี่ลำบากนะ หรือว่าน้องจะทน ก็พี่ไม่มี
                                            Balen เเถมค่ารถพี่ส่งไม่ทัน กระเป๋าของพี่ Dior
                                            เเต่ตัวพี่นะไม่มีตังค์ อยู่กับพี่น่ะมันลำบากนะ
                                            หรือว่าน้องจะทน อยู่กับพี่ลำบากนะ หรือว่าน้องจะทน
                                            อยู่กับพี่ลำบากนะ หรือว่าน้องจะทน หรือว่าน้องจะทนพี่ไม่มี
                                            Louis Vuitton มีแต่หนี้ก้อนโต นวลน้องคงน้ำตานอง
                                            เพราะต้องช่วยพี่ออกค่าคอนโด อยู่กับพี่น่ะมันลำบากนะ
                                            หรือว่าน้องจะทน อยู่กับพี่ลำบากนะ หรือว่าน้องจะทน ก็พี่ไม่มี
                                            Balen เเถมค่ารถพี่ส่งไม่ทัน กระเป๋าของพี่ Dior
                                            เเต่ตัวพี่นะไม่มีตังค์ อยู่กับพี่น่ะมันลำบากนะ
                                            หรือว่าน้องจะทน อยู่กับพี่ลำบากนะ หรือว่าน้องจะทน
                                            อยู่กับพี่ลำบากนะ หรือว่าน้องจะทน
                                        </div>
                                        <UndoModal {...props} />
                                    </Col>
                                    <Col className="borderleft" sm={4}>
                                        <div className="box-content">
                                            <div className="ms-0">
                                                <CardProfile {...props} />
                                                <br />
                                                <CardTeam {...props} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
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

}

export default Tab1;
