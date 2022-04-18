import React, { useState } from 'react';
import { Form, Row, Col, Container, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


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
      <div>
        <Row>

        </Row>
      </div>
      <div className="inFO">
        <Container>
          <Style>
            <Row>
              <Col lg={6} className="ml">
                <div className="FormCon">
                  <Form className="StyleForm">
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
              <Col lg={6} >
                <h1 className="text-end mg5" >Logo</h1>
              </Col>
            </Row>
          </Style>
        </Container>
      </div>

    </BodyStyle>
  )
}