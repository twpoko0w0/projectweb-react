import React, { useState } from "react";
import { Container, Tab, Nav, Row, Col, Form, Button } from "react-bootstrap";
import Cancel from "../logo/cancel_black_24dp.svg";
import styled from "styled-components";
import FormEditDataProject from "../Form/FormEditDataProject";
import FormEditJobPosition from "../Form/FormEditJobPosition";
import FormEditNameAndTag from "../Form/FormEditNameAndTag";
import FormEditTier from "../Form/FormEditTier";
import FormInvite from "../Form/FormInvite";
import Suppress from "../Modal/suppress";

const StyleTabA = styled.div`
  .lable-1 {
    max-width: 261px;
    max-height: 56px;
    padding: 18px 22px;
    align-self: center;
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
    line-height: 19px;
    color: #7b7b7b;
  }
  .lable-1.nav-link {
    margin: 0px;
  }
  .Text-bold{
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 16px;
  }
  .bordr-style {
    // height: 600px;
    // overflow: hidden;
    // overflow-y: scroll;
    border-left: 1px solid #e6e6e6;
  }
  .Text-data {
    font-family: 'Bai Jamjuree';
    font-style: normal;
    font-weight: 100;
    font-size: 16px;
  }
  p {
    margin: 0px;
  }
  span {
    margin: 0px;
    padding: 0px;
  }
  .edit-btn {
    color: #0d6efd;
    margin: 0px;
    padding: 0px;
    float: right;
  }
  .delete-btn {
    margin-top: 60px;
    float: right;
  }
  .img-data {
    width: 219px;
    height: 123px;
  }
  .Tool-Tag {
    color: #000;
    margin-right: 20px;
    border: #e9e9e9;
  }
  .image-box {
    display: inline;
    padding-right: 20px;
  }
  .close-icon {
    position: absolute;
    padding-left: 4rem;
    top: 265px;
  }
  .Box-grid {
    display: flex;
    justify-content: space-between;
  }
  #left-tabs {
    height: 100%vh;
    overflow: hidden;
  }
  .button-mute {
    background-color: #D4D4D4;
  }
  .hint {
    font-size: 14px;
  }
  .nav-item {
      cursor: pointer;
  }
`;

function TabManage({ projectDetail, objectTag, tagRel, projectTag, updateProjectDetail, setUpdateProjectDetail, isOpen, setIsOpen, defaultValue, Update, image, setImage, UpdateAll, buttonShow, setButtonShow, currentUser, DeleteMember,
  softwareRel, softwareRelNew, softwareRelDel, software, forceUpdate, user, setSoftwareRelNew, setSoftwareRelDel, id, navigate, currUserRole }) {

  const [modalShow, setModalShow] = useState(false);
  const props = {
    projectDetail, objectTag, tagRel, projectTag, updateProjectDetail, setUpdateProjectDetail, isOpen, setIsOpen, defaultValue, Update, image, setImage, UpdateAll, buttonShow, setButtonShow, currentUser, DeleteMember,
    softwareRel, softwareRelNew, softwareRelDel, software, forceUpdate, user, setSoftwareRelNew, setSoftwareRelDel, id, modalShow,
    setModalShow, navigate, currUserRole
  };

  if (currUserRole !== 3) {
    return (
      <StyleTabA>
        <Container fluid="lg" style={{ maxWidth: "1140px" }}>
          <Tab.Container id="left-tabs" defaultActiveKey="1">
            <Row style={{ paddingTop: "56px" }}>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  {" "}
                  {/*//fix  */}
                  <Nav.Item >
                    <Nav.Link className="lable-1" eventKey="1">
                      ชื่อ และประเภท
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item >
                    <Nav.Link className="lable-1" eventKey="2">
                      ระดับ
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item >
                    <Nav.Link className="lable-1" eventKey="3">
                      ข้อมูล
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item >
                    <Nav.Link className="lable-1" eventKey="4">
                      ตำแหน่งที่ต้องการ
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item >
                    <Nav.Link className="lable-1" eventKey="5">
                      เชิญคนรู้จัก
                    </Nav.Link>
                  </Nav.Item>
                  {currUserRole === 1 &&
                    <Nav.Item >
                      <Nav.Link className="lable-1" eventKey="6">
                        จัดการโปรเจค
                      </Nav.Link>
                    </Nav.Item>}

                </Nav>
              </Col>
              <Col className="bordr-style" style={{ height: "100vh" }} >
                <Tab.Content className="box-content ">
                  <Tab.Pane eventKey="1"  >
                    <FormEditNameAndTag {...props} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <FormEditTier {...props} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="3" >
                    <FormEditDataProject {...props} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="4">
                    <FormEditJobPosition {...props} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="5" >
                    <FormInvite {...props} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="6">
                    <div className="form-delete">
                      <Row>
                        <Col sm={2}>
                          {" "}
                          <label className="Text-bold">ระงับโปรเจค: </label>
                        </Col>
                        <Col>
                          <p>
                            สมาชิกในทีมไม่มีข้อมูลเกี่ยว กับโปรเจคนี้
                            แต่คนที่ระงับจะขึ้นใน โปรไฟล์ว่ามีงาน deactivate
                            ถ้าดูรายเอียดโปรเจคจาก โปรไฟล์
                            โดยตรงจะเห็นแค่ข้อมูลโดยย่อและสมาชิกจะเห็น แค่คนที่ลบ
                            นอกนั้นเป็น bot(user22154)
                            ถ้าเปลี่ยนใจอยากเปิดขั้นต่ำคือ 30 วัน
                            หลังจากเปิดสมาชิกจะหายหมด
                          </p>
                        </Col>
                      </Row>
                      <Button
                        className="delete-btn"
                        variant="outline-danger"
                        onClick={() => setModalShow(true)}
                      >
                        <img style={{ paddingRight: "10px" }} src={Cancel} />
                        ระงับโปรเจค
                      </Button>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          <Suppress  {...props} />
        </Container>
      </StyleTabA>
    );
  } else {
    return (
      <StyleTabA>
        <Container fluid="lg" style={{ maxWidth: "1140px" }}>
          <Tab.Container id="left-tabs" defaultActiveKey="1">
            <Row style={{ paddingTop: "56px" }}>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  {" "}
                  {/*//fix  */}
                  <Nav.Item >
                    <Nav.Link className="lable-1" eventKey="1">
                      ชื่อ และประเภท
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item >
                    <Nav.Link className="lable-1" eventKey="2">
                      ระดับ
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item >
                    <Nav.Link className="lable-1" eventKey="3">
                      ข้อมูล
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item >
                    <Nav.Link className="lable-1" >
                      ตำแหน่งที่ต้องการ <p className="text-danger hint">(เฉพาะ Owner และ Moderator)</p>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item >

                  </Nav.Item>
                  <Nav.Item >
                    <Nav.Link className="lable-1" >
                      จัดการโปรเจค <p className="text-danger hint">(เฉพาะ Owner และ Moderator)</p>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col className="bordr-style" style={{ height: "100vh" }} >
                <Tab.Content className="box-content ">
                  <Tab.Pane eventKey="1"  >
                    <FormEditNameAndTag {...props} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <FormEditTier {...props} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="3" >
                    <FormEditDataProject {...props} />
                  </Tab.Pane>

                  <Tab.Pane eventKey="5" >
                    <FormInvite {...props} />
                  </Tab.Pane>

                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          <Suppress  {...props} />
        </Container>
      </StyleTabA>
    );
  }

}

export default TabManage;
