import React, { useState, useEffect, useReducer } from "react";
import { Button, Col, Container, Row, Alert } from "react-bootstrap";
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

const StyleBG = styled.div`
  background: #f9f9f9;
  height: 100vw;
  width: auto;

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

  console.log("Curr projectId: " + getProjectId)
  console.log("new projectId: " + newProjectId)


  useEffect(() => {
    if (!currentUser) {
      return navigate({ pathname: '/Login' })
    }
    else {
      axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/project")
        .then((res) => {
          const resProject = res.data;
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
          axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projecttag")
            .then((res) => {
              const projectTag = res.data;
              setProjectTag(projectTag);
              setIsLoading(true)
            });
        });
    }
  }, [])

  const FormTitles = [
    "1 ใน 4 ขั้นตอน",
    "2 ใน 4 ขั้นตอน",
    "3 ใน 4 ขั้นตอน",
    "ขั้นตอนสุดท้ายแล้ว !",
  ];

  const props = { formdata, setFormdata, projectTag, tagList, newProjectId, forceUpdate, setImage, url }
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

  const PostFromList = (event) => {
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
                  axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/userprojectrel`, { user_id: currentUser.uid, project_id: newProjectId, project_role_id: 1, project_tag_rel_id: 191 })
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
  }

  return (
    <>
      {isLoading === false ? <Spinner />
        :
        <div>
          <Navbar1 />
          <StyleBG>
            <div className="form BG">
              <Container fluid="lg">
                <Row className="Style" style={{ alignContent: "center" }}>
                  <Col>
                    <div className="header">
                      <h1>{FormTitles[page]} </h1>
                      <div className="progressbar ">
                        <div
                          style={{
                            width:
                              page === 0
                                ? "20%"
                                : page === 1
                                  ? "40%"
                                  : page === 2
                                    ? "60%"
                                    : page === 3
                                      ? "80%"
                                      : "100%",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="body">{PageDisplay()}</div>
                    <div className="footer mt-5">
                      <Row>
                        <Col xs={12} md={11}>
                          {page === 0 ? <div></div> : <Button disabled={page === 0} onClick={() => setPage((currPage) => currPage - 1)}>
                            Prev
                          </Button>}

                        </Col>
                        <Col xs={12} md={1} className="px-4">
                          {page === 3 ? <Button onClick={PostFromList}>
                            Post
                          </Button> : <Button disabled={page === FormTitles.length - 1} onClick={() => setPage((currPage) => currPage + 1)}>
                            Next
                          </Button>}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </StyleBG>
          <Footer />
        </div>
      }

    </>
  );
}


