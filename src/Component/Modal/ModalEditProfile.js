import React, { useState, useEffect, useReducer } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Alert,
  ListGroup,
  Image,
} from "react-bootstrap";
import Add from "../logo/add_circle_black_24dp.svg";
import styled from "styled-components";
import github from "../../Component/Card/icon-img/icons8-github.svg";
import gitlab from "../../Component/Card/icon-img/icons8-gitlab.svg";
import bitbucket from "../../Component/Card/icon-img/icons8-bitbucket.svg";
import jira from "../../Component/Card/icon-img/icons8-jira.svg";
import trello from "../../Component/Card/icon-img/icons8-trello 1.svg";
import More from "../../Component/logo/more_horiz_black_24dp.svg";
import Arrow from "../logo/expand_more_black_24dp.svg";
import imgtest from "../../All_Img/bd1680f33671fd642f3a61e0d6ce3de7.jpg";

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

function ModalEditProfile({ modalShow, setModalShow, software, userData, userTagEditProfile, userTagApi,
  userTag1, userTag2, userTag3, setuserTag1, setuserTag2, setuserTag3, UpdateUserProfile, setUserImage, userImage }) {

  const [checked, setChecked] = useState();

  // console.log(userTag1.user_tag_id + " " + userTag1.user_id)

  const handleChange = e => {
    if (e.target.files[0]) {
      setUserImage(e.target.files[0]);
      var image = document.getElementById('output');
      image.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const tagNameElement = userTagApi.map(x => {
    return <option value={x.id}>{x.user_tag_name}</option>
  })

  const tagElement = userTagEditProfile.map(x => {
    return (
      <Form.Select className="select-1" name="projectTagId" value={x.user_tag_id}>
        {tagNameElement}
      </Form.Select>
    )
  })

  function handleChecked(id) {
    setChecked(!id);
    console.log(id);
  }

  const softwareElement = software.map((x) => {
    if (x.software_image_link !== " ") {
      return (
        <span>
          <input
            type="checkbox"
            value={x.id}
            onChange={(e) => handleChecked(x.id)}
          />

          <Image
            className="imguser ms-2 mt-2"
            width={30}
            height={30}
            src={x.software_image_link}
            alt="Profile"
            roundedCircle
          />
        </span>
      );
    }
  });
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
            <h6>แก้ไขโปรโฟส์</h6>
          </Modal.Header>
          <Modal.Body>
            <p className="lable-text">รูปโปรไฟล์</p>
            <div className="d-flex justify-content-center">
              <Image id="output" src={userData.user_image_link} width={200} height={200} style={{ objectFit: "cover" }} alt="imgUser" roundedCircle />
              <p></p>
            </div>
            <input type="file" onChange={handleChange} className="mt-3" />

            <p className="lable-text">โปรแกรมที่ใช้</p>
            <div className="Tag-group mt-3">{softwareElement}</div>
            <div className="More">
              More
              <img src={Arrow} />
            </div>
            <p className="lable-text">สายงาน</p>
            <Form.Select className="select-1" name="projectTagId" value={userTag1.user_tag_id} onChange={(e) => setuserTag1({ ...userTag1, user_tag_id: e.target.value })}>
              {tagNameElement}
            </Form.Select>
            <Form.Select className="select-1" name="projectTagId" value={userTag2.user_tag_id} onChange={(e) => setuserTag2({ ...userTag2, user_tag_id: e.target.value })}>
              {tagNameElement}
            </Form.Select>
            <Form.Select className="select-1" name="projectTagId" value={userTag3.user_tag_id} onChange={(e) => setuserTag3({ ...userTag3, user_tag_id: e.target.value })}>
              {tagNameElement}
            </Form.Select>
            {/* {tagElement} */}


          </Modal.Body>
          <Modal.Footer>
            <Button className="add-btn" onClick={() => UpdateUserProfile()}>submit</Button>
          </Modal.Footer>
        </StyleElem>
      </Modal>


    </>
  );
}

export default ModalEditProfile;