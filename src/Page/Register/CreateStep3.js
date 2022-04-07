import React, { useRef, useState } from "react"
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from 'firebase/compat/app';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
// import emailsvg from '../Component/logo/Mail-bro1';
import barstep3 from '../../All_Img/Progress bar step3.png';

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
.row1{
  margin-bottom: 32px ;
}
.row2{
  margin-bottom: 32px ;
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




export default function CreateStep1() {
  console.log('test')
  const [currEmail, setCurrEmail] = useState("")
  const [currentUser, setCurrentUser] = useState()
  const passwordRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const [province, setProvince] = useState(1);
  const navigate = useNavigate()

  firebase.auth().onAuthStateChanged(user => {
    setCurrEmail(user.email)
    setCurrentUser(user)
    firebase.auth().signInWithEmailAndPassword(user.email, 123456)
    // console.log("Step3 :" + user.uid);
  })

  function handleRegister() {
    currentUser.updatePassword(passwordRef.current.value);
    axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/users", {
      id: currentUser.uid,
      email: currentUser.email,
      user_activated: 1,
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      user_about: "",
      user_website: "",
      user_skill: "",
      user_province_id: province,
      user_image_link: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      user_blog: "",
      user_portfolio: ""
    })
      .then(function (response) {
        navigate({ pathname: '/Signup/step4' })
        console.log(response);
      })
  }

  return (
    <BodyStyle>
      <div className="inFO">
        <Container>
          <Style>
            <Row>
              <Col lg={6} className="ml">
                <div className="FormCon">
                  <Form className="StyleForm">
                    <h1>สร้างโปรไฟล์</h1>
                    <div class="alert alert-primary d-flex align-items-center " role="alert">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                      <div className='ms-3'>
                        อีเมล <b>{currEmail}</b> ได้รับการยืนยันแล้ว
                      </div>
                    </div>
                    <div className="row1">
                      <div className="row">
                        <div className='col-6'>
                          <Form.Label className="text_lable">ชื่อจริง</Form.Label>
                          <Form.Control type="email" placeholder="" ref={firstNameRef} />
                        </div>
                        <div className='col-6'>
                          <Form.Label className="text_lable">นามสกุล</Form.Label>
                          <Form.Control type="email" placeholder="" ref={lastNameRef} />
                        </div>
                      </div>
                    </div>
                    <div className="row1">
                      <Form.Label className="inputPassword5">รหัสผ่าน</Form.Label>
                      <Form.Control type="password" placeholder="" ref={passwordRef} />


                    </div>
                    <div>
                      <Form.Label>จังหวัด</Form.Label>
                      <Form.Select style={{ maxWidth: "400px" }} value={province} onChange={(e) => setProvince(e.target.value)}>
                        <option value="1">กรุงเทพมหานคร</option>
                        <option value="2">ชลบุรี</option>
                        <option value="3">ตราด</option>
                        <option value="4">เชียงใหม่</option>
                      </Form.Select>
                    </div>
                    <div>
                      <StyleBtnLogin>
                        <Button className="login" href="#" variant="primary" onClick={() => handleRegister()}>
                          สร้างบัญชี
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
                      <img className="bar2 d-inline text-end" src={barstep3} alt="barstep3" />
                    </div>
                    <div className='col-9'>
                      <div className="d-inline ">
                        <div className="inline-block lablefirst">กรอกอีเมล</div>
                        <div className="inline-block lablesecon ">ยืนยันอีเมล</div>
                        <div className="inline-block lablein">สร้างโปรไฟล์</div>
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