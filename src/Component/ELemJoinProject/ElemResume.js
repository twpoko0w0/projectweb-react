import React, { useState } from "react";
import { Container, Tab, Nav, Row, Col, Form, Button, Image } from "react-bootstrap";
import styled from "styled-components";
import trello from "../Card/icon-img/icons8-trello 1.svg";
import Email from "../logo/email_black_24dp (1).svg"
import Facebook from "../logo/Vector.svg"
import UserJoinRequest from "../UserJoinRequest/UserJoinRequest";

const StyleTabA = styled.div`
  .lable-1 {
    max-width: 356px;
    max-height: 88px;
    padding: 16px 28px;
    margin: auto 0;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #7b7b7b;
  }
  .lable-1.nav-link {
    margin: 0px;
  }

  .nav-item a {
    height: 88px;
  }
  .form-box {
    display: inline-box;
  }

  .Text-data {
    max-width: 600px;
  }
  p {
    margin: 0px;
  }
  span {
    margin: 0px;
    padding: 0px;
  }
  .edit-btn {
    color: #0d6efd;
    margin: 0px;
    padding: 0px;
    float: right;
  }
  .delete-btn {
    margin-top: 60px;
    float: right;
  }
  .img-data {
    width: 219px;
    height: 123px;
  }

  .image-box {
    display: inline;
    padding-right: 20px;
  }
  .close-icon {
    position: absolute;
    padding-left: 4rem;
    top: 265px;
  }
  .Box-grid {
    display: flex;
    justify-content: space-between;
  }
  .img {
    height: 56px;
    width: 56px;
    border-radius: 50%;
    background-color: #000;
  }
  .bordr-style col-xl-5 {
    padding: 0px 0px 0px 24px;
  }
  .imginfo {
    margin: 0 auto;
  }
  .border {
    max-height: 155px;
    border: 1px solid #000;
    padding: 16px;
  }
  .Tool-Tag {
    color: #000;
    margin-right: 20px;
    border: #e9e9e9;
  }
  .name {
    font-family: "Roboto";
    font-style: bold;
    font-size: 16px;
    colour: #282828;
  }
  .date {
    font-family: "Roboto";
    font-size: 13px;
    opacity: 70%;
    margin: 4px 0 0 0;
  }
  .nameinfo {
    font-family: "Roboto";
    font-size: 18px;
    colour: #4d4d4d;
  }
  .lable {
    font-family: "Roboto";
    font-size: 13px;
    colour: #424242;
  }
  .port {
    height: 56px;
    border: 1px solid #dcdcdc;
    border-left: 0px;
    border-right: 0px;
  }
  .bor {
    border: 1px solid #dcdcdc;
    max-width: 64%;
  }
  .owner {
    border-right: 1px solid #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
    background-color: #f9f9f9;
  }
  .join {
    background-color: #f9f9f9;
    border-bottom: 1px solid #dcdcdc;
  }
  .number {
    font-family: "Roboto";
    font-size: 24px;
    color: #3082fe;
  }
  .labelowm {
    font-family: "Roboto";
    font-size: 13px;
  }
  .labeljoin {
    font-family: "Roboto";
    font-size: 13px;
  }
  .buttonn {
    height: 40px;
    width: 90px;
  }
  .h4 {
    color: #424242;
  }
  .nav-link {
    width: 356px;
  }
  .nav {
    width: 356px;
    height: 440px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .lable {
    padding-right: 10px;
  }
`;
function TabManage({ joinReq, newUserJoinObj, userReq, id }) {
  const [isAdd, setIsAdd] = useState(true)
  const [selectUser, setSelectUser] = useState([])
  const [selectUserTagname, setSelectUserTagname] = useState([])
  const [selectUserSoftware, setSelectUserSoftware] = useState([])
  const [selectUserProject, setSelectUserProject] = useState([])  //ดูว่า user เข้าร่วมโปรเจคไปแล้วกี่โปร
  const [selectUserOwnerProject, setSelectUserOwnerProject] = useState([])

  function handleTabpane(id, tagname, software, userSoftware) {
    const currUser = newUserJoinObj.find(x => x.user_id === id)
    const currUserProject = userReq.filter(x => x.user_id === id)
    const currUserOwnerProject = userReq.filter(x => x.user_id === id && x.project_role_id === 1)

    if (userSoftware.length > 1 && isAdd === true) {
      for (let i = 0; i < userSoftware.length; i++) {
        let softwareObj = {
          software_image_link: software[i],
          user_software: userSoftware[i],
        }
        if (selectUserSoftware.length <= userSoftware.length) {
          selectUserSoftware.push(softwareObj)
        }
      }
    } else {
      setSelectUserSoftware([0])
    }

    setSelectUser(currUser)
    setSelectUserTagname(tagname)
    // setSelectUserSoftware(software)
    setSelectUserProject(currUserProject)
    setSelectUserOwnerProject(currUserOwnerProject)
    // console.log("currUserOwnerProject: " + currUserOwnerProject.length)
  }

  const joinReqElement = newUserJoinObj.sort((a, b) => b.id - a.id).map((x, index) => {
    const tagname = x.user_tag_name.split(",") // tagname
    const softwareImage = x.software_image_link.split(",")
    const userSoftware = x.user_software.split(",")
    return (
      <>
        <Nav.Link className="lable-1" eventKey={x.user_id} key={index} onClick={() => handleTabpane(x.user_id, tagname, softwareImage, userSoftware)}>
          <Row>
            <Image
              className="col-3 "
              width={50}
              height={50}
              src={x.user_image_link}
              alt="Profile"
              roundedCircle
            />
            <div className="infomation col-9 align-self-center">

              <div className="name">{x.id} {x.first_name} {x.last_name} {x.user_id}</div>
              <div className="date">{x.date_time}</div>
            </div>
          </Row>
        </Nav.Link>
      </>
    )
  })

  const Taglist = () => <button className="work">Tag</button>;
  const ProgramTag = () => (
    <button className="Tool-Tag">
      <img width="24" height="24" src={trello} alt="trello" />
      sadada
    </button>
  );

  const props = { joinReq, newUserJoinObj, selectUser, selectUserTagname, selectUserProject, selectUserOwnerProject, id, selectUserSoftware };
  // console.log("Here :" + newUserJoinObj[0].user_id)
  return (
    <Container fluid="lg" style={{ maxWidth: "1140px" }}>
      <StyleTabA>
        <Tab.Container id="left-tabs" defaultActiveKey="1">
          <Row style={{ paddingTop: "56px" }}>
            <Col xl={4} style={{ paddingRight: "0px", margin: "0px" }}>
              <Nav
                // variant="pills"
                style={{ marginRight: "0px", height: "440px" }}
                className="navScoll"
              // className="flex-column "
              >
                <Nav.Item>
                  {joinReqElement}
                </Nav.Item>
                {" "}
                {/*//fix  */}

              </Nav>
            </Col>
            <Col
              xl={8}
              style={{
                paddingLeft: "12px",
                paddingRight: "12px",
                margin: "0px",
              }}
              className="bordr-style  "
            >
              <UserJoinRequest {...props} />
            </Col>
          </Row>
        </Tab.Container>
      </StyleTabA>
    </Container>
  );
}

export default TabManage;
