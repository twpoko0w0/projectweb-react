import React, { useState, useEffect, useReducer } from "react";
import { Button, Col, Container, Row, Alert, Image } from "react-bootstrap";
import Navbar1 from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import { StartProStep1 } from "./StartProStep1";
import StartProStep2 from "./StartProStep2";
import StartProStep3 from "./StartProStep3";
import StartProStep4 from "./StartProStep4";
import StartProStep5 from "./StartProStep5";
import styled from "styled-components";
import axios from "axios";
import { storage } from './../../firebase'
import { Link, useNavigate, Navigate, NavLink } from "react-router-dom"
import firebase from 'firebase/compat/app';
import Spinner from "../../Component/LoadingSpinner/Spinner";
import bar1 from "../../All_Img/Progress bar1.png"
import bar2 from "../../All_Img/Progress bar2.png"
import bar3 from "../../All_Img/Progress bar3.png"
import bar4 from "../../All_Img/Progress bar4.png"

const StyleBG = styled.div`
  background: #f9f9f9;
  width: 100%;
  height: 100vw;

  .progressbar {
    width: 400px;
    height: 10px;
    background-color: white;
    margin-bottom: 50px;
  }

  .progressbar div {
    width: 33.3%;
    height: 100%;
    background-color: rgb(98, 0, 255);
  }
  .header{
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
  .Next-btn{
    display: flex;
    align-self: center;
    float: right;
  }
  span{
    margin: 0px;
    padding: 0px;
    
  }
  .back-btn{
    display: flex;
    align-self: center;
  }
  .back-icon{
    padding-right: 10px;
  }
  .flow-icon{
    padding-left: 10px;
  }
`;

export function StartProStep({ currentUser }) {
  const [isLoading, setIsLoading] = useState(false)
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [page, setPage] = useState(0);
  const [getProjectId, setGetProjectId] = useState(0);
  const [projectTag, setProjectTag] = useState([]);
  const [formdata, setFormdata] = useState({
    projectName: "",
    projectCategoryId: 6,
    projectSeriousnessId: 1,
    projectStatusId: 1,
    projectDetail: "",
    projectBriefDetail: "",
    projectContact: "",
    projectImageLink: "",
    projectDurationId: 1,
    projectTagId: 47,
    projectRole: "",
    projectPositionQuantity: 1
  });
  const newProjectId = getProjectId + 1
  const [tagList, setTagList] = useState([]);
  const [isPost, setIsPost] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [software, setSoftware] = useState([])
  const [selectSoftware, setSelectSoftware] = useState([])
  const [message, setMessage] = useState("")
  const [doneMessage, setDoneMessage] = useState("")
  const [test, setTest] = useState("")

  useEffect(() => {
    let isMounted = true;
    if (!currentUser) {
      return navigate({ pathname: '/Login' })
    }
    else {
      axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/project")
        .then((res) => {
          const resProject = res.data;
          if (isMounted) {
            setGetProjectId(resProject[0].id)
            setFormdata({
              projectName: "",
              projectCategoryId: 6,
              projectSeriousnessId: 1,
              projectStatusId: 1,
              projectDetail: "",
              projectBriefDetail: "",
              projectContact: "",
              projectImageLink: "",
              projectDurationId: 1,
              projectTagId: 47,
              projectRole: "",
              projectPositionQuantity: 1
            })
          }

          axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projecttag")
            .then((res) => {
              const projectTag = res.data;
              if (isMounted) {
                setProjectTag(projectTag);
                setIsLoading(true)
              }

            });
        });
      axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/usersoftware")
        .then((res) => {
          const resSoftware = res.data;
          if (isMounted) {
            setSoftware(resSoftware)
          }

        });
      // axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projectsoftwarerel")
      //   .then((res) => {
      //     const software = res.data;
      //     setProjectTag(projectTag);
      //     setIsLoading(true)
      //   });
    }
  }, [])

  const FormTitles = [
    "1 ใน 4 ขั้นตอน",
    "2 ใน 4 ขั้นตอน",
    "3 ใน 4 ขั้นตอน",
    "ขั้นตอนสุดท้ายแล้ว !",
  ];

  const props = { formdata, setFormdata, projectTag, tagList, newProjectId, forceUpdate, setImage, url, software, selectSoftware, currentUser, message, image, test, setTest }
  const PageDisplay = () => {
    if (page === 0) {
      return (
        <div>
          <StartProStep1
            FormTitles={FormTitles}
            page={page}
            setPage={setPage}
            {...props}
          />
        </div>
      );
    } else if (page === 1) {
      return (
        <StartProStep2
          FormTitles={FormTitles}
          page={page}
          setPage={setPage}
          {...props}
        />
      );
    } else if (page === 2) {
      return (
        <StartProStep3
          FormTitles={FormTitles}
          page={page}
          setPage={setPage}
          {...props}
        />
      );
    } else if (page === 3) {
      return (
        <StartProStep4
          FormTitles={FormTitles}
          page={page}
          setPage={setPage}
          {...props}
        ////
        />
      );
    } else {
      return (
        <StartProStep5
          FormTitles={FormTitles}
          page={page}
          setPage={setPage}
          formdata={formdata}
          setFormdata={setFormdata}
        />
      );
    }
  };

  function handleIncreasePage() {

    if (!image && page === 2) {
      setMessage("กรุณาอัพโหลดรูปภาพ")
    } else {
      setPage((currPage) => currPage + 1);
      setMessage("");
    }
  }

  const PostFromList = (event) => {
    if (tagList.length > 0) {
      setDoneMessage("กำลังสร้างโปรเจค กรุณารอสักครู่...")
      event.preventDefault();
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
              setUrl(url);
              console.log(url);
              setTimeout(function () {

                axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/project`, { project_name: formdata.projectName, project_activated: 1, project_status_id: formdata.projectStatusId, project_category_id: formdata.projectCategoryId, project_seriousness_id: formdata.projectSeriousnessId, project_detail: formdata.projectDetail, project_create_date: new Date(), project_brief_detail: formdata.projectBriefDetail, project_contact: formdata.projectContact, project_image_link: url, project_duration_id: formdata.projectDurationId })
                  .then((res) => {
                    const currProject = res.data
                    tagList.map((val) => {
                      return (
                        axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/projecttagrel`, { project_id: currProject.id, project_tag_id: val.projectTagId, project_tag_role: val.projectRole, project_position_quantity_id: val.projectPositionQuantity })
                          .then(function (response) {
                            setIsPost(true);
                          })
                      )
                    });

                    if (selectSoftware.length > 0) {
                      for (let i = 0; i < selectSoftware.length; i++) {
                        axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/projectsoftwarerel", { project_id: currProject.id, project_software_id: selectSoftware[i].project_software_id })
                      }
                    }

                    axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/userprojectrel`, { user_id: currentUser.uid, project_id: currProject.id, project_role_id: 1, project_tag_rel_id: 191 })
                      .then(function (response) {
                        navigate({ pathname: '/' })
                      })
                  })
                  .catch(function (error) {
                    console.error(error.response.data);
                  });
              }, 1000);
            });
        },
      )
    } else {
      setDoneMessage("กรุณาเพิ่มแท็กลงลิสต์")
    }

  }

  console.log("Tag" + tagList.length)
  return (
    <>
      {isLoading === false ? (
        <Spinner />
      ) : (
        <StyleBG >
          <Navbar1 />
          <div className="BG" >
            <Container fluid="lg "  >
              <Row className="Style" style={{ alignContent: "center" }}>
                <Col >
                  <div className="header" >
                    <div className="content-box-header">
                      <p style={{ textAlign: "center", color: "#0d6efd" }}>{FormTitles[page]} </p>
                      {page === 0 ? (
                        <Image src={bar1} alt="bar1" />
                      ) : page === 1 ? (
                        <Image src={bar2} alt="bar2" />
                      ) : page === 2 ? (
                        <Image src={bar3} alt="bar3" />
                      ) : (
                        <Image src={bar4} alt="bar4" />
                      )}
                    </div>
                  </div>
                  <div className="body" >
                    {PageDisplay()}
                    <Row className="mt-5" style={{ padding: "0 14rem" }}>
                      {(message === "กรุณาอัพโหลดรูปภาพ" && page === 2) || (page === 0 && message === "กรุณากรอกชื่อโปรเจค") ? <>{message && <Alert variant="danger">{message}</Alert>}</> : null}

                      {doneMessage === "กรุณาเพิ่มแท็กลงลิสต์" ? <>{doneMessage && <Alert variant="danger">{doneMessage}</Alert>}</> : <>{doneMessage && <Alert variant="success">{doneMessage}</Alert>}</>}

                      <Col className="d-flex" >
                        {page === 0 ? (
                          <div></div>
                        ) : (
                          <span
                            className="back-btn"
                            disabled={page === 0}
                            onClick={() =>
                              setPage((currPage) => currPage - 1)
                            }
                          >
                            <span class="material-icons-outlined back-icon">
                              arrow_back
                            </span>
                            ย้อนกลับ
                          </span>
                        )}
                      </Col>
                      <Col  >

                        {page === 3 ? (
                          <Button style={{ float: "right", display: "flex" }} onClick={PostFromList}>
                            เสร็จสิ้น
                            <span class="material-icons " style={{ paddingLeft: "10px" }}>
                              check_circle
                            </span>
                          </Button>
                        ) : (

                          <Button
                            disabled={page === FormTitles.length - 1}
                            variant="outline-primary"
                            className="Next-btn"
                            onClick={() => formdata.projectName === "" ? setMessage("กรุณากรอกชื่อโปรเจค") : handleIncreasePage()}
                          >
                            {page === 2 ? "ถัดไป: หาตำแหน่งที่ต้องการ" : "ถัดไป: เลือกระดับของโปรเจค"}
                            <span class="material-icons-outlined flow-icon">
                              arrow_forward
                            </span>
                          </Button>
                        )}
                      </Col>
                    </Row>

                  </div>

                </Col>
              </Row>
            </Container>
          </div>
          <div style={{ marginTop: "24rem" }}>
            <Footer />
          </div>
        </StyleBG>
      )}
    </>
  );
}


