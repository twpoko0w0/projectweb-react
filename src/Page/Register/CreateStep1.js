import React, { useRef, useState } from "react"
import { Form, Row, Col, Container, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { auth } from "../../firebase";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import LogoApp from '../../Component/logo/Frame.svg'
import Image from '../../All_Img/Untitled-2 1.svg'


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
            url: "https://experiencehub-161090-final.win/signup/step3",
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

  function GoogleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log(user.uid)
        // console.log(user.displayName)
        // console.log(user.photoURL)
        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/users")         //     สำหรับหน้า user join request
          .then((res) => {
            const userData = res.data;
            const thisUser = userData.filter(x => x.id === user.uid)
            const Username = user.displayName.split(" ")
            if (thisUser.length === 0) {
              axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/users", {
                id: user.uid,
                email: user.email,
                user_activated: 1,
                first_name: Username[0],
                last_name: Username[1],
                user_about: "",
                user_website: "",
                user_skill: "",
                user_province_id: 1,
                user_image_link: user.photoURL,
                user_blog: "",
                user_portfolio: ""
              }).then(() => {
                axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/usertagrel", { user_id: user.uid, user_tag_id: 47 })
                  .then(() => {
                    axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/usertagrel", { user_id: user.uid, user_tag_id: 47 })
                      .then(() => {
                        axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/usertagrel", { user_id: user.uid, user_tag_id: 47 })
                          .then(() => {
                            axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/usersoftwarerel", { user_id: user.uid, user_software_id: 0 })
                              .then(function (response) {
                                navigate({ pathname: '/' })
                              })
                          })
                      })
                  })
                // navigate({ pathname: '/' })
              })
            } else {
              navigate({ pathname: '/' })
            }
            console.log(Username)
          });
      }
    })
  }

  function FacebookAuth() {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

      });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/users")         //     สำหรับหน้า user join request
          .then((res) => {
            const userData = res.data;
            const thisUser = userData.filter(x => x.id === user.uid)
            const Username = user.displayName.split(" ")
            if (thisUser.length === 0) {
              axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/users", {
                id: user.uid,
                email: user.email,
                user_activated: 1,
                first_name: Username[0],
                last_name: Username[1],
                user_about: "",
                user_website: "",
                user_skill: "",
                user_province_id: 1,
                user_image_link: user.photoURL,
                user_blog: "",
                user_portfolio: ""
              }).then(() => {
                axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/usertagrel", { user_id: user.uid, user_tag_id: 47 })
                  .then(() => {
                    axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/usertagrel", { user_id: user.uid, user_tag_id: 47 })
                      .then(() => {
                        axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/usertagrel", { user_id: user.uid, user_tag_id: 47 })
                          .then(() => {
                            axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/usersoftwarerel", { user_id: user.uid, user_software_id: 0 })
                              .then(function (response) {
                                navigate({ pathname: '/' })
                              })
                          })
                      })
                  })
                // navigate({ pathname: '/' })
              })
            } else {
              navigate({ pathname: '/' })
            }
            console.log(Username)
          });
      }
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
                      <Button className="logingoogle" href="#" variant="primary" onClick={() => GoogleAuth()}>
                        เข้าสู่ระบบด้วย Google
                      </Button>
                    </StyleBtnLogingoogle>

                    <StyleBtnLoginfacebook>
                      <Button className="loginfacebook" href="#" variant="primary" onClick={() => FacebookAuth()}>
                        เข้าสู่ระบบด้วย Facebook
                      </Button>
                    </StyleBtnLoginfacebook>

                  </Form>
                </div>
              </Col>
              <Col lg={6} >
                <div className="ms-4">
                  <div className="ms-5">
                    <div className="ms-5">
                      <div className="ms-5">
                        <div className="d-flex justify-content-center Logo">
                          <div className="ms-5"><img className="logo-app ms-5" src={LogoApp} /></div>
                        </div>
                        <div className="ms-5"><img className="img-app ms-5" src={Image} /></div>
                      </div>
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
