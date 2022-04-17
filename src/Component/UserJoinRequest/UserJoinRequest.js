import React, { useEffect, useState } from "react";
import { Container, Tab, Nav, Row, Col, Form, Button, Image } from "react-bootstrap";
import styled from "styled-components";
import trello from "../Card/icon-img/icons8-trello 1.svg";
import Email from "../logo/email_black_24dp (1).svg"
import Facebook from "../logo/Vector.svg"
import axios from "axios";
import { NavLink } from 'react-router-dom';
import Line from "../logo/Line.svg"
import Popup from "../Popup/Popup";



function UserJoinRequest({ selectUser, selectUserTagname, selectUserProject, selectUserOwnerProject, id, selectUserSoftware, selectUserTagReq }) {
  const [isPopShow, setIsPopShow] = useState(false)
  useEffect(() => {
    if (!selectUser) {
      return null
    }
  }, [])

  const tagname = selectUserTagname.map((x, index) => {
    return <button key={index} className="work-btn ">{x}</button>
  })

  const softwareElement = selectUserSoftware.map(x => {
    if (x.user_software !== " " && x !== 0) {
      return <>
        {selectUserSoftware.length === 1 ? "ไม่มี" : <button className="Tool-Tag">
          <img width="24" height="24" src={x.software_image_link ? x.software_image_link : null} alt="trello" />
          {/* {x.user_software ? x.user_software : null} */}
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

  function handleCopy(val) {
    setIsPopShow(true)
    navigator.clipboard.writeText(val)
    setTimeout(function () {
      setIsPopShow(false)
    }, 1000);
  }

  return (
    <Tab.Content>
      {isPopShow ? <Popup /> : null}

      <Tab.Pane eventKey={selectUser.user_id}>
        <Row>
          <Col style={{ padding: "12px" }}>
            <div className="box-elem" >
              <div className="d-flex justify-content-center">
                <div className="text-box">
                  <div className="d-flex justify-content-center">
                    <NavLink to={`/Profile/${selectUser.user_id}`} style={{ color: "black", textDecoration: 'none' }}>
                      <Image
                        className=" mt-3 "
                        width={50}
                        height={50}
                        style={{ objectFit: "cover" }}
                        src={selectUser.user_image_link}
                        alt="Profile"
                        roundedCircle
                      />
                    </NavLink>
                  </div>
                  <p>{selectUser.first_name} {selectUser.last_name}</p>
                  <h5>{selectUserTagReq}</h5>
                </div>
              </div>
              <div >
                <div className="Box-Contant-All" >
                  <div style={{ width: "182px", padding: "2px" }} >
                    <span onClick={() => handleCopy(selectUser.reqEmail)}>
                      <div className="" >
                        <div className="Bg1 e-mail ">
                          <span class="material-icons" >
                            email
                          </span> <br />
                          {selectUser.reqEmail}
                        </div>
                      </div>
                    </span>
                  </div>
                  <div style={{ width: "182px", padding: "2px" }}  >
                    <span onClick={() => handleCopy(selectUser.facebook)}>
                      <div className="">
                        <div className="Bg1 e-mail ">
                          <span>
                            <Image src={Facebook} />
                          </span>
                          <br />
                          {selectUser.facebook}
                        </div>
                      </div>
                    </span>

                  </div>
                  <div style={{ width: "182px", padding: "2px" }}  >
                    <span onClick={() => handleCopy(selectUser.line)}>
                      <div  >
                        <div className="Bg1 e-mail " >
                          <Image width={24} height={24} src={Line} />
                          <br />
                          {selectUser.line}
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
                <div className="text-content">
                  <h1>“</h1>
                  {selectUser.interview}
                  <h1 style={{ textAlign: "end" }}>”</h1>
                </div>
              </div>

            </div>
          </Col>
          <Col sm="auto" >
            <div className="box-card">
              <div style={{ padding: "24px 12px 0px" }}>
                <div className="d-flex justify-content-center">
                  <NavLink to={`/Profile/${selectUser.user_id}`} style={{ color: "black", textDecoration: 'none' }}>
                    <Image
                      className=" mt-3 "
                      width={50}
                      height={50}
                      style={{ objectFit: "cover" }}
                      src={selectUser.user_image_link}
                      alt="Profile"
                      roundedCircle
                    />
                  </NavLink>
                </div>
                <div className="nameinfo text-center fw-bold mt-2">
                  {selectUser.first_name} {selectUser.last_name}
                </div>
                <div className="mt-4" >
                  <div className="lable">สายงาน:</div>
                  <div className="mt-2">
                    {tagname}
                  </div>
                </div>
              </div>
              <div className="d-flex port mt-4">
                <div className="col-6 owner text-center">
                  <div className="number fw-bold">{selectUserOwnerProject.length}</div>
                  <div className="labelowm">เจ้าของ</div>
                </div>
                <div className="col-6 join text-center">
                  <div className="number fw-bold">{selectUserProject.length}</div>
                  <div className="labeljoin">เช้าร่วม </div>
                </div>
              </div>
              <div style={{ padding: "24px 12px 0px" }}>
                <div className="program  ">
                  <div className="lable">โปรแกรมที่ใช้:</div>
                  <div className="box-tag d-flex  mt-2 mb-2">
                    {softwareElement}
                  </div>
                </div>
                <div className="box-button mt-5 mb-5 ">
                  <Button className="buttonn non " variant="outline-danger" onClick={() => handleReject()}>
                    <span class="material-icons ">
                      cancel
                    </span>
                    ไม่รับ
                  </Button>{" "}
                  <Button className="buttonn" variant="primary" onClick={() => handleAccept(selectUser.user_id)}>
                    <span class="material-icons">
                      check_circle
                    </span>
                    รับ
                  </Button>{" "}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Tab.Pane>
    </Tab.Content>
  );
}

export default UserJoinRequest;
