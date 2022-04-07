import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert, ListGroup, FloatingLabel } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

const StyleElem = styled.div`
.modal-header{
  border-bottom: none; 
}
.modal-header .btn-close{
 margin : 0px;
}
h6 {
  font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 20px;
  margin: 0px;
  padding-left: 28px;
}
  .material-icons {
    padding: 0px;
    margin: 0px;
    float: right;
  }
  .Tool-tag {
    color: #000;
    margin-right: 20px;
    border: #e9e9e9;
  }
  .lable-text {
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
    margin: 20px 0px;
  }
  .More {
    margin-top: 20px;
    text-align: center;
  }
  .add-btn {
    margin-top: 10px;
    float: right;
  }
  .select-1 {
    margin-bottom: 16px;
  }
  .modal-footer{
    border-top: none;
  }
  .hint-skill{
    color: #B8B8B8
  }
`;

function ModalEditAbout({ modalShowAbout, setModalShowAbout, userData, currentUser }) {
  const [userAbout, setUserAbout] = useState("")
  const [userSkill, setUserSkill] = useState("")

  useEffect(() => {
    setUserAbout(userData.user_about);
    setUserSkill(userData.user_skill);
  }, [])

  function handleUpdateAbout() {
    axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/users/" + currentUser.uid, {
      id: currentUser.uid,
      email: userData.email,
      user_activated: userData.user_activated,
      first_name: userData.first_name,
      last_name: userData.last_name,
      user_about: userAbout,
      user_website: userData.user_website,
      user_skill: userSkill,
      user_province_id: userData.user_province_id,
      user_image_link: userData.user_image_link,
      user_blog: userData.user_blog,
      user_portfolio: userData.user_portfolio
    }).then((res) => {
      window.location.reload(false);
    })
  }

  return (
    <>
      {" "}
      <Modal
        show={modalShowAbout}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setModalShowAbout(false)}
      >
        <StyleElem>
          <Modal.Header closeButton>
            <div className="grid-box"></div>
            <h4>แก้ไขABOUT</h4>
          </Modal.Header>
          <Modal.Body>
            <Form.Label className="lable-text">About</Form.Label>
            <FloatingLabel controlId="floatingTextarea" label="Comments">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                value={userAbout}
                onChange={(e) => setUserAbout(e.target.value)}
              />
            </FloatingLabel>
            <Form.Label className="lable-text">Skill<span className="hint-skill">กรุณาเขียนแยกด้วย " , "</span></Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              value={userSkill}
              onChange={(e) => setUserSkill(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button className="add-btn" onClick={() => handleUpdateAbout()}>
              submit
            </Button>
          </Modal.Footer>
        </StyleElem>

      </Modal>
    </>
  );
}

export default ModalEditAbout;
