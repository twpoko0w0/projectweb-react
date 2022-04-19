import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Navbar1 from "../Component/Navbar";
import styled from "styled-components";
import Tab1 from "../Component/Tab1";
import CardProfile from "../Component/Card/CardProfile";
import axios from "axios";
import { Link, useParams, NavLink } from 'react-router-dom';
import Homepage from "./Homepage";
import Spinner from "../Component/LoadingSpinner/Spinner";
import firebase from 'firebase/compat/app';


const StyleDetail = styled.div`
  margin: 36px 0px;
  display: grid;
  grid-template-columns: 500px auto;
  .Detail {
    padding: 0px 20px;
  }
  .H4Grid {
    margin-top: 10px;
    display: grid;
    grid-template-columns: auto auto;
  }
  .Text-D {
    padding: 0px;
    margin: 0px;
  }
  a {                          
    text-decoration: none;
}
.lv-work{
  margin: 0px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  font-size: 14px;
  color:#fff;
  border-radius: 4px;
  float: right;
}
`;

function ProjectDetail({ currentUser }) {
  const { id } = useParams(null);
  const [user, setUser] = useState([]);
  const [projectDetail, setProjectDetail] = useState([]);
  const [objectTag, setObjectTag] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [ownerProfile, setOwnerProfile] = useState([])
  const [isUserJoin, setIsUserJoin] = useState([])
  const [isUserMember, setIsUserMember] = useState([])
  const [member, setMember] = useState([])
  const [tagRel, setTagRel] = useState([]);
  const [projectTag, setProjectTag] = useState([]);
  const [projectSoftwareRel, setProjectSoftwareRel] = useState([]);
  const [software, setSoftware] = useState([])
  const [userJoinReq, setUserJoinReq] = useState(0)
  const props = { objectTag, currentUser, ownerProfile, projectDetail, id, isUserJoin, member, tagRel, projectTag, isUserMember, user, projectSoftwareRel, software, userJoinReq }

  useEffect(() => {
    let isMounted = true;
    axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/project")
      .then((res) => {
        const resProject = res.data;
        const projectDetail = resProject.find(x => x.id === parseInt(id))
        const tagName = projectDetail.project_tag_name.split(",")
        const tagRole = projectDetail.project_tag_role.split(",")
        const tagQuantity = projectDetail.quantity.split(",")
        const tagRelId = projectDetail.project_tag_relation_id.split(",")

        for (let i = 0; i < tagName.length; i++) {
          const object = {
            key: i,
            project_tag_name: tagName[i],
            project_role: tagRole[i],
            project_quantity: tagQuantity[i],
            project_tag_relation_id: tagRelId[i]
          }
          objectTag.push(object);
          // console.log(tagName[i])
        }
        // console.log(projectDetail.duration)

        firebase.auth().onAuthStateChanged(user => {
          if (isMounted) {
            setUser(user)
          }

          if (user) {
            axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectjoinreq")
              .then((res) => {
                const resJoin = res.data
                const checkUserJoinReq = resJoin.filter(x => x.project_id === parseInt(id))
                const findUserJoin = checkUserJoinReq.map(x => x.user_id).indexOf(user.uid);

                if (findUserJoin !== -1) {
                  const findUserJoinReqId = checkUserJoinReq.find(x => x.user_id === user.uid).id
                  setUserJoinReq(findUserJoinReqId)
                }

                if (isMounted) {
                  setIsUserJoin(findUserJoin)
                }

              })

            axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectrel")
              .then((res) => {
                const resProjectRel = res.data;
                const thisUserRel = resProjectRel.filter(x => x.project_id === parseInt(id) && x.project_role_id === 1)

                const checkUserMember = resProjectRel.filter(x => x.project_id === parseInt(id))
                const findUserMember = checkUserMember.map(x => x.user_id).indexOf(user.uid);
                if (isMounted) {
                  setIsUserMember(findUserMember)
                }

                // console.log("This user owner: " + thisUserRel[0].user_id)

                axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/users")
                  .then((res) => {
                    const resUser = res.data;
                    const thisUser = resUser.find(x => x.id === thisUserRel[0].user_id)
                    if (isMounted) {
                      setOwnerProfile(thisUser);
                    }



                    const thisMember = resProjectRel.filter(x => x.project_id === parseInt(id))   // filter ครั้งแรก จะจัดเรียงตาม id
                    thisMember.sort((a, b) => a.user_id.localeCompare(b.user_id, undefined, { sensitivity: 'base' })) // sort ใหม่ ให้จัดเรียงตาม alphabet เพราะ some method จะจัดเรียงใหม่่ให้เป็น alphabet
                    const memberData = resUser.filter(x => {
                      return thisMember.some(y => x.id === y.user_id)
                    })
                    // console.log("here: " + thisMember[0].project_role_id)

                    for (let i = 0; i < thisMember.length; i++) {                        // obj สำหรับหน้า member
                      let obj = {
                        id: thisMember[i].id,
                        first_name: memberData[i].first_name,
                        last_name: memberData[i].last_name,
                        user_image_link: memberData[i].user_image_link,
                        project_tag_rel_id: thisMember[i].project_tag_rel_id,   // ต้องเอาจาก user project rel  191, 186
                        project_role_id: thisMember[i].project_role_id,
                        user_id: memberData[i].id
                      }
                      member.push(obj)
                    }
                    if (isMounted) {
                      setIsLoading(true)
                    }

                  });
              });
          } else {
            axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectjoinreq")
              .then((res) => {
                const resJoin = res.data
                const checkUserJoinReq = resJoin.filter(x => x.project_id === parseInt(id))

              })

            axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectrel")
              .then((res) => {
                const resProjectRel = res.data;
                const thisUserRel = resProjectRel.filter(x => x.project_id === parseInt(id) && x.project_role_id === 1)

                const checkUserMember = resProjectRel.filter(x => x.project_id === parseInt(id))

                // console.log("This user owner: " + thisUserRel[0].user_id)

                axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/users")
                  .then((res) => {
                    const resUser = res.data;
                    const thisUser = resUser.find(x => x.id === thisUserRel[0].user_id)
                    if (isMounted) {
                      setOwnerProfile(thisUser);
                    }



                    const thisMember = resProjectRel.filter(x => x.project_id === parseInt(id))   // filter ครั้งแรก จะจัดเรียงตาม id
                    thisMember.sort((a, b) => a.user_id.localeCompare(b.user_id, undefined, { sensitivity: 'base' })) // sort ใหม่ ให้จัดเรียงตาม alphabet เพราะ some method จะจัดเรียงใหม่่ให้เป็น alphabet
                    const memberData = resUser.filter(x => {
                      return thisMember.some(y => x.id === y.user_id)
                    })
                    // console.log("here: " + thisMember[0].project_role_id)

                    for (let i = 0; i < thisMember.length; i++) {                        // obj สำหรับหน้า member
                      let obj = {
                        id: thisMember[i].id,
                        first_name: memberData[i].first_name,
                        last_name: memberData[i].last_name,
                        user_image_link: memberData[i].user_image_link,
                        project_tag_rel_id: thisMember[i].project_tag_rel_id,   // ต้องเอาจาก user project rel  191, 186
                        project_role_id: thisMember[i].project_role_id,
                        user_id: memberData[i].user_id,
                      }
                      member.push(obj)

                    }
                    if (isMounted) {
                      setIsLoading(true)
                    }

                  });
              });
          }

        })

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

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projectsoftwarerel")
          .then((res) => {
            const softwareRel = res.data;
            const thisProjectSoftware = softwareRel.filter(x => x.project_id === parseInt(id))
            if (isMounted) {
              setProjectSoftwareRel(thisProjectSoftware)
            }

          });

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/usersoftware")
          .then((res) => {
            const resSoftware = res.data;
            if (isMounted) {
              setSoftware(resSoftware)
            }

          });
        if (isMounted) {
          setProjectDetail(projectDetail);
        }
      });
    return () => {
      isMounted = false;
    };

    // function GetProjectData() {

    // }

    // async function run() {

    // }

  }, [])

  const mapObj = objectTag.map(x => {
    return (
      <div>
        <p>{x.project_tag_name}: {x.project_role}: {x.project_quantity}</p>
      </div>
    )
  })

  return (
    <div>
      {isLoading === false ? <Spinner />
        :
        <div>
          <Navbar1 />
          <Link to={`/ProjectDetail/${projectDetail.id}`}></Link>
          <Container style={{ maxWidth: "1140px" }}>
            <StyleDetail>
              <img
                className=" sIm"
                src={projectDetail.project_image_link}
                style={{ width: "451px", height: "254px", objectFit: "cover" }}
                alt="img"
              />
              <div className="Detail ">
                <div className="row">
                  <p className="text-secondary" >{projectDetail.project_category_name}</p>
                  <div className="col-6">
                    <h4>
                      {projectDetail.project_name}
                    </h4>
                  </div>
                  <div className="col-6">

                    <Button className="lv-work"
                      style={projectDetail.project_seriousness_name === "งานอดิเรก" ?
                        { backgroundColor: "#1AC3CC", border: "1px solid #1AC3CC" } :
                        { backgroundColor: "#FFA62B", border: "1px solid #FFA62B" }
                      }
                    >{projectDetail.project_seriousness_name}</Button>

                  </div>
                </div>

                <span className="Text-D">
                  {projectDetail.project_detail}
                </span>
              </div>
            </StyleDetail>
          </Container>
          <Tab1 {...props} />
        </div>
      }

      {/* <CardProfile/> */}
    </div >
  )
}

export default ProjectDetail;
