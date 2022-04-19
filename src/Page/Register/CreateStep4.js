import React, { useRef, useState, useEffect } from "react"
import { Form, Row, Col, Container, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from "react-router-dom"
import barstep4 from "../../All_Img/Progress bar step4.png"
import LogoApp from '../../Component/logo/Frame.svg'
import axios from "axios";

const BodyStyle = styled.div`
*{
  padding: 0px;
  margin: 0px;
}
.StyleForm {
    display: flex;
    justify-content: center;
    height: 100vh;
  }
  .Box-content {
    width: 352px;
  }
  .box-img {
  position: relative;
  height: 100%;
  padding: 0px;
  background: rgba(48, 130, 254, 0.1);
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
.bar4{
   margin-right: 20px;
}
.Logo {
  padding-top: 74px;
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
  const [tag1, setTag1] = useState(0)
  const [tag2, setTag2] = useState(0)
  const [tag3, setTag3] = useState(0)
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
    if (tag1 === 0 || tag2 === 0 || tag3 === 0) {
      setMessage("กรุณาเลือกแท็กให้ครบ")
    } else {
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

  }

  const tagElement = projectTag.map(x => {
    return <option key={x.id} value={x.id}>{x.user_tag_name}</option>
  })
  return (
    <BodyStyle>
      <Row>
        <Col lg={8} >
          <div className="StyleForm">
            <Form className="Box-content">
              <h1>เลือกสายงาน</h1>
              <div className='mb-3'>
                <Form.Label>เลือกสายงานที่สนใจ</Form.Label>
                <Form.Select style={{ maxWidth: "400px" }} onChange={(e) => setTag1(e.target.value)} value={tag1}>
                  <option value={0}>...</option>
                  {tagElement}
                </Form.Select>
              </div>
              <div className='mb-3'>
                <Form.Select style={{ maxWidth: "400px" }} onChange={(e) => setTag2(e.target.value)} value={tag2}>
                  <option value={0}>...</option>
                  {tagElement}
                </Form.Select>
              </div>
              <div className=''>
                <Form.Select style={{ maxWidth: "400px" }} onChange={(e) => setTag3(e.target.value)} value={tag3}>
                  <option value={0}>...</option>
                  {tagElement}
                </Form.Select>
              </div>
              <div>
                <StyleBtnLogin>
                  {message === "กรุณาเลือกแท็กให้ครบ" ? <>{message && <Alert variant="danger" className="mt-5">{message}</Alert>}</> : <>{message && <Alert variant="success" className="mt-5">{message}</Alert>}</>}
                  <Button className="login" href="#" variant="primary" onClick={() => handleRegister()}>
                    ยืนยัน
                  </Button>
                </StyleBtnLogin>
              </div>
            </Form>
          </div>
        </Col>

        <Col >
          <div className="box-img">
            <div className="Logo d-flex justify-content-center ">
              <img className="logo-app" src={LogoApp} alt="logoapp" />
            </div>
            <div className="d-flex justify-content-center mt-5 ">
              <Row className="mt-5">
                <Col sm="auto" style={{ padding: "0px" }}>
                  <img className="bar4 d-inline text-end" src={barstep4} alt="barstep4" />
                </Col>
                <Col sm="auto" style={{ padding: "0px" }}>
                  <div className="d-inline">
                    <div className="inline-block lablefirst">กรอกอีเมล</div>
                    <div className="inline-block lablefirst ">ยืนยันอีเมล</div>
                    <div className="inline-block lablefirst">สร้างโปรไฟล์</div>
                    <div className="inline-block lablein">เลือกสายงาน</div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </BodyStyle>
  )
}