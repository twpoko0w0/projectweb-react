import React, { useState, useEffect } from "react";
import { axios } from "axios";
import { Button, Col, Dropdown, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar1 from "../../Component/Navbar";
import Add from "../../Component/logo/add_circle_black_24dp.svg";
import More from "../../Component/logo/more_horiz_black_24dp.svg";
import styled from "styled-components";


const Stylelist = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

  .list-group {
    
    background: #fff;
    box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.176);
  }

  .list-group-item.hearder {
    padding: 30px;
    height: 95px;
    border-left: none;
    border-right: none;
    border-top: none;
  }
  h6 {
    margin: 0;
    padding-top: 4px;
    font-family: "Roboto" sans-serif;
    font-weight: bold;
    font-size: 20px;
  }
  .list-group-item.item {
    display: flex;
    justify-content: space-between;
    height: 48px;
    border-left: none;
    border-right: none;
  }
  span {
    padding: 0;
    align-self: center;
  }
  .name {
    margin: 0;
    align-self: center;
    color: #3082fe;
  }
  .Plus{
    display: flex;
    width: 124px; 
    height: 44px; 
    padding: 10px;
  }
  .icon-1{
    padding-right: 4px;
  }
  .box-content{
    display: flex;
    align-self: center;
  }
  .style-drop{
    margin-left: 20px
  }
  .dropdown-box{
    display: flex;
  }
  span {
    margin: 0px;
    padding: 0px;
    align-items: center;
  }
  .dropdown {
    width: 24px;
    height: 24px;
    background-color: var(--bg);
    border: none;
    padding: 0rem;
  }
  .dropdown-toggle::after{
    display: none;
  }
  .dropdown-menu{
    min-width: 80px;
  }
`;

function StartProStep4({ formdata, setFormdata, projectTag, tagList, newProjectId, forceUpdate }) {
  const { projectTagId, projectRole, projectPositionQuantity, } = formdata;

  // console.log("Quantity position: " + projectPositionQuantity + "\nTagID: " + projectTagId);

  const projectTagElement = projectTag.map((val, index) => {
    return (
      <option key={index} value={val.id}>{val.project_tag_name}</option>
    )
  });

  const tagElement = tagList.map((val) => {
    return (
      <ListGroup.Item className="item">
        <span>{val.projectTagName}</span>
        <p className="name">
          {val.projectPositionQuantity + " ตำแหน่ง"} <span class="material-icons"><img src={More} alt="More" /></span>
        </p>
      </ListGroup.Item>
    )
  })
  // console.log("Here: " + formdata.projectTagId)
  const AddList = (e) => {
    e.preventDefault();
    forceUpdate();
    let tagToInt = parseInt(projectTagId)
    let projectTagName = projectTag.find(x => x.id === tagToInt).project_tag_name
    let list = {
      projectTagId: projectTagId,
      projectRole: projectRole,
      projectPositionQuantity: projectPositionQuantity,
      projectTagName: projectTagName
    }
    tagList.push(list);
    // console.log("Tag Name: " + projectTagName);
  }
  console.log(projectTagId)
  return (
    <Stylelist style={{ padding: "0 14rem" }} >
      <h1 className="d-flex justify-content-center">ชั้นตอนที่ 4: ตามหาตำแหน่งที่ต้องการ</h1>
      <h5 className="d-flex justify-content-center">กำหนดตำแหน่งที่คุณต้องการ เพื่อร่วมสร้างโปรเจคกับคุณ</h5>
      <div as={Row} className="mt-5">
        <div className="shadow p-3 mb-5 bg-body rounded">
          <Row>
            <Col xs={12} md={9}>
              {" "}
              <h5><b>กรอกจำนวนตำแหน่ง</b></h5>
            </Col>
            <Col md="3">
              <Form.Select name="projectPositionQuantity" value={projectPositionQuantity} onChange={(e) => setFormdata({ ...formdata, projectPositionQuantity: e.target.value })}>
                <option value={1}>1 ตำแหน่ง</option>
                <option value={2}>2 ตำแหน่ง</option>
                <option value={3}>3 ตำแหน่ง</option>
                <option value={4}>4 ตำแหน่ง</option>
                <option value={5}>5 ตำแหน่ง</option>
              </Form.Select>
            </Col>
          </Row>
          <Form.Label>ตำแหน่ง</Form.Label>
          <Form.Select value={projectTagId} name="projectTagId" onChange={(e) => setFormdata({ ...formdata, projectTagId: e.target.value })}>
            {projectTagElement}
          </Form.Select>
          <Form.Label className="mt-4">ตำแหน่งนี้มีหน้าที่อะไร</Form.Label>
          <Form.Control label="projectRole" name="projectRole" type="text" value={projectRole} placeholder="" onChange={(e) => setFormdata({ ...formdata, projectRole: e.target.value })} as="textarea"></Form.Control>
          <Button
            className="Plus mt-4"
            type="addicon"
            variant="primary"
            onClick={AddList}
          >
            <span class="material-icons-outlined icon-1">
              add_circle
            </span>
            เพิ่มลงลิสต์
          </Button>
        </div>

      </div>
      <div className="list-box" style={{ marginTop: "40px" }}>

        <div>
          <h5><b>หน้าที่ในลิสท์</b></h5>
          <ListGroup className="mt-3">
            {tagElement}
          </ListGroup>
        </div>
      </div>
    </Stylelist>
  );
}

export default StartProStep4;
