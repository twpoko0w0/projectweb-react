import React, { useRef, useState } from "react"
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from 'firebase/compat/app';
import Mailbro1 from '../../Component/logo/Mailbro1.png';
import barstep2 from '../../All_Img/Progress bar step2.png';
import LogoApp from '../../Component/logo/Frame.svg'

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
.svg{
  margin-top: -50px;
  text-align: center;
}

h5 {
  font-size: 16px;
  text-align: center;
}

.Textpassword{
  text-decoration: none;
  float: right;
}
.mg5{
  margin-right: 55px;
}
.bar2{
  
  margin-right: 20px;
}
.lablefirst {
  margin-bottom: 55px;
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
.Logo {
  padding-top: 74px;
}
`;

export default function CreateStep1() {
  console.log('test')

  const [currEmail, setCurrEmail] = useState("")

  firebase.auth().onAuthStateChanged(user => {
    setCurrEmail(user.email)
    console.log("Step3 :" + user.uid);
  })
  return (
    <BodyStyle>
      <Row>
        <Col lg={8}  >
          <div className="StyleForm">
            <Form className="Box-content">
              <h1>ยืนยันอีเมล</h1>
              <div className="text-center">
                <img className="svg " src={Mailbro1} alt="emailsvg" />
              </div>
              <h4>เราได้ส่งข้อความไปที่อีเมล {currEmail} </h4>
              <h5>กดที่ลิ้งเพื่อยืนยันตัวตน และเริ่มสร้างโปรเจคกับเราได้เลย! </h5>
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
                  <img className="bar2 d-inline text-end" src={barstep2} alt="barstep2" />
                </Col>
                <Col sm="auto" style={{ padding: "0px" }}>
                  <div className="d-inline">
                    <div className="inline-block lablefirst">กรอกอีเมล</div>
                    <div className="inline-block lablein ">ยืนยันอีเมล</div>
                    <div className="inline-block lable">สร้างโปรไฟล์</div>
                    <div className="inline-block lable">เลือกสายงาน</div>
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