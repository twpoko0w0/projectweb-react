import React, { useRef, useState, useEffect } from "react"
import { Form, Row, Col, Container, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from "react-router-dom"
import barstep4 from "../../All_Img/Progress bar step4.png"
import axios from "axios";

const BodyStyle = styled.div`
.inFO{
  height: 100vh;
  background: linear-gradient(to right, #fff 63%, rgba(48, 130, 254, 0.05) 32%);
  );
}
`;
const Style = styled.div`
.FormCon{
  margin: 0 ;
  display: flex;
  justify-content: center;
}

.StyleForm{
  width:352px;
  margin-left: 50px;
}

h1 {
  margin: 0 auto;
  padding-top: 74px;
  padding-bottom: 47px;
  text-align: center;
}

h4 {
  text-align: center;
}

h5 {
  font-size: 16px;
  text-align: center;
}

.mg5{
  margin-right: 55px;
}

.lablefirst {
  margin-bottom: 55px;
  color: #3082FE;
}

.lablesecon {
  margin: 55px 0px;
  color: #3082FE;
}

.lablein{
  margin: 55px 0px;
  font-size: 18px;
  font-weight: bold;
  color: #3082FE;
}

.lable{
  margin: 55px 0px;
  color: #C4C4C4;
}

.progressbar{
  width: 180px;
}

`;

const StyleBtnLogin = styled.div`
.login {
  width: 352px;
  height: 48px;
  margin-top: 24px;
  padding: 12px 16px ;
  box-sizing: border-box;
}
`;




export default function CreateStep1(handleSelect) {
  const [tag1, setTag1] = useState(47)
  const [tag2, setTag2] = useState(47)
  const [tag3, setTag3] = useState(47)
  const [currentUser, setCurrentUser] = useState()
  const [projectTag, setProjectTag] = useState([])
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  firebase.auth().onAuthStateChanged(user => {
    setCurrentUser(user)
    console.log(user.uid)
  })

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/usertag")
      .then((res) => {
        const projectTag = res.data;
        setProjectTag(projectTag);
        // console.log(projectTag)
      });
  }, [])

  function handleRegister() {

    const object = [{
      user_id: currentUser.uid,
      user_tag_id: tag1
    },
    {
      user_id: currentUser.uid,
      user_tag_id: tag2
    },
    {
      user_id: currentUser.uid,
      user_tag_id: tag3
    },]
    object.map(x => {
      axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/usertagrel", { user_id: x.user_id, user_tag_id: x.user_tag_id })
        .then(function (response) {
          setMessage("สร้างบัญชีสำเร็จ!")
          firebase.auth().signOut()
          setTimeout(function () {
            navigate({ pathname: '/' })
          }, 2500);

          console.log(response);
        })
    })
    axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/usersoftwarerel", { user_id: currentUser.uid, user_software_id: 0 })
      .then(function (response) {
        // navigate({ pathname: '/' })
        console.log(response);
      })
  }

  const tagElement = projectTag.map(x => {
    return <option key={x.id} value={x.id}>{x.user_tag_name}</option>
  })
  return (
    <BodyStyle>

      <div className="inFO">
        <Container>
          <Style>
            <Row>
              <Col lg={6} className="ml">
                <div className="FormCon">
                  <Form className="StyleForm">
                    <h1>เลือกสายงาน</h1>
                    <div className='mb-3'>
                      <Form.Label>เลือกสายงานที่สนใจ</Form.Label>
                      <Form.Select style={{ maxWidth: "400px" }} onChange={(e) => setTag1(e.target.value)} value={tag1}>
                        {tagElement}
                      </Form.Select>
                    </div>
                    <div className='mb-3'>
                      <Form.Select style={{ maxWidth: "400px" }} onChange={(e) => setTag2(e.target.value)} value={tag2}>
                        {tagElement}
                      </Form.Select>
                    </div>
                    <div className=''>
                      <Form.Select style={{ maxWidth: "400px" }} onChange={(e) => setTag3(e.target.value)} value={tag3}>
                        {tagElement}
                      </Form.Select>
                    </div>
                    <div>
                      <StyleBtnLogin>
                        {message && <Alert variant="success" className="mt-5">{message}</Alert>}
                        <Button className="login" href="#" variant="primary" onClick={() => handleRegister()}>
                          ยืนยัน
                        </Button>
                      </StyleBtnLogin>
                    </div>
                  </Form>
                </div>
              </Col>

              <Col lg={6} >
                <h1 className="text-end mg5" >Logo</h1>
                <div className="progressbar float-end ">
                  <div className='row'>
                    <div className='col-3'>
                      <img className="bar2 d-inline text-end" src={barstep4} alt="barstep4" />
                    </div>
                    <div className='col-9'>
                      <div className="d-inline ">
                        <div className="inline-block lablefirst">กรอกอีเมล</div>
                        <div className="inline-block lablesecon ">ยืนยันอีเมล</div>
                        <div className="inline-block lablesecon">สร้างโปรไฟล์</div>
                        <div className="inline-block lablein">เลือกสายงาน</div>
                      </div>
                    </div>

                    <div className="d-inline">

                    </div>
                  </div>
                </div>


              </Col>
            </Row>
          </Style>
        </Container>
      </div>

    </BodyStyle>
  )
}