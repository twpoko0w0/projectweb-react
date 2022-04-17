import React, { useRef, useState } from "react"
import { Form, Row, Col, Container, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from "react-router-dom"


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
.Textpassword{
  text-decoration: none;
  float: right;
}
.mg5{
  margin-right: 25px;
}
;
้
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

const StyleBtnLogingoogle = styled.div`
.logingoogle {
  width: 352px;
  height: 48px;
  padding: 12px 16px ;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #000;
  color: #000;
}
`;

const StyleBtnLoginfacebook = styled.div`
.loginfacebook {
  margin-top: 8px;
  width: 352px;
  height: 48px;
  padding: 12px 16px ;
  box-sizing: border-box;
  background-color: #4465AB;
  color: #fff;
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
span{
  margin: 0px;
  padding: 0px;
  font-size: 13px;
  color: #AFAFAF;
  align-self: center;
  
}


`;

export default function CreateStep2() {
  const emailRef = useRef()
  const [email, setEmail] = ("")
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate()

  const handleChange = () => {
    setChecked(!checked);
    if (checked === true) {
      console.log(checked)
    }
  };

  async function handleSubmit(e) {
    e.preventDefault()

    if (email === "") {
      return setError("กรุณาใส่อีเมลย์ให้ถูกต้อง")
    }

    else if (checked === false) {
      return setError("กรุณากดยอมรับข้อตกลง")
    }

    try {
      setError("")
      setLoading(true)
      const user = await firebase.auth().createUserWithEmailAndPassword(emailRef.current.value, 123456)
        .then((res) => {
          res.user.sendEmailVerification({
            url: process.env.EMAIL_CONFIRM_URL + "/signup/step3",
          });
          // return createUser({ email, uid: res.user.uid, name });
        })
      firebase.auth().onAuthStateChanged(user => {
        console.log(user.uid);
      })
      navigate({ pathname: '/Signup/step2' })

    } catch {
      setError("สร้างบัญชีล้มเหลว")
    }
    setLoading(false)
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
                    <h1>สร้างประสบการณ์ที่ไม่มีวันจบ</h1>
                    <Form.Label className="text_lable">อีเมล</Form.Label>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Control type="email" placeholder="" ref={emailRef} required />
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="defaultCheck1" onChange={() => handleChange()} required />
                      <label className="form-check-label" >
                        ยอมรับนโยบาย    <a href="PDPA" className="Textpassword" >ความเป็นส่วนตัว</a> {''}
                      </label>
                    </div>
                    <StyleBtnLogin>
                      <Button className="login" href="#" variant="primary" onClick={(e) => handleSubmit(e)}>
                        สร้างบัญชี
                      </Button>
                    </StyleBtnLogin>
                    <Stylelol>
                      <hr /><span>หรือ</span><hr />
                    </Stylelol>

                    <StyleBtnLogingoogle>
                      <Button className="logingoogle" href="#" variant="primary" >
                        เข้าสู่ระบบด้วย Google
                      </Button>
                    </StyleBtnLogingoogle>

                    <StyleBtnLoginfacebook>
                      <Button className="loginfacebook" href="#" variant="primary" >
                        เข้าสู่ระบบด้วย Facebook
                      </Button>
                    </StyleBtnLoginfacebook>

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
