import React, { useEffect, useState, useReducer, useRef } from "react";
import axios from "axios";
import { Container, Accordion, Form, Button, Alert } from "react-bootstrap";
import styledComponents from "styled-components";
import { Link, useParams, NavLink } from 'react-router-dom';

const AccordionStyle = styledComponents.div`
.accordion{
    width:641px;
    height: 100%;   
}
textarea{
    width: 100% ;
}
.btn{
   margin-left:32rem;
   padding: 10px; 
}
`;

function AccordionQuestion() {
  const { id } = useParams();
  const [projectQuestion, setProjectQuestion] = useState([])
  const [answer, setAnswer] = useState("")
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projectquestion")
      .then((res) => {
        const resData = res.data
        const thisProjectQuestion = resData.filter(x => x.project_id === parseInt(id))
        setProjectQuestion(thisProjectQuestion)
      });
  }, [])

  function handleAnswer(questionId, question) {
    if (answer === "") {
      setMessage("กรุณากรอกคำตอบ")
    }
    else {
      axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/projectquestion/" + questionId, { project_id: id, project_question: question, project_answer: answer })
        .then((res) => {
          setMessage("ส่งคำตอบแล้ว")
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }

  const questionElement = projectQuestion.map(x => {
    return (
      <Accordion.Item eventKey={x.id}>
        <Accordion.Header>
          {x.project_question}
        </Accordion.Header>
        <Accordion.Body>
          <Accordion.Body as="textarea" onChange={(e) => setAnswer(e.target.value)}></Accordion.Body>
          <Accordion.Body as={Button} onClick={(e) => handleAnswer(x.id, x.project_question)}>ส่งคำตอบ</Accordion.Body>
          {message && <Alert variant={message === "กรุณากรอกคำตอบ" ? "danger" : "success"} className="mt-5">{message}</Alert>}
        </Accordion.Body>
      </Accordion.Item>
    )
  })
  return (
    <Container fluid="lg" style={{ maxWidth: "1140px" }}>
      <div className="d-flex justify-content-center" >
        <h1 style={{ margin: "30px 0" }}>คำถามจากผู้สนใจ</h1>
      </div>
      <AccordionStyle
        className="d-flex justify-content-center"
        style={{ Width: "641px", Height: "100%" }}
      >
        <Accordion
          defaultActiveKey="0"
          style={{ Width: "641px", Height: "100%", borderRadius: "12px" }}
        >
          {questionElement}
        </Accordion>
      </AccordionStyle>
    </Container>
  );
}

export default AccordionQuestion;
