import React, { useState, useEffect, useReducer } from "react";
import NavbarProfile from "../Component/NavbarProfile";
import Profile from "../All_Img/bd1680f33671fd642f3a61e0d6ce3de7.jpg";
import Footer from "../Component/Footer";
import { Col, Container, Image, Row } from "react-bootstrap";
import styledComponents from "styled-components";
import TabProfile from "../Component/Tab/TabProfile";
import Editicon from "../Component/logo/edit_black_24dp.svg";
import Proicon from "../Component/Card/icon-img/icons8-github.svg";
import firebase from 'firebase/compat/app';
import { Link, useNavigate, Navigate, NavLink, useParams } from "react-router-dom"
import Navbar1 from "../Component/Navbar";
import axios from "axios";
import Spinner from "../Component/LoadingSpinner/Spinner";
import ModalEditProfile from "../Component/Modal/ModalEditProfile";
import Card3 from "../Component/Card/CardProjectOwner";
import { storage } from "../firebase";


const StyleProfile = styledComponents.div`

span{
  margin: 0px;
  padding:0px;
  cursor: auto;
}
h2{
  margin: 16px 0px;
}
.text-data{
  margin: 10px 0px;
}
.lable-program{
  margin: 10px 0px;
}
button{
border: none;
margin-right: 20px;
}
.btn-tag{
  background: #3082FE;
  color: #fff;
  border-radius: 0%;
}

`;
const Stylelogo = styledComponents.div`
display: flex;
 .bgProgram{
  background: #f9f9f9;
  width: 32px;
  height: 32px;
  margin: 4px;
  border-radius: 50%;
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.3);
 }
 .imgProgram{
  padding: 4px;
 }
 .Text-Program{
  padding: 4px;
 }
`;
function Profileuser() {
  const { id } = useParams();
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [software, setSoftware] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const [userData, setUserData] = useState([])
  const [userImage, setUserImage] = useState(null)
  const [userSkill, setUserSkill] = useState([])
  const [userTag, setUserTag] = useState([])
  const [userTagEditProfile, setUserTagEditProfile] = useState([])
  const [userTagApi, setUseruserTagApi] = useState([])
  const [userSoftware, setUserSoftware] = useState([])
  const [userProjectRel, setUserProjectRel] = useState([])
  const [userProjectData, setUserProjectData] = useState([])
  const [userProjectDataAll, setUserProjectDataAll] = useState([])
  const [userProjectDataAllDisplay, setUserProjectDataAllDisplay] = useState([])
  const [userProjectFilter, setUserProjectFilter] = useState([])
  const [userProjectFilterAll, setUserProjectFilterAll] = useState([])
  const [userTag1, setuserTag1] = useState({
    id: 0,
    user_id: "",
    user_tag_id: 0
  })
  const [userTag2, setuserTag2] = useState({
    id: 0,
    user_id: "",
    user_tag_id: 0
  })
  const [userTag3, setuserTag3] = useState({
    id: 0,
    user_id: "",
    user_tag_id: 0
  })
  const [softwareRel, setSoftwareRel] = useState([])
  const [softwareRelNew, setSoftwareRelNew] = useState([])
  const [softwareRelDel, setSoftwareRelDel] = useState([])
  const [currentUser, setCurrentUser] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    let isMounted = true;
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        return navigate({ pathname: '/' })
      } else {
        if (isMounted) {
          setCurrentUser(user)
        }

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/users/" + id)
          .then((res) => {
            const resUser = res.data;
            // const thisUser = resUser.find(x => x.id === user.uid)

            const skillUser = resUser.user_skill.split(",")
            const tagUser = resUser.user_tag_name.split(",")
            const softwareUser = resUser.user_software.split(",")
            const softwareImage = resUser.software_image_link.split(",")

            for (let i = 0; i < softwareUser.length; i++) {
              const object = {
                key: i,
                user_software: softwareUser[i],
                software_image_link: softwareImage[i]
              }
              userSoftware.push(object);
            }

            if (isMounted) {
              setUserSkill(skillUser);
              setUserTag(tagUser);
              setUserData(resUser)
            }
          });

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/usertagrel")
          .then((res) => {
            const resSoftware = res.data;
            const thisUserTagRel = resSoftware.filter(x => x.user_id === user.uid)
            thisUserTagRel.reverse();
            setUserTagEditProfile(thisUserTagRel)

            if (isMounted) {
              setuserTag1({ id: thisUserTagRel[0].id, user_id: thisUserTagRel[0].user_id, user_tag_id: thisUserTagRel[0].user_tag_id })
              setuserTag2({ id: thisUserTagRel[1].id, user_id: thisUserTagRel[1].user_id, user_tag_id: thisUserTagRel[1].user_tag_id })
              setuserTag3({ id: thisUserTagRel[2].id, user_id: thisUserTagRel[2].user_id, user_tag_id: thisUserTagRel[2].user_tag_id })
            }
          });

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/usertag")
          .then((res) => {
            const resTag = res.data;
            if (isMounted) {
              setUseruserTagApi(resTag)
            }
          });

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/usersoftware")
          .then((res) => {
            const resSoftware = res.data;
            const filter = resSoftware.filter(x => x.software_image_link !== " ")
            if (isMounted) {
              setSoftware(filter)
            }

          });

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/usersoftwarerel")
          .then((res) => {
            const resSoftwareRel = res.data;
            const filter = resSoftwareRel.filter(x => x.user_software_id !== 0 && x.user_id === user.uid)
            const filter2 = resSoftwareRel.filter(x => x.user_software_id !== 0 && x.user_id === user.uid)

            if (isMounted) {
              setSoftwareRel(filter)
              setSoftwareRelNew(filter2)
            }
          });

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectrel")
          .then((res) => {
            const resProjectRel = res.data;
            const thisUserProject = resProjectRel.filter(x => x.user_id === id)
            // console.log(thisUserProject[0].project_id)

            axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/project")
              .then((res) => {
                const resProject = res.data;
                const thisUserProjectDataOwner = resProject.filter(x => {
                  return thisUserProject.some(y => x.id === y.project_id && y.project_role_id === 1)
                })
                const thisUserProjectData = resProject.filter(x => {
                  return thisUserProject.some(y => x.id === y.project_id)
                })

                const thisUserProjectDataForDisplay = resProject.filter(x => {
                  return thisUserProject.some(y => x.id === y.project_id && y.project_role_id !== 1)
                })

                if (isMounted) {
                  setUserProjectData(thisUserProjectDataOwner)    // <== Current User project Owner
                  setUserProjectDataAll(thisUserProjectData)    // All join project
                  setUserProjectFilter(thisUserProjectDataOwner)
                  setUserProjectFilterAll(thisUserProjectData)
                  setUserProjectDataAllDisplay(thisUserProjectDataForDisplay)
                  setIsLoading(true)
                }

              });
            if (isMounted) {
              setUserProjectRel(thisUserProject)
            }
          });
      }
    })
    return () => {
      isMounted = false;
    };
  }, [])

  // console.log("Here Too: " + userProjectData)

  const tagElement = userTag.map(x => {
    return <button className="btn-tag">{x}</button>
  })

  const softwareElement = userSoftware.map(x => {
    if (x.software_image_link !== " ") {
      return <Image
        className="imguser ms-2 mt-2"

        width={30}
        height={30}
        src={x.software_image_link}
        alt="Profile"
        roundedCircle
      />
    }
  })

  function UpdateUserProfile() {
    setMessage("กำลังโหลด")
    if (!userImage) {
      UpdateUserData(userData.user_image_link);
      UpdateUserTag();
    } else {
      const uploadTask = storage.ref(`images/${userImage.name}`).put(userImage);
      uploadTask.on(
        "state_changed",
        snapshot => { },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(userImage.name)
            .getDownloadURL()
            .then(url => {
              UpdateUserData(url);
              UpdateUserTag();
            });
        },
      )
    }
  }

  function UpdateUserData(url) {
    axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/users/" + currentUser.uid, {
      id: currentUser.uid,
      email: userData.email,
      user_activated: userData.user_activated,
      first_name: userData.first_name,
      last_name: userData.last_name,
      user_about: userData.user_about,
      user_website: userData.user_website,
      user_skill: userData.user_skill,
      user_province_id: userData.user_province_id,
      user_image_link: url,
      user_blog: userData.user_blog,
      user_portfolio: userData.user_portfolio
    })
  }

  function UpdateUserTag() {
    axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/usertagrel/" + userTag1.id, {
      user_id: userTag1.user_id,
      user_tag_id: userTag1.user_tag_id
    })
      .then(() => {
        axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/usertagrel/" + userTag2.id, {
          user_id: userTag2.user_id,
          user_tag_id: userTag2.user_tag_id
        })
          .then(() => {
            axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/usertagrel/" + userTag3.id, {
              user_id: userTag3.user_id,
              user_tag_id: userTag3.user_tag_id
            })
              .then((res) => {
                UpdateUserSoftware()
                console.log(res.data)
              });
          });
      });
  }

  function UpdateWebsite() {
    // axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/users/" + currentUser.uid, {
    //   id: currentUser.uid,
    //   email: userData.email,
    //   user_activated: userData.user_activated,
    //   first_name: userData.first_name,
    //   last_name: userData.last_name,
    //   user_about: userData.user_about,
    //   user_website: updateUserWebsite,
    //   user_skill: userData.user_skill,
    //   user_province_id: userData.user_province_id,
    //   user_image_link: userData.user_image_link,
    //   user_blog: updateUserBlog,
    //   user_portfolio: updateUserPortfolio
    // })
  }

  function UpdateUserSoftware() {

    const results = softwareRelNew.filter(({ user_software_id: id1 }) => !softwareRel.some(({ user_software_id: id2 }) => id2 === id1));
    //บรทัดบนไม่ error เมื่อหาค่าไม่เจอ หรือไม่มีค่า
    // console.log(results);
    if (results.length === 0) {
      window.location.reload(false);
    }
    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/usersoftwarerel`, {
          user_id: currentUser.uid,
          user_software_id: results[i].user_software_id
        })
      }
      window.location.reload(false);
    }

    if (softwareRelDel.length > 0) {
      const softwareDel = softwareRelDel.filter(x => {                     //เอาแค่ software ที่ user เคยมี
        return softwareRel.some(y => y.user_software_id === x.software_id)
      })
      console.log(softwareDel)
      if (softwareDel.length > 0) {
        for (let i = 0; i < softwareDel.length; i++) {
          axios.delete(process.env.REACT_APP_API_ENDPOINT + "/api/usersoftwarerel/" + softwareDel[i].id)
        }
        window.location.reload(false);
      }
    }
  }

  const props = {
    userData,
    userSkill,
    software,
    modalShow,
    setModalShow,
    userProjectData,
    userProjectRel,
    userProjectDataAll,
    userTagEditProfile,
    userTagApi,
    userTag1, userTag2, userTag3,
    setuserTag1, setuserTag2, setuserTag3,
    UpdateUserProfile,
    setUserImage,
    userImage,
    currentUser,
    UpdateWebsite,
    softwareRel,
    softwareRelNew,
    softwareRelDel,
    forceUpdate,
    UpdateUserSoftware,
    id,
    userProjectFilter, setUserProjectFilter,
    userProjectFilterAll, setUserProjectFilterAll,
    message
  }

  return (
    <div>
      {isLoading === false ? <Spinner />
        :
        <div>
          <Navbar1 />
          <StyleProfile>
            <header>
              <Container fluid="lg" style={{ maxWidth: "1140px" }}>
                <Row
                  className="profile-box"
                  style={{ marginTop: "60px", marginBottom: "40px" }}
                >
                  <Col sm="auto">
                    <Image
                      className="imguser"
                      style={{ objectFit: "cover", margin: "0px 60px" }}
                      width={200}
                      height={200}
                      src={userData.user_image_link ? userData.user_image_link : "https://pixabay.com/get/g6e45d739b05a66e3f2ed3a99f17e3026ffc28049968c3ebdcbc664be2af9211a8c32427f2150b389dbfb79b381488fa123bc79393be2b0f1b5ff851805f596f2d2b4b2c69fb2da2fe05213a61c521b11_640.png"}
                      alt="Profile"
                      roundedCircle
                    />
                  </Col>
                  <Col className="cotant-data">
                    {tagElement}
                    <h2>{userData.first_name} {userData.last_name}</h2>
                    <div className="text-data">
                      <span className="status-lable">สถานะ :</span>
                      เจ้าของ {userProjectData.length} โปรเจค, เข้าร่วม {userProjectDataAllDisplay.length} โปรเจค
                    </div>
                    <div className="lable-program">โปรแกรมที่ใช้</div>
                    <Stylelogo className="tag-program">
                      {userSoftware[0].user_software === " " && userSoftware.length === 1 ? <div className="text-secondary">คุณยังไม่ได้เพิ่มโปรแกรมที่คุณใช้</div> : softwareElement}
                    </Stylelogo>
                  </Col>
                  <Col sm="auto">
                    {currentUser.uid !== id ? null : <div
                      className="edit boxmain"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => setModalShow(true)}
                    >
                      <Image className="Edituser" src={Editicon} alt="Editicon" />
                    </div>}
                  </Col>
                </Row>
              </Container>
              <ModalEditProfile {...props} />
            </header>
            <section>
              <TabProfile {...props} />
            </section>


            <footer style={{ background: "#F9F9F9" }}>
              <Footer />
            </footer>
          </StyleProfile>

        </div>
      }
    </div>
  );
}

export default Profileuser;
