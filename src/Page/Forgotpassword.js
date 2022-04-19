import React, { useState } from 'react';
import { Form, Row, Col, Container, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import LogoApp from "../Component/logo/Frame.svg";
import Image from "../All_Img/Untitled-2 1.svg";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


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
.Logo {
    padding-top: 74px;
  }
  img.img-app {
    position: absolute;
    width: 100%;
    right: 0;
    bottom: 0;
  }
h1 {
  margin: 0 auto;
  padding-top: 74px;
  padding-bottom: 47px;
  text-align: center;
}

h5 {
  font-size: 16px;
  text-align: center;
}

.mg5{
  margin-right: 55px;
}

.help{
    font-size: 20px;
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




export default function Forgotpassword() {
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const auth = getAuth();

  function handleResetPassword() {
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        setMessage("ส่งเมลไปแล้ว")
      })
      .catch((error) => {
        setMessage("ส่งลิงค์ล้มเหลว")
      });
    // currentUser.sendPasswordResetEmail(currentUser.email)
  }

  return (
    <BodyStyle>
      <Row>
        <Col lg={8}>
          <div className="StyleForm">
            <Form className="Box-content">
              <h1>ลืมรหัส?</h1>
              <div className='help mb-4'>กรุณากรอกอีเมลที่ใช้สมัคร เพื่อเปลี่ยนรหัสผ่านอย่างรวดเร็วใน 2 ขั้นตอน</div>
              <Form.Label className="inputPassword5">อีเมล</Form.Label>
              <Form.Control type="email" placeholder="" onChange={(e) => setEmail(e.target.value)} />
              <div>
                <StyleBtnLogin>
                  {message === "ส่งเมลไปแล้ว" ? <>{message && <Alert variant="success">{message}</Alert>}</> : <>{message && <Alert variant="danger">{message}</Alert>}</>}

                  <Button className="login" href="#" variant="primary" onClick={() => handleResetPassword()}>
                    ยืนยันอีเมล
                  </Button>
                </StyleBtnLogin>
              </div>
            </Form>
          </div>
        </Col>
        <Col >
          <div className="box-img">
            <div className="d-flex justify-content-center Logo">
              <img className="logo-app" src={LogoApp} />
            </div>
            <img className="img-app" src={Image} />
          </div>
        </Col>
      </Row>
    </BodyStyle>
  )
}