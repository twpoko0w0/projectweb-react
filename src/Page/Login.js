import React, { useRef, useState, useEffect } from "react"
import { Form, Row, Col, Container, Button, Alert } from "react-bootstrap";
import styled from "styled-components";
import LogoApp from '../Component/logo/Frame.svg'
import Image from '../All_Img/Untitled-2 1.svg'
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { auth } from "../firebase";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";


const BodyStyle = styled.div`
  form.StyleForm {
    display: flex;
    justify-content: center;
  }
  .Box-content {
    width: 352px;
  }
  h1 {
    margin: 0;
    padding-top: 74px;
    padding-bottom: 47px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    text-align: center;
  }
  .box-checkbox {
    display: flex;
    justify-content: space-between;
  }
  .Textpassword {
    margin: 0px;
    text-decoration: none;
  }
  .login {
    width: 100%;
    height: 48px;
    margin-top: 32px;
    padding: 12px 16px;
  }
  .Style-broder {
    display: flex;
    justify-content: space-between;
    margin: 24px 0px;
  }
  span {
    margin: 0px;
    padding: 0px;
    font-size: 13px;
    color: #afafaf;
    align-self: center;
  }
  hr {
    display: inline-block;
    width: 144px;
    background: #afafaf;
    align-self: center;
  }
  .logingoogle {
    width: 352px;
    height: 48px;
    padding: 12px 16px;
    background-color: #fff;
    border: 1px solid #000;
    color: #000;
  }
  .loginfacebook {
    margin-top: 8px;
    width: 352px;
    height: 48px;
    padding: 12px 16px;
    background-color: #4465ab;
    color: #fff;
  }
  .Text-Create {
    display: flex;
    justify-content: center;
  }
  .Text-Create p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    margin: 20px 0px;
  }
  .Text-Create span {
    margin: 0px;
    padding: 0px 10px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    color: #0d6efd;
  }
  .box-img {
    position: relative;
    padding: 0px;
    background: rgba(48, 130, 254, 0.1);
  }
  .Logo {
    margin-top: 74px;
  }
  img.img-app {
    position: absolute;
    right: 0;
    bottom: 0;
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
  const [error, setError] = useState("")
  const [currUser, setCurrUser] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true;
    return () => {
      isMounted = false;
    };
  }, [])

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
        setCurrUser(user)
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

        setCurrUser(user)
      }
    })
  }

  function Logout() {
    firebase.auth().signOut()
    window.location.reload(false)
  }

  async function handleLogin() {
    try {
      setError("")
      await firebase.auth().signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      navigate({ pathname: '/' })
    } catch {
      setError("ล็อกอินไม่สำเร็จ")
    }

  }

  return (
    <BodyStyle>
      <Row style={{ height: "100vh" }}>
        <Col lg={8} style={{ padding: "0px" }}>
          <Form className="StyleForm">
            <div className="Box-content">
              <button onClick={() => Logout()} className="bg-primary">LogOut</button>
              <h1>เข้าสู่ระบบ</h1>
              <Form.Label className="text_lable">อีเมล</Form.Label>
              <Form.Control type="email" placeholder="" ref={emailRef} />
              <Form.Label style={{ paddingTop: "2rem" }}>รหัสผ่าน</Form.Label>
              <Form.Control type="password" placeholder="" ref={passwordRef} />
              <div className="box-checkbox" style={{ padding: "10px 4px" }}>
                <Form.Check
                  type="checkbox"
                  id="default-checkbox"
                  label="จดจำ"
                />
                <Link to="/Forgotpassword" className="Textpassword">
                  ลืมรหัสผ่าน?
                </Link>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button
                className="login"
                variant="primary"
                onClick={() => handleLogin()}
              >
                เข้าสู่ระบบ
              </Button>
              <div className="Style-broder">
                <hr />
                <span>หรือ</span>
                <hr />
              </div>
              <Button className="logingoogle" variant="primary" onClick={() => GoogleAuth()}>
                เข้าสู่ระบบด้วย Google
              </Button>
              <Button className="loginfacebook" variant="primary" onClick={() => FacebookAuth()}>
                เข้าสู่ระบบด้วย Facebook
              </Button>
              <div className="Text-Create">
                <p>
                  ยังไม่ได้เป็นสมาชิก ?<span>สร้างบัญชี</span>
                </p>
              </div>
            </div>
          </Form>
        </Col>
        <Col lg={4} className="box-img">
          <div className="d-flex justify-content-center Logo">
            <img className="logo-app" src={LogoApp} />
          </div>
          <img className="img-app" src={Image} />
        </Col>
      </Row>
    </BodyStyle>
  );
}
