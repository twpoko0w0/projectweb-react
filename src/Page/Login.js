import React, { useRef, useState } from "react"
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import styled from "styled-components";
import LogoApp from '../Component/logo/Frame.svg'
import Image from '../All_Img/Untitled-2 1.svg'
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from "react-router-dom"

const BodyStyle = styled.div`
.inFO{
  height: 100vh;
  background: linear-gradient(to right, #fff 66%, rgba(48, 130, 254, 0.05) 35%);
  );
}
.loginfacebook {
  margin-top: 8px;
  width: 352px;
  height: 48px;
  padding: 12px 16px ;
  box-sizing: border-box;
  background-color: #4465AB;
  color: #fff;
}
.logingoogle {
  width: 352px;
  height: 48px;
  padding: 12px 16px ;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #000;
  color: #000;
}
.Text-Create{
  display: flex;
  justify-content: center;
}
.Text-Create p{
  margin:20px 0px;
}
.Text-Create span{
  margin:0px;
  padding: 0px;
  color:#0d6efd;
}
.Logo{
  margin-top: 74px;
}
.img-app{
  position: absolute;

right: 0%;
top: 35.93%;
bottom: 0%;
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
}
h1 {
  margin: 0 ;
  padding-top: 74px;
  padding-bottom: 47px;
  text-align: center;
}
.Textpassword{
  text-decoration: none;
  float: right;
};
้
`;
const StyleBtnLogin = styled.div`
  .login {
    width: 352px;
    height: 48px;
    margin-top: 32px;
    padding: 12px 16px;
    box-sizing: border-box;
  }
`;
const Stylelol = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0px;
  hr {
    display: inline-block;
    width: 144px;
    background: #afafaf;
    align-self: center;
  }
  span {
    margin: 0px;
    padding: 0px;
    font-size: 13px;
    color: #afafaf;
    align-self: center;
  }
`;
// const StylePO = styled.div`
// .Pogr{
//   background: rgba(48, 130, 254, 0.05);
// }
// `;

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  function handleLogin() {
    firebase.auth().signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
    setTimeout(function () {
      navigate({ pathname: '/' })
    }, 2000);
  }

  return (
    <BodyStyle>
      <div className="inFO">
        <Style>
          <Row>
            <Col lg={8} style={{ padding: "0px" }}>
              <div className="FormCon">
                <Form className="StyleForm">
                  <h1>เข้าสู่ระบบ</h1>
                  <Form.Label className="text_lable">อีเมล</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    style={{ maxWidth: "352px", margin: "0" }}
                    ref={emailRef}
                  />
                  <Form.Label>รหัสผ่าน</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=""
                    style={{ maxWidth: "352px", margin: "0" }}
                    ref={passwordRef}
                  />
                  <div className="form-check" style={{ paddingTop: "8px" }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label className="form-check-label">จดจำ</label>
                    <a href="#" className="Textpassword">
                      ลืมรหัสผ่าน?
                    </a>{" "}
                    {""}
                  </div>
                  <StyleBtnLogin>
                    <Button className="login" href="#" variant="primary" onClick={() => handleLogin()}>
                      เข้าสู่ระบบ
                    </Button>
                  </StyleBtnLogin>
                  <Stylelol>
                    <hr />
                    <span>หรือ</span>
                    <hr />
                  </Stylelol>
                  <Button className="logingoogle" href="#" variant="primary">
                    เข้าสู่ระบบด้วย Google
                  </Button>
                  <Button className="loginfacebook" href="#" variant="primary">
                    เข้าสู่ระบบด้วย Facebook
                  </Button>
                  <div className="Text-Create">
                    <p>
                      ยังไม่ได้เป็นสมาชิก?<span>สร้างบัญชี</span>
                    </p>
                  </div>
                </Form>
              </div>
            </Col>
            <Col lg={4} style={{ padding: "0px", height: "100vh" }}>
              <div className="d-flex justify-content-center Logo">
                <img className="logo-app" src={LogoApp} />

              </div>
              <img className="img-app" src={Image} />
            </Col>

          </Row>
        </Style>
      </div>
    </BodyStyle>

  );
}
