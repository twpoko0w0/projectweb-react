import React, { useRef, useState } from "react"
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from 'firebase/compat/app';
import Mailbro1 from '../../Component/logo/Mailbro1.png';
import barstep2 from '../../All_Img/Progress bar step2.png';

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
  width:800px;
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

`;

const Stylelol = styled.div`
display: flex;
justify-content: space-between;
margin:24px 0px;
hr{
  display: inline-block;
  width: 144px;
  background: #AFAFAF;
  align-self: center;
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
      <div className="inFO">
        <Container>
          <Style>
            <Row>
              <Col lg={6} className="ml">
                <div className="FormCon">
                  <Form className="StyleForm">
                    <h1>ยืนยันอีเมล</h1>
                    <div className="text-center">
                      <img className="svg " src={Mailbro1} alt="emailsvg" />
                    </div>
                    <h4>เราได้ส่งข้อความไปที่อีเมล {currEmail} </h4>
                    <h5>กดที่ลิ้งเพื่อยืนยันตัวตน และเริ่มสร้างโปรเจคกับเราได้เลย! </h5>
                  </Form>
                </div>
              </Col>
              <Col lg={6} >
                <h1 className="text-end mg5" >Logo</h1>
                <div className="progressbar float-end ">
                  <div className='row'>
                    <div className='col-3'>
                      <img className="bar2 d-inline text-end" src={barstep2} alt="barstep2" />
                    </div>
                    <div className='col-9'>
                      <div className="d-inline">
                        <div className="inline-block lablefirst">กรอกอีเมล</div>
                        <div className="inline-block lablein ">ยืนยันอีเมล</div>
                        <div className="inline-block lable">สร้างโปรไฟล์</div>
                        <div className="inline-block lable">เลือกสายงาน</div>
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