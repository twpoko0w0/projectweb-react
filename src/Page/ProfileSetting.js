import React, { useState, useEffect } from "react";
import Navbar1 from '../Component/Navbar'
import TabSetting from '../Component/Tab/TabSetting'
import Footer from '../Component/Footer'
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate, Navigate, NavLink } from "react-router-dom"
import Spinner from "../Component/LoadingSpinner/Spinner";
import firebase from 'firebase/compat/app';


const StyleTabSetting = styled.div`
  .lable-1 {
    max-width: 261px;
    max-height: 56px;
    padding: 16px 32px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #7b7b7b;
    display: flex;
  align-items: center;

  }
  .lable-1.nav-link {
    margin: 0px;
  }
  h3 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    margin-top: 122px;
    margin-bottom: 30px;
  }
  h4 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    margin-top: 122px;
    margin-bottom: 30px;
  }
 .icon-setting{
     padding-right: 20px;
 } 
 span{
   margin : 0px;
   padding : 0px;
  
 }
 .secicon{
  padding-right: 20px;
 }
 .lable{
  line-height: 19px;
 }
 .contant-box{
   float: right;
   margin-top: 40px;
 }
 .contant-box span{
   padding-right: 20px;
   color:#0d6efd;
 }
 a:hover{
  background: #EAF2FF;
   color: #0d6efd;
 }
   .nav-item {
      cursor: pointer;
  }
`;
function ProfileSetting({ currentUser }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [userData, setUserData] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        return navigate({ pathname: '/' })
      } else {
        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/users/" + user.uid)
          .then((res) => {
            const resUser = res.data;
            setFirstName(resUser.first_name)
            setLastName(resUser.last_name)
            setEmail(resUser.email)
            setUserData(resUser)
            setIsLoading(true)
          });
      }

    })
  }, [])

  function UpdateGeneral() {

    axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/users/" + currentUser.uid, {
      id: currentUser.uid,
      email: email,
      user_activated: userData.user_activated,
      first_name: firstName,
      last_name: lastName,
      user_about: userData.user_about,
      user_website: userData.user_website,
      user_skill: userData.user_skill,
      user_province_id: userData.user_province_id,
      user_image_link: userData.user_image_link,
      user_blog: userData.user_blog,
      user_portfolio: userData.user_portfolio
    })
      .then((res) => {
        currentUser.updateEmail(email)
        setMessage("เปลี่ยนข้อมูลสำเร็จ")
        setTimeout(function () {
          setMessage("")
        }, 2000);
        console.log(res.data)
      });
  }

  const props = { currentUser, firstName, lastName, email, setFirstName, setLastName, setEmail, UpdateGeneral, message }
  return (
    <div>
      {isLoading === false ? <Spinner />
        :
        <StyleTabSetting>
          <Navbar1 />
          <TabSetting {...props} />
          <Footer />
        </StyleTabSetting>
      }
    </div>

  )
}

export default ProfileSetting