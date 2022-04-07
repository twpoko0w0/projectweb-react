import React, { useState } from "react";
import { Container, Tab, Nav, Row, Col, Form, Button, Image } from "react-bootstrap";
import FormSettingPassword from "../Form/FormSettingPassword";
import FormSettingProfile from "../Form/FormSettingProfile";
import ModalEditConfirm from "../Modal/ModalEditConfirm";
import ModalSuccess from "../Modal/ModalSuccess";


function TabSetting({ currentUser, firstName, lastName, email, setFirstName, setLastName, setEmail, UpdateGeneral, message }) {

  const [modalOpan, setModalOpan] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  const props = { currentUser, firstName, lastName, email, setFirstName, setLastName, setEmail, UpdateGeneral, modalOpan, setModalSuccess, modalSuccess, message }
  return (
    <>
      <Container fluid="lg" style={{ maxWidth: "1140px", height: "100vh" }}>
        <Tab.Container id="left-tabs" defaultActiveKey="1">
          <Row >
            <Col sm={3}>
              <h3>การตั้งค่า</h3>
              <Nav className="flex-column">
                {" "}
                {/*//fix  */}
                <Nav.Item className="bordr-style">
                  <Nav.Link className="lable-1" eventKey="1">
                    <span className="material-icons secicon">
                      settings
                    </span>
                    ทั่วไป
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="bordr-style">
                  <Nav.Link className="lable-1" eventKey="2">
                    <span className="material-icons secicon">
                      security
                    </span> ระดับ
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={8} >
              <Tab.Content className="box-content">
                <Tab.Pane eventKey="1">
                  <h4>ทั่วไป</h4>
                  <FormSettingProfile {...props} />
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  <h4>ความปลอดภัย</h4>
                  <hr />
                  <div className="content-box">
                    <p>เปลี่ยนรหัสผ่าน</p>
                    <span className="edit-password" onClick={() => setModalOpan(true)}>
                      <span className="material-icons passwordicon">
                        edit
                      </span>
                      แก้ไข
                    </span>
                  </div>
                  <hr />
                  <ModalEditConfirm  {...props} onHide={() => setModalOpan(false)} setModalOpan={setModalOpan} />
                  <ModalSuccess
                    {...props} onHide={() => setModalSuccess(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
}

export default TabSetting;
