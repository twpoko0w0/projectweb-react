import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert, ListGroup } from "react-bootstrap";
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
`;


function ModalEditWebsite({ modalShow, setModalShow, userData, currentUser }) {
  const [userWebsite, setUserWebsite] = useState("")
  const [userBlog, setUserBlog] = useState("")
  const [userPortfolio, setUserPortfolio] = useState("")

  useEffect(() => {
    setUserWebsite(userData.user_website);
    setUserBlog(userData.user_blog);
    setUserPortfolio(userData.user_portfolio);
  }, [])

  function handleUpdateWebsite() {
    axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/users/" + currentUser.uid, {
      id: currentUser.uid,
      email: userData.email,
      user_activated: userData.user_activated,
      first_name: userData.first_name,
      last_name: userData.last_name,
      user_about: userData.user_about,
      user_website: userWebsite,
      user_skill: userData.user_skill,
      user_province_id: userData.user_province_id,
      user_image_link: userData.user_image_link,
      user_blog: userBlog,
      user_portfolio: userPortfolio
    }).then((res) => {
      window.location.reload(false);
    })
  }

  // function setUpdate() {
  //   return new Promise((resolve, reject) => {
  //     setUpdateUserWebsite(userWebsite)
  //     setUpdateUserBlog(userBlog)
  //     setUpdateUserPortfolio(userPortfolio)
  //     resolve()
  //   })
  // }

  // function RunUpdate() {
  //   return new Promise((resolve, reject) => {
  //     UpdateWebsite()
  //     setModalShow(false)
  //     resolve()
  //   })
  // }

  // async function run() {
  //   await setUpdate();
  //   await RunUpdate();
  // }

  return (
    <>
      {" "}
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setModalShow(false)}
      >
        <StyleElem>
          <Modal.Header closeButton>
            <div className="grid-box"></div>
            <h6>แก้ไขWEBSITES</h6>
          </Modal.Header>
          <Modal.Body>
            <Form.Label className="lable-text">Website</Form.Label>
            <Form.Control type="text" value={userWebsite} onChange={(e) => setUserWebsite(e.target.value)}></Form.Control>
            <Form.Label className="lable-text">Blog</Form.Label>
            <Form.Control type="text" value={userBlog} onChange={(e) => setUserBlog(e.target.value)}></Form.Control>
            <Form.Label className="lable-text">Portfolio</Form.Label>
            <Form.Control type="text" value={userPortfolio} onChange={(e) => setUserPortfolio(e.target.value)}></Form.Control>
          </Modal.Body>
          <Modal.Footer>
            <Button className="add-btn" onClick={() => handleUpdateWebsite()}>
              submit
            </Button>
          </Modal.Footer>
        </StyleElem>

      </Modal>
    </>
  );
}

export default ModalEditWebsite;
