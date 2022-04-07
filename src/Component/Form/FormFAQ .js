import React, { useEffect, useState, useReducer, useRef } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import Img from '../logo/search_black_24dp.svg'
import axios from "axios";
import { Link, useParams, NavLink } from 'react-router-dom';
import styledComponents from "styled-components";

const StyleFromFAQ = styledComponents.div`
.Text-FAQ{
  display: flex;
  justify-content: center;
}
.grid-btn{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
`;

function FormFAQ() {
  const { id } = useParams(null);
  const { questionRef } = useRef();
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");

  function handlePost() {
    if (question === "") {
      setMessage("กรุณากรอกคำถาม")
    }
    else {
      axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/projectquestion", { project_id: id, project_question: question, project_answer: "" })
        .then(function (response) {
          setMessage("ส่งคำถามไปยังเจ้าของโปรเจคแล้ว")
          console.log(response);
        })
    }
  }

  return (
    <StyleFromFAQ>
      <div className="Text-FAQ">
        <div className="content-box">
          <h5><img src={Img} alt="img" />หากมีข้อสงสัยเพิ่มเติม สามารถถามกับเจ้าของได้โดยตรง</h5>
          <Form.Control type="text" onChange={(e) => setQuestion(e.target.value)}></Form.Control>
          <div className="grid-btn">
            <Button className="btn-send" onClick={() => handlePost()}>ส่งคำถาม</Button>
          </div>
          {message && <Alert variant={message === "กรุณากรอกคำถาม" ? "danger" : "success"} className="mt-5">{message}</Alert>}
        </div>
      </div>
    </StyleFromFAQ>
  );
}

export default FormFAQ;
