import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Alert,
  ListGroup,
  FloatingLabel,
} from "react-bootstrap";
import styled from "styled-components";
import DropElem from "../Dropdown/DropElem";
import axios from "axios";

const StyleElem = styled.div`
  .modal-header {
    padding: 32px 32px 0px;
    border-bottom: none;
  }
  .modal-header .btn-close {
    margin: 0px;
  }
  h6 {
    font-family: "Roboto";
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
  .modal-body{
      padding: 0px 32px 32px;
  }
  .Tool-tag {
    color: #000;
    margin-right: 20px;
    border: #e9e9e9;
  }
  .lable-text {
    font-family: 'Roboto';
font-style: normal;
font-weight: 300;
font-size: 16px;
    margin: 20px 0px;
  }
  .lable-text1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
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
  .modal-footer {
    padding: 16px 32px;
    border-top: none;
  }
  .hint-skill {
    color: #b8b8b8;
  }
`;

function Modaljoin({ modalShow, setModalShow, tagRel, projectTag, currentUser, id, setButtonChange, objectTag }) {
  const [tagValidated, setTagValidated] = useState(false);
  const [interviewValidated, setInterviewValidated] = useState(false);
  const [facebookviewValidated, setFacebookValidated] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [lineValidated, setLineValidated] = useState(false);
  const [selectTagRelId, setSelectTagRelId] = useState(0)
  const [searchTerm, setSearchTerm] = useState([]);
  const [tagName, setTagName] = useState("")
  const [interview, setInterview] = useState("")
  const [facebook, setFacebook] = useState("")
  const [email, setEmail] = useState("")
  const [line, setLine] = useState("")
  console.log(selectTagRelId)

  useEffect(() => {
    let isMounted = true;

    return () => {
      isMounted = false;
    };
  }, [selectTagRelId, tagName]);


  function handleJoinRequest() {
    let currTag = false;
    let currInterview = false;
    let currFacebook = false;
    let currEmail = false;
    let currLine = false;

    if (tagName === "") {
      currTag = true;
      setTagValidated(true)
    } else if (tagName !== "") {
      currTag = false;
      setTagValidated(false)
    }

    if (interview === "") {
      currInterview = true;
      setInterviewValidated(true)
    } else if (interview !== "") {
      currInterview = false;
      setInterviewValidated(false)
    }

    if (facebook === "") {
      currFacebook = true;
      setFacebookValidated(true)
    } else if (facebook !== "") {
      currFacebook = false;
      setFacebookValidated(false)
    }

    if (email === "") {
      currEmail = true
      setEmailValidated(true)
    } else if (email !== "") {
      currEmail = false;
      setEmailValidated(false)
    }

    if (line === "") {
      currLine = true;
      setLineValidated(true)
    } else if (line !== "") {
      currLine = false;
      setLineValidated(false)
    }

    if (currTag === false && currInterview === false && currFacebook === false && currEmail === false && currLine === false) {
      if (tagName !== "") {
        const relIdfindName = objectTag.filter((val) => val.project_tag_name.toLowerCase().includes(tagName.toLowerCase()))
        const relid = relIdfindName[0].project_tag_relation_id

        axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectjoinreq", {
          user_id: currentUser.uid,
          project_id: parseInt(id),
          date_time: new Date(),
          project_tag_rel_id: relid,
          interview: interview,
          facebook: facebook,
          email: email,
          line: line
        })
          .then(function (response) {
            setButtonChange(1);
          })
        console.log(id)
      }
    }
  }

  const props = { tagValidated, tagRel, projectTag, setSelectTagRelId, selectTagRelId, objectTag, tagName, setTagName, searchTerm, setSearchTerm, handleJoinRequest }
  return (
    <>
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
            <h4>เพิ่มข้อมูลติดต่อ เพื่อร่วมงานกัน</h4>
          </Modal.Header>
          <Modal.Body>
            <Form.Label className="lable-text">สายงานที่ต้องการสมัคร</Form.Label>
            <DropElem {...props} />
            <Form.Label className="lable-text">ทำไมคุณถึงสนใจโปรเจคนี้</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "288px" }}
              onChange={(e) => setInterview(e.target.value)}
              hasValidation
              isInvalid={interviewValidated}
            />
            <Form.Control.Feedback type="invalid">
              กรุณากรอกข้อมูล.
            </Form.Control.Feedback>

            <Form.Label className="lable-text1">Facebook(userName)</Form.Label>
            <Form.Control type="email" required hasValidation isInvalid={facebookviewValidated} onChange={(e) => setFacebook(e.target.value)} id="1s" />
            <Form.Control.Feedback type="invalid" id="1s">
              กรุณากรอกข้อมูล.
            </Form.Control.Feedback>
            <Form.Label className="lable-text1">Line</Form.Label>
            <Form.Control type="email" required hasValidation isInvalid={lineValidated} onChange={(e) => setLine(e.target.value)} />
            <Form.Control.Feedback type="invalid" id="1s">
              กรุณากรอกข้อมูล.
            </Form.Control.Feedback>
            <Form.Label className="lable-text1">Email</Form.Label>
            <Form.Control type="email" required hasValidation isInvalid={emailValidated} onChange={(e) => setEmail(e.target.value)} />
            <Form.Control.Feedback type="invalid" id="1s">
              กรุณากรอกข้อมูล.
            </Form.Control.Feedback>
          </Modal.Body>
          <Modal.Footer>
            <Button className="add-btn" onClick={() => handleJoinRequest()}>submit</Button>
          </Modal.Footer>
        </StyleElem>
      </Modal>
    </>
  );
}

export default Modaljoin;
