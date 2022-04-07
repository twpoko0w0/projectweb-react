import React, { useEffect, useState } from "react";
import { Container, Tab, Nav, Row, Col, Form, Button, Image } from "react-bootstrap";
import styled from "styled-components";
import trello from "../Card/icon-img/icons8-trello 1.svg";
import Email from "../logo/email_black_24dp (1).svg"
import Facebook from "../logo/Vector.svg"
import axios from "axios";

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
  img{
    
    
  }
`;
function UserJoinRequest({ selectUser, selectUserTagname, selectUserProject, selectUserOwnerProject, id, selectUserSoftware }) {

  useEffect(() => {
    if (!selectUser) {
      return null
    }
  }, [])

  const tagname = selectUserTagname.map((x, index) => {
    return <button key={index} className="work ms-2">{x}</button>
  })
  console.log(selectUserSoftware[0])
  const softwareElement = selectUserSoftware.map(x => {
    if (x.user_software !== " " && x !== 0) {
      return <>
        {selectUserSoftware.length === 1 ? "ไม่มี" : <button className="Tool-Tag">
          <img width="24" height="24" src={x.software_image_link ? x.software_image_link : null} alt="trello" />
          {x.user_software ? x.user_software : null}
        </button>}
      </>
    }
  })

  function handleAccept(user_id) {
    axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/userprojectrel`, {
      user_id: user_id,
      project_id: parseInt(id),
      project_role_id: 3,
      project_tag_rel_id: 191
    })
      .then(function (response) {
        axios.delete(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectjoinreq/" + selectUser.id)
          .then((res) => {
            window.location.reload(false);
            console.log(res.data)
          })
      })
  }

  function handleReject() {
    axios.delete(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectjoinreq/" + selectUser.id)
      .then((res) => {
        window.location.reload(false);
        console.log(res.data)
      })
  }

  // console.log("Select :" + selectUser.user_id)
  // console.log("Length :" + selectUserOwnerProject.length)

  return (
    <Tab.Content>
      <Tab.Pane eventKey={selectUser.user_id}>
        <Row>
          <Col xl={8} className="bor ms-1">
            <div className="d-flex justify-content-center">
              <Image
                className=" mt-3 "
                width={50}
                height={50}
                style={{ objectFit: "cover" }}
                src={selectUser.user_image_link}
                alt="Profile"
                roundedCircle
              />
            </div>
            <div className="nameinfo text-center fw-bold mt-2">
              {selectUser.first_name} {selectUser.last_name}
            </div>
            <div className="tag d-flex mt-4">
              <div className="lable">สายงาน:</div>
              {tagname}
            </div>
            <Row className="port mt-4">
              <div className="col-6 owner text-center">
                <div className="number fw-bold">{selectUserOwnerProject.length}</div>
                <div className="labelowm">เจ้าของ</div>
              </div>
              <div className="col-6 join text-center">
                <div className="number fw-bold">{selectUserProject.length}</div>
                <div className="labeljoin">เช้าร่วม </div>
              </div>
            </Row>
            <div className="program d-flex mt-4 ">
              <div className="lable">โปรแกรมที่ใช้:</div>
              {softwareElement}
            </div>

            <div className="button mt-4 mb-5 float-end">
              <Row>
                <Button className="buttonn" variant="outline-danger" onClick={() => handleReject()}>
                  ไม่รับ
                </Button>{" "}
                <Button className="buttonn" variant="primary" onClick={() => handleAccept(selectUser.user_id)}>
                  รับ
                </Button>{" "}
              </Row>
            </div>
          </Col>
          <Col xl={4} className="border ms-3">
            <div className="h4 text-center">ช่องทางการติดต่อ</div>
            <div className="contact mt-4">
              <div className="e-mail "><img className="email-icon" src={Email} />{selectUser.email}</div>
            </div>
          </Col>
        </Row>
      </Tab.Pane>
    </Tab.Content>
  );
}

export default UserJoinRequest;
