import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
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
`;
const Button = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap");

  button {
    margin: 0px;
    font-family: "Roboto", sans-serif;
    cursor: pointer;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    position: relative;
  }
  .Lv_c {
    background-color: #1ac3cc;
    border: 1px solid #1ac3cc;
  }
`;
const ColorButton = styled.div`
  .lvworkf {
    background-color: #ffa62b;
    border: 1px solid #ffa62b;
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
  const props = { objectTag, currentUser, ownerProfile, projectDetail, id, isUserJoin, member, tagRel, projectTag, isUserMember, user }

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/project")
      .then((res) => {
        const resProject = res.data;
        const projectDetail = resProject.find(x => x.id === parseInt(id))
        const tagName = projectDetail.project_tag_name.split(",")
        const tagRole = projectDetail.project_tag_role.split(",")
        const tagQuantity = projectDetail.quantity.split(",")

        for (let i = 0; i < tagName.length; i++) {
          const object = {
            key: i,
            project_tag_name: tagName[i],
            project_role: tagRole[i],
            project_quantity: tagQuantity[i]
          }
          objectTag.push(object);
          // console.log(tagName[i])
        }
        // console.log(projectDetail.duration)

        firebase.auth().onAuthStateChanged(user => {
          setUser(user)
          if (user) {
            axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectjoinreq")
              .then((res) => {
                const resJoin = res.data
                const checkUserJoinReq = resJoin.filter(x => x.project_id === parseInt(id))
                const findUserJoin = checkUserJoinReq.map(x => x.user_id).indexOf(user.uid);
                setIsUserJoin(findUserJoin)
              })

            axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectrel")
              .then((res) => {
                const resProjectRel = res.data;
                const thisUserRel = resProjectRel.filter(x => x.project_id === parseInt(id) && x.project_role_id === 1)

                const checkUserMember = resProjectRel.filter(x => x.project_id === parseInt(id))
                const findUserMember = checkUserMember.map(x => x.user_id).indexOf(user.uid);
                setIsUserMember(findUserMember)
                // console.log("This user owner: " + thisUserRel[0].user_id)

                axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/users")
                  .then((res) => {
                    const resUser = res.data;
                    const thisUser = resUser.find(x => x.id === thisUserRel[0].user_id)
                    setOwnerProfile(thisUser);


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
                        project_role_id: thisMember[i].project_role_id
                      }
                      member.push(obj)
                    }
                    setIsLoading(true)
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
                    setOwnerProfile(thisUser);


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
                        project_role_id: thisMember[i].project_role_id
                      }
                      member.push(obj)
                    }
                    setIsLoading(true)
                  });
              });
          }

        })

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projecttagrel")
          .then((res) => {
            const resTagRel = res.data;
            const projectTagRel = resTagRel.filter(x => x.project_id === parseInt(id))
            setTagRel(projectTagRel)
            // console.log(projectTagRel)
          });

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projecttag")
          .then((res) => {
            const projectTag = res.data;
            setProjectTag(projectTag);
          });

        setProjectDetail(projectDetail);
      });

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
                className="img-fluid sIm"
                src={projectDetail.project_image_link}
                style={{ width: "451px", height: "254px" }}
                alt="img"
              />
              <div className="Detail ">
                <a className="text-secondary " >{projectDetail.project_category_name}</a>
                {/* <a>sada</a> */}
                <div className="row">
                  <div className="col-6">
                    <h4>
                      {projectDetail.project_name}
                    </h4>
                  </div>
                  <div className="col-6">
                    <ColorButton>
                      <Button className="Lv_c">{projectDetail.project_seriousness_name}</Button>
                      <NavLink to={`/ProjectManager/${id}`}><button className="bg-primary ms-2">Edit Project(for dev)</button></NavLink>
                    </ColorButton>{" "}
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
    </div>
  )
}

export default ProjectDetail;
