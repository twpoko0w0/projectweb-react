import React, { useRef, useState } from "react"
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from 'firebase/compat/app';
import LogoApp from '../../Component/logo/Frame.svg'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
// import emailsvg from '../Component/logo/Mail-bro1';
import barstep3 from '../../All_Img/Progress bar step3.png';

const BodyStyle = styled.div`
*{
  padding: 0 px;
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
.Logo {
  padding-top: 74px;
}
.bar3{
  
  margin-right: 20px;
}
// .progressbar{
//   width: 180px;
// }
// .row1{
//   margin-bottom: 32px ;
// }
// .row2{
//   margin-bottom: 32px ;
// }
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
  const [currEmail, setCurrEmail] = useState("")
  const [currentUser, setCurrentUser] = useState()
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const passwordRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const [province, setProvince] = useState(1);
  const [passwordLengthValidate, setPasswordLengthValidate] = useState(false);
  const [passwordUpperCaseValidate, setPasswordUpperCaseValidate] = useState(false);
  const [firstNameValidate, setFirstNameValidate] = useState(false);
  const [lastNameValidate, setLastNameValidate] = useState(false);
  const navigate = useNavigate()

  firebase.auth().onAuthStateChanged(user => {
    setCurrEmail(user.email)
    setCurrentUser(user)
    firebase.auth().signInWithEmailAndPassword(user.email, 123456)
    // console.log("Step3 :" + user.uid);
  })

  function isUpper(str) {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
  }

  function handleRegister() {
    let pwdLength = false;
    let pwdUpperCase = false;
    let name = false;
    let last = false;
    // setPassword(passwordRef.current.value)
    if (password.length < 6) {
      setPasswordLengthValidate(true)
      pwdLength = true
    } else if (password.length >= 6) {
      pwdLength = false
      setPasswordLengthValidate(false)
    }
    if (!/[a-z]/.test(password) && /[A-Z]/.test(password) === false) {
      pwdUpperCase = true
      setPasswordUpperCaseValidate(true)
    } else if (!/[a-z]/.test(password) && /[A-Z]/.test(password) === true) {
      console.log("Here")
      pwdUpperCase = false
      setPasswordUpperCaseValidate(false)
    }

    if (firstName === "") {
      name = true
      setFirstNameValidate(true)
    } else if (firstName !== "") {
      name = false
      setFirstNameValidate(false)
    }

    if (lastName === "") {
      last = true
      setLastNameValidate(true)
    } else if (lastName !== "") {
      last = false
      setLastNameValidate(false)
    }

    if (pwdLength === false && pwdUpperCase === false && name === false && last === false) {
      console.log("All Check validated")
      currentUser.updatePassword(password);
      axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/users", {
        id: currentUser.uid,
        email: currentUser.email,
        user_activated: 1,
        first_name: firstName,
        last_name: lastName,
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

  }
  console.log(password.search(/[A-Z]/))
  return (
    <>
      <BodyStyle>
        <Row>
          <Col lg={8}>
            <div className="StyleForm">
              <Form className="Box-content">
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
                  <div className="row" style={{ marginTop: "24px" }}>
                    <div className='col-6' style={{ padding: "0" }} >
                      <Form.Label className="text_lable">ชื่อจริง</Form.Label>
                      <Form.Control type="email" placeholder="" onChange={(e) => setFirstName(e.target.value)} required hasValidation isInvalid={firstNameValidate} />
                      <Form.Control.Feedback type="invalid" >กรุณากรอกชื่อ </Form.Control.Feedback>
                    </div>
                    <div className='col-6' style={{ paddingRight: "0" }} >
                      <Form.Label className="text_lable">นามสกุล</Form.Label>
                      <Form.Control type="email" placeholder="" onChange={(e) => setLastName(e.target.value)} required hasValidation isInvalid={lastNameValidate} />
                      <Form.Control.Feedback type="invalid" > กรุณากรอกนามสกุล </Form.Control.Feedback>
                    </div>
                  </div>
                </div>
                <div className="row1" style={{ marginTop: "24px" }}>
                  <Form.Label className="inputPassword5" >รหัสผ่าน</Form.Label>
                  <Form.Control type="password" placeholder="" required hasValidation isInvalid={passwordLengthValidate || passwordUpperCaseValidate} onChange={(e) => setPassword(e.target.value)} />
                  {passwordLengthValidate ? <Form.Control.Feedback type="invalid" > รหัสผ่านมี 6 ตัวอักษรขึ้นไป. </Form.Control.Feedback> : <Form.Label className="text-secondary">รหัสผ่านมี 6 ตัวอักษรขึ้นไป.</Form.Label>}
                  {passwordUpperCaseValidate ? <Form.Control.Feedback type="invalid" >มีตัวอักษรพิมพ์ใหญ่ 1 ตัว. </Form.Control.Feedback> : <p><Form.Label className="text-secondary">มีตัวอักษรพิมพ์ใหญ่ 1 ตัว.</Form.Label></p>}
                </div>
                <div style={{ marginTop: "24px" }}>
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
          <Col style={{ padding: "0" }} >
            <div className="box-img">
              <div className="Logo d-flex justify-content-center ">
                <img className="logo-app" src={LogoApp} alt="logoapp" />
              </div>
              <div className="d-flex justify-content-center mt-5 ">
                <Row className="mt-5">
                  <Col sm="auto" style={{ padding: "0px" }}>
                    <img className="bar3 d-inline text-end" src={barstep3} alt="barstep3" />
                  </Col>
                  <Col sm="auto" style={{ padding: "0px" }}>
                    <div className="d-inline">
                      <div className="inline-block lablefirst">กรอกอีเมล</div>
                      <div className="inline-block lablefirst ">ยืนยันอีเมล</div>
                      <div className="inline-block lablein ">สร้างโปรไฟล์</div>
                      <div className="inline-block lable">เลือกสายงาน</div>
                    </div>
                  </Col>
                  {/* <div className="d-inline">
                </div> */}
                </Row>
              </div>
            </div>
          </Col>
        </Row>

      </BodyStyle>
    </>
  )
}