import React, { useState } from "react";
import {
  Container,
  Tab,
  Nav,
  Row,
  Col,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import styled from "styled-components";
import trello from "../Card/icon-img/icons8-trello 1.svg";
import Email from "../logo/email_black_24dp (1).svg";
import Facebook from "../logo/Vector.svg";
import UserJoinRequest from "../UserJoinRequest/UserJoinRequest";

const StyleTabA = styled.div`
  .lable-1 {
    max-width: 260px;
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
    display: flex;
    align-items: center;
    height: 40px;
    width: 90px;
  }
  .buttonn span {
    margin-right: 6px;
  }
  .h4 {
    color: #424242;
  }
  .nav-link {
    width: 356px;
  }
  .nav {
    height: 542px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .lable {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    padding-right: 10px;
  }
  .box-card {
    width: 260px;
    border: 1px solid #dcdcdc;
  }
  button {
    margin: 0px;
    font-family: "Roboto", sans-serif;
    cursor: pointer;
    font-size: 14px;

    border-radius: 4px;
  }
  .work-btn {
    background-color: #3082fe;
    border: 1px solid #3082fe;
    color: #fff;
    height: 16px;
    line-height: 14px;
    border-radius: 6px;
    margin-right: 4px;
    padding: 0px 2px;
    font-size: 14px;
  }

  .Tool-Tag {
    display: flex;
    justify-content: center;
    text-align: center;
    width: 40px;
    height: 40px;
    margin-right: 8px;
    padding: 4px;
    background-color: #e9e9e9;
    border: #e9e9e9;
    border-radius: 50%;
  }
  .Tool-Tag img {
    align-self: center;
  }
  .box-button {
    display: flex;
    justify-content: space-between;
  }
  .Bg1 {
    background: rgba(48, 130, 254, 0.3);
    text-align: center;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    height: 72px;
    padding: 8px 14px;
  }
  .Gridimg {
    align-self: center;
  }
  .Gridtext {
    width: 260px;
    overflow: hidden;
  }
  .text-box {
    text-align: center;
  }
  .e-mail img {
    margin-bottom: 6px;
  }
  h1 {
    margin: 0px;
  }
  .Box-Contant-All{
    display:flex;
    justify-content: space-between;
  }
`;
function TabManage({ joinReq, newUserJoinObj, userReq, id, tagRel, projectTag }) {
  const [isAdd, setIsAdd] = useState(true);
  const [selectUser, setSelectUser] = useState([]);
  const [selectUserTagname, setSelectUserTagname] = useState([]);
  const [selectUserSoftware, setSelectUserSoftware] = useState([]);
  const [selectUserProject, setSelectUserProject] = useState([]); //ดูว่า user เข้าร่วมโปรเจคไปแล้วกี่โปร
  const [selectUserOwnerProject, setSelectUserOwnerProject] = useState([]);
  const [selectUserTagReq, setSelectUserTagReq] = useState("")

  function handleTabpane(id, tagname, software, userSoftware) {
    const currUser = newUserJoinObj.find((x) => x.user_id === id);
    const currUserProject = userReq.filter((x) => x.user_id === id && x.project_role_id !== 1);

    const tagId = tagRel.find(j => j.id === currUser.project_tag_rel_id).project_tag_id
    const tagName = projectTag.find(j => j.id === parseInt(tagId)).project_tag_name

    const currUserOwnerProject = userReq.filter(
      (x) => x.user_id === id && x.project_role_id === 1
    );

    if (userSoftware.length > 1 && isAdd === true) {
      for (let i = 0; i < userSoftware.length; i++) {
        let softwareObj = {
          software_image_link: software[i],
          user_software: userSoftware[i],
        };
        if (selectUserSoftware.length <= userSoftware.length) {
          selectUserSoftware.push(softwareObj);
        }
      }
    } else {
      setSelectUserSoftware([0]);
    }

    setSelectUser(currUser);
    setSelectUserTagname(tagname);
    // setSelectUserSoftware(software)
    setSelectUserTagReq(tagName)
    setSelectUserProject(currUserProject);
    setSelectUserOwnerProject(currUserOwnerProject);
    // console.log("currUserOwnerProject: " + currUserOwnerProject.length)
  }

  const joinReqElement = newUserJoinObj
    .sort((a, b) => b.id - a.id)
    .map((x, index) => {
      const tagname = x.user_tag_name.split(","); // tagname
      const softwareImage = x.software_image_link.split(",");
      const userSoftware = x.user_software.split(",");
      return (
        <>
          <Nav.Link
            className="lable-1"
            eventKey={x.user_id}
            key={index}
            onClick={() =>
              handleTabpane(x.user_id, tagname, softwareImage, userSoftware)
            }
          >
            <Row>
              <Col sm="auto" className="Gridimg" >
                <Image
                  width={50}
                  height={50}
                  style={{ objectFit: "cover" }}
                  src={x.user_image_link}
                  alt="Profile"
                  roundedCircle
                />
              </Col>
              <Col className="Gridtext">
                <div className="infomation  align-self-center">
                  <div className="name">
                    {x.first_name} {x.last_name}
                  </div>
                  <div className="date">{x.date_time}</div>
                </div>
              </Col>
            </Row>
          </Nav.Link>
        </>
      );
    });

  const Taglist = () => <button className="work">Tag</button>;
  const ProgramTag = () => (
    <button className="Tool-Tag">
      <img width="24" height="24" src={trello} alt="trello" />
      sadada
    </button>
  );

  const props = {
    joinReq,
    newUserJoinObj,
    selectUser,
    selectUserTagname,
    selectUserProject,
    selectUserOwnerProject,
    id,
    selectUserSoftware,
    tagRel, projectTag, selectUserTagReq
  };
  // console.log("Here :" + newUserJoinObj[0].user_id)
  return (
    <Container fluid="lg" style={{ maxWidth: "1140px" }}>
      <StyleTabA>
        <Tab.Container id="left-tabs" defaultActiveKey="1">
          <Row style={{ paddingTop: "56px" }}>
            <Col sm="3" >
              <Nav
                // variant="pills"
                style={{ marginLeft: "0px" }}
                className="navScoll"
              // className="flex-column "
              >
                <Nav.Item style={{ width: "260px" }}>{joinReqElement}</Nav.Item> {/*//fix  */}
              </Nav>
            </Col>
            <Col style={{ height: "100%" }}>
              <UserJoinRequest {...props} />
            </Col>

          </Row>
        </Tab.Container>
      </StyleTabA>
    </Container>
  );
}

export default TabManage;
