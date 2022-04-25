import React, { useEffect, useState, useReducer } from "react";
import { Accordion } from "react-bootstrap";
import { Link, useParams, NavLink } from 'react-router-dom';
import axios from "axios";
import styledComponents from "styled-components";

const StyleBox = styledComponents.div`

  .box{
      display:flex;
      justify-content: center;
     
  }
  .AC1{
     width: 100%;
  }  
`;


export default function AC1() {
    const { id } = useParams(null);
    const [projectQuestion, setProjectQuestion] = useState([])

    useEffect(() => {
        run();
    }, [])

    function GetQuestion() {
        let isMounted = true;
        return new Promise((resolve, reject) => {
            axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projectquestion")
                .then((res) => {
                    const resData = res.data
                    const thisProjectQuestion = resData.filter(x => x.project_id === parseInt(id) && x.project_answer !== "")

                    if (isMounted) {
                        setProjectQuestion(thisProjectQuestion)
                    }

                });
            resolve()
            return () => {
                isMounted = false;
            };
        })
    }

    const questionElement = projectQuestion.map((x, index) => {
        return (
            <Accordion.Item eventKey={x.id} key={index}>
                <Accordion.Header>{x.project_question}</Accordion.Header>
                <Accordion.Body className="bg-light">
                    {x.project_answer}
                </Accordion.Body>
            </Accordion.Item>
        )
    })

    async function run() {
        await GetQuestion();
    }
    return (
        <StyleBox>
            <div className="box" style={{ margin: "80px 0px" }}>

                <Accordion className="AC1" defaultActiveKey="0" style={{ maxWidth: "641px", Height: "100%", borderRadius: "12px" }}>
                    {questionElement}
                </Accordion>
            </div>
        </StyleBox>
    )
}
