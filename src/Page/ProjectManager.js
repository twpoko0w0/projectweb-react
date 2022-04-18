import React, { useEffect, useState, useRef, useReducer } from "react";
import { Button, Container, Tab, Nav } from "react-bootstrap";
import Navbar from "../Component/Navbar";
import TabManage from "../Component/Tab/TabManage";
import CardMember from "../Component/Card/CardMember";
import ElemResume from "../Component/ELemJoinProject/ElemResume";
import AccordionQuestion from "../Component/Accordion/AccordionQuestion";
import styled from "styled-components";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { storage } from "../firebase";
import Spinner from "../Component/LoadingSpinner/Spinner";
import firebase from 'firebase/compat/app';

const StyleBg = styled.div`
background: #F9F9F9;`;
const StyleTabMan = styled.div`
 header {
  display: flex ;
  margin-top: 40px;
 };
 .Tag-status{
   margin: 0px 20px ;
   padding: 0px 10px ;
   align-self: center;
   border-radius: 8px;
 }
 .TabGrid{
   height: 100vh;
  background: #ffff;
 }
 .footer{
   padding-top: 80px ;
   background-color: #ffff;
 }
   .nav-item {
      cursor: pointer;
  }
`;

const findCardRole = [
  { id: 1, role: "Owner" },
  { id: 2, role: "Moderator" },
  { id: 3, role: "Member" },
]

function ProjectManager() {
  const { id } = useParams();
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [projectDetail, setProjectDetail] = useState([]); // for main object project static data
  const [tagRel, setTagRel] = useState([]);
  const [projectTag, setProjectTag] = useState([]);
  const [objectTag, setObjectTag] = useState([])
  const [durationId, setDurationId] = useState(0)
  const [defaultValue, setDefaultValue] = useState({  // for reset vale when edit closed eiei => pai set kar updateProjectDetail na
    project_name: "",
    project_activated: 0,
    project_status_id: 0,
    project_category_id: 0,
    project_seriousness_id: 0,
    project_detail: "",
    project_brief_detail: "",
    project_contact: "",
    project_duration_id: 0,
    project_image_link: ""
  })
  const [updateProjectDetail, setUpdateProjectDetail] = useState({ // for store current value pana
    project_name: "",
    project_activated: 0,
    project_status_id: 0,
    project_category_id: 0,
    project_seriousness_id: 0,
    project_detail: "",
    project_brief_detail: "",
    project_contact: "",
    project_duration_id: 0,
    project_image_link: ""
  })
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(0)
  const [buttonShow, setButtonShow] = useState("")
  const [joinReq, setJoinReq] = useState([])  // user project Join request    เช็คโปรเจคนี้มีคนขอเข้าร่วมกี่คน
  const [newUserJoinObj, setNewUserJoinObj] = useState([])  // new obj for display with date time
  const [userReq, setUserReq] = useState([])   //User req ทั้งหมด เพื่อเอาไปหาว่า user มี project กี่อัน
  const [userData, setUserData] = useState([])
  const [member, setMember] = useState([])
  const [softwareRel, setSoftwareRel] = useState([])
  const [softwareRelNew, setSoftwareRelNew] = useState([])
  const [softwareRelDel, setSoftwareRelDel] = useState([])
  const [software, setSoftware] = useState([])
  const [value, setValue] = useState('checking value...');
  const [currUserRole, setCurrUserRole] = useState(0)

  useEffect(() => {
    let isMounted = true;
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        return navigate({ pathname: '/' })
      } else {
        setUser(user)
        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/project")
          .then((res) => {
            const resProject = res.data;
            const projectDetail = resProject.find(x => x.id === parseInt(id))
            const tagName = projectDetail.project_tag_name.split(",")
            const tagRole = projectDetail.project_tag_role.split(",")
            const tagQuantity = projectDetail.quantity.split(",")
            const tagRelationId = projectDetail.project_tag_relation_id.split(",")
            const tagId = projectDetail.project_tag_id.split(",")

            for (let i = 0; i < tagName.length; i++) {
              const object = {
                key: i,
                project_tag_relation_id: tagRelationId[i],
                project_tag_name: tagName[i],
                project_role: tagRole[i],
                project_quantity: tagQuantity[i],
                project_tag_id: tagId[i]
              }
              objectTag.push(object);
              // console.log(tagName[i])
            }
            if (isMounted) {
              setProjectDetail(projectDetail);
            }

            let updateObj = {
              project_name: projectDetail.project_name,
              project_activated: projectDetail.project_activated,
              project_status_id: projectDetail.project_status_id,
              project_category_id: projectDetail.project_category_id,
              project_seriousness_id: projectDetail.project_seriousness_id,
              project_detail: projectDetail.project_detail,
              project_brief_detail: projectDetail.project_brief_detail,
              project_contact: projectDetail.project_contact,
              project_duration_id: projectDetail.project_duration_id,
              project_image_link: projectDetail.project_image_link
            }
            if (isMounted) {
              SetState(updateObj)  //Function

            }

          });

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projecttagrel")
          .then((res) => {
            const resTagRel = res.data;
            const projectTagRel = resTagRel.filter(x => x.project_id === parseInt(id))
            if (isMounted) {
              setTagRel(projectTagRel)
            }

            // console.log(projectTagRel)
          });

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projecttag")
          .then((res) => {
            const projectTag = res.data;
            if (isMounted) {
              setProjectTag(projectTag);
            }

          });

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectjoinreq")
          .then((res) => {
            const userReq = res.data;
            const joinReq = userReq.filter(x => x.project_id === parseInt(id))  // ข้อมูลจาก join request table
            // joinReq.sort((firstId, secondId) => firstId.user_id - secondId.user_id);
            joinReq.sort((a, b) => a.user_id.localeCompare(b.user_id, undefined, { sensitivity: 'base' }))
            // console.log("Here " + joinReq[0].user_id)
            axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/users")         //     สำหรับหน้า user join request
              .then((res) => {
                const userData = res.data;
                if (isMounted) {
                  setUserData(userData)
                }

                const userDataJoinReq = userData.filter(x => {    // Output sort โดย alphabet
                  return joinReq.some(y => x.id === y.user_id)
                });
                // console.log("Here2 " + userDataJoinReq[0].id)
                for (let i = 0; i < joinReq.length; i++) {                        // object สำหรับหน้า user join request
                  let newObj = {
                    id: joinReq[i].id,
                    first_name: userDataJoinReq[i].first_name,
                    last_name: userDataJoinReq[i].last_name,
                    user_id: joinReq[i].user_id,
                    date_time: joinReq[i].date_time,
                    user_tag_name: userDataJoinReq[i].user_tag_name,
                    user_image_link: userDataJoinReq[i].user_image_link,
                    email: userDataJoinReq[i].email,
                    software_image_link: userDataJoinReq[i].software_image_link,
                    user_software: userDataJoinReq[i].user_software,
                    project_tag_rel_id: joinReq[i].project_tag_rel_id,
                    interview: joinReq[i].interview,
                    facebook: joinReq[i].facebook,
                    reqEmail: joinReq[i].email,
                    line: joinReq[i].line
                  }
                  newUserJoinObj.push(newObj)
                  // console.log(newObj)
                }
                axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectrel")    // สำหรับ หน้า project member
                  .then((res) => {
                    const resProjectRel = res.data;

                    const thisMember = resProjectRel.filter(x => x.project_id === parseInt(id))
                    try {
                      const currUserRole = thisMember.find(x => x.user_id === user.uid).project_role_id
                      if (isMounted) {
                        setCurrUserRole(currUserRole)
                      }
                    } catch {
                      navigate({ pathname: '/' })
                    }

                    // filter ครั้งแรก จะจัดเรียงตาม id
                    thisMember.sort((a, b) => a.user_id.localeCompare(b.user_id, undefined, { sensitivity: 'base' })) // sort ใหม่ ให้จัดเรียงตาม alphabet เพราะ some method จะจัดเรียงใหม่่ให้เป็น alphabet
                    const memberData = userData.filter(x => {
                      return thisMember.some(y => x.id === y.user_id)
                    })

                    // console.log("here: " + thisMember[0].project_role_id)

                    for (let i = 0; i < thisMember.length; i++) {                        // obj สำหรับหน้า member
                      let obj = {
                        id: thisMember[i].id,    // id user project rel
                        user_id: thisMember[i].user_id,
                        first_name: memberData[i].first_name,
                        last_name: memberData[i].last_name,
                        user_image_link: memberData[i].user_image_link,
                        project_tag_rel_id: thisMember[i].project_tag_rel_id,   // ต้องเอาจาก user project rel  191, 186
                        project_role_id: thisMember[i].project_role_id
                      }
                      // console.log("here: " + member[0].first_name)
                      member.push(obj)
                    }
                    // ลอ หลัง loop เสร็จเอา member มา indexOf เช็คกับ currUser
                    // setMember(memberData)
                    if (isMounted) {
                      setUserReq(resProjectRel)
                      setIsLoading(true)
                    }

                  });
                if (isMounted) {
                  setJoinReq(userDataJoinReq)
                }


              });
          });
        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projectsoftwarerel")
          .then((res) => {
            const softwareRel = res.data;
            const thisProjectSoftware = softwareRel.filter(x => x.project_id === parseInt(id))
            const thisProjectSoftware2 = softwareRel.filter(x => x.project_id === parseInt(id))
            if (isMounted) {
              setSoftwareRel(thisProjectSoftware)
              setSoftwareRelNew(thisProjectSoftware2)
            }

          });

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/usersoftware")
          .then((res) => {
            const resSoftware = res.data;
            if (isMounted) {
              setSoftware(resSoftware)
            }
          });
      }
    })
    return () => {
      isMounted = false;
    };
  }, [])

  // console.log("Test obj: " + testObj[0].user_id)

  function fetchValue() {

  }

  function SetState(obj) {
    setUpdateProjectDetail(obj);
    setDefaultValue(obj);
  }

  function UpdateAll() {
    if (!image) {
      Update(updateProjectDetail.project_image_link);
    }
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            Update(url);
          });
      },
    )
  }

  function Update(url) {
    axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/project/" + id, {
      project_name: updateProjectDetail.project_name,
      project_activated: updateProjectDetail.project_activated,
      project_status_id: updateProjectDetail.project_status_id,
      project_category_id: updateProjectDetail.project_category_id,
      project_seriousness_id: updateProjectDetail.project_seriousness_id,
      project_detail: updateProjectDetail.project_detail,
      project_brief_detail: updateProjectDetail.project_brief_detail,
      project_contact: updateProjectDetail.project_contact,
      project_image_link: url,
      project_duration_id: updateProjectDetail.project_duration_id
    })
      .then((res) => {
        console.log(res.data)
        UpdateUserSoftware()
        // window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function UpdateUserSoftware() {

    const results = softwareRelNew.filter(({ project_software_id: id1 }) => !softwareRel.some(({ project_software_id: id2 }) => id2 === id1));
    //บรทัดบนไม่ error เมื่อหาค่าไม่เจอ หรือไม่มีค่า
    // console.log(results);
    if (results.length === 0) {
      window.location.reload(false);
    }
    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/projectsoftwarerel", {
          project_id: parseInt(id),
          project_software_id: results[i].project_software_id
        })
      }
      window.location.reload(false);
    }

    if (softwareRelDel.length > 0) {
      const softwareDel = softwareRelDel.filter(x => {                     //เอาแค่ software ที่ user เคยมี
        return softwareRel.some(y => y.project_software_id === x.software_id)
      })
      console.log(softwareDel)
      if (softwareDel.length > 0) {
        for (let i = 0; i < softwareDel.length; i++) {
          axios.delete(process.env.REACT_APP_API_ENDPOINT + "/api/projectsoftwarerel/" + softwareDel[i].id)
        }
        window.location.reload(false);
      }
    }
  }

  function DeleteMember(id) {
    axios.delete(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectrel/" + id)
      .then((res) => {
        navigate({ pathname: '/' })
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const props = {
    projectDetail,
    objectTag,
    tagRel,
    projectTag,
    updateProjectDetail,
    setUpdateProjectDetail,
    isOpen,
    setIsOpen,
    defaultValue,
    Update,
    image,
    setImage,
    buttonShow,
    setButtonShow,
    UpdateAll,
    joinReq,
    newUserJoinObj,
    userReq,
    userData,
    member,
    id,
    DeleteMember,
    softwareRel, softwareRelNew, softwareRelDel,
    software,
    forceUpdate,
    user,
    setSoftwareRelNew, setSoftwareRelDel, navigate, currUserRole
  }

  console.log("currUserRole: " + currUserRole)

  if (currUserRole !== 3) {
    return (
      <StyleBg>
        {isLoading === false ? <Spinner />
          :
          <div>
            <Navbar />
            <StyleTabMan>
              <Link to={`/ProjectDetail/${projectDetail.id}`}></Link>
              <Container fluid="lg" style={{ maxWidth: "1140px" }}>
                <header>
                  <h2>{projectDetail.project_name}</h2>
                  <Button className="Tag-status px" variant="primary" inline>{projectDetail.status_name}</Button>
                </header>
              </Container>
              <section>
                <Tab.Container style={{ height: "48px" }} defaultActiveKey="link-1">
                  <Container fluid="lg">
                    <Nav style={{ height: "72px" }}>
                      <Nav.Item>
                        <Nav.Link className="Items1" eventKey="link-1" >
                          รายละเอียด
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className="Items2" eventKey="link-2">
                          {" "}
                          สมาชิก
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className="Items3" eventKey="link-3">
                          {" "}
                          คำขอเข้าร่วม
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className="Items4" eventKey="link-4" >
                          {" "}
                          คำถาม
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Container>
                  {/* <hr className="MM" /> */}
                  <Tab.Content className="TabGrid">
                    <Tab.Pane eventKey="link-1">
                      <TabManage {...props} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="link-2">
                      <CardMember {...props} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="link-3">
                      <ElemResume {...props} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="link-4">
                      <AccordionQuestion />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </section>
              <div className="footer"></div>
            </StyleTabMan>
          </div>}

      </StyleBg>
    );
  } else {
    return (
      <StyleBg>
        {isLoading === false ? <Spinner />
          :
          <div>
            <Navbar />
            <StyleTabMan>
              <Link to={`/ProjectDetail/${projectDetail.id}`}></Link>
              <Container fluid="lg" style={{ maxWidth: "1140px" }}>
                <header>
                  <h2>{projectDetail.project_name}</h2>
                  <Button className="Tag-status px" variant="primary" inline>{projectDetail.status_name}</Button>
                </header>
              </Container>
              <section>
                <Tab.Container style={{ height: "48px" }} defaultActiveKey="link-1">
                  <Container fluid="lg">
                    <Nav style={{ height: "72px" }}>
                      <Nav.Item>
                        <Nav.Link className="Items1" eventKey="link-1" >
                          รายละเอียด
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className="Items2" eventKey="link-2">
                          {" "}
                          สมาชิก
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Container>
                  {/* <hr className="MM" /> */}
                  <Tab.Content className="TabGrid">
                    <Tab.Pane eventKey="link-1">
                      <TabManage {...props} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="link-2">
                      <CardMember {...props} />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </section>
              <div className="footer"></div>
            </StyleTabMan>
          </div>}
      </StyleBg>
    );
  }


}

export default ProjectManager;
