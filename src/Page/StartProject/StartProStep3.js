import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../Component/Card/Logo";
import Navbar1 from "../../Component/Navbar";
import github from '../../Component/Card/icon-img/icons8-github.svg'
import gitlab from '../../Component/Card/icon-img/icons8-gitlab.svg'
import bitbucket from '../../Component/Card/icon-img/icons8-bitbucket.svg'
import jira from '../../Component/Card/icon-img/icons8-jira.svg'
import trello from '../../Component/Card/icon-img/icons8-trello 1.svg'
import styled from 'styled-components';
import { storage } from './../../firebase'
import { useDropzone } from "react-dropzone";

function StartProStep3({ formdata, setFormdata, forceUpdate, setImage, url }) {
  const { projectStatusId, projectDetail, projectBriefDetail, projectContact, projectDurationId } = formdata;
  const [text, setText] = useState("");

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var image = document.getElementById('output');
      image.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  return (
    <>
      <h1 className="d-flex justify-content-center">ชั้นตอนที่ 3: กรอกข้อมูลโปรเจค</h1>
      <h5 className="d-flex justify-content-center text-secondary">อธิบายรายละเอียดโปรเจคของคุณ</h5>
      <Form style={{ background: "#fff", padding: "20px" }}>
        <h6 className="mt-5"><b>ข้อมูลโปรเจค</b></h6>
        <div className="box-choose">
          <input type="file" onChange={handleChange} />
          <p className="d-flex justify-content-center"><img class="rounded" id="output" width="354" alt="upload" height="200" src={url || "http://via.placeholder.com/354x200"} /></p>
        </div>
        <Form.Label className="mt-5">รายละเอียดโดยย่อ (จะแสดงแบบสาธารณะ)</Form.Label>
        <Form.Control label="projectBriefDetail" name="projectBriefDetail" type="text" value={projectBriefDetail} placeholder="กรอกข้อมูล" onChange={(e) => setFormdata({ ...formdata, projectBriefDetail: e.target.value })} as="textarea"></Form.Control>
        <p>{text.length}/350</p>
        <Form.Label className="mt-4">รายละเอียดทั้งหมด (เฉพาะคนในทีม)</Form.Label>
        <Form.Control label="projectDetail" name="projectDetail" type="text" value={projectDetail} placeholder="กรอกข้อมูล" onChange={(e) => setFormdata({ ...formdata, projectDetail: e.target.value })} as="textarea" style={{ height: "144px" }}></Form.Control>
        <div className="Box-drop">
          <Row>
            <Col>
              <Form.Label className="mt-3">สถานะของโปรเจค</Form.Label>
              <Form.Select name="projectStatusId" value={projectStatusId} onChange={(e) => setFormdata({ ...formdata, projectStatusId: e.target.value })}>
                <option value="1">กำลังวางแผน</option>
                <option value="2">กำลังพัฒนา</option>
              </Form.Select>
              <p className="staute-label">
                {projectStatusId === 1 ? "วางแผน : สถานะที่ยังไม่เริ่มรอสมาชิกเข้าร่วมเพื่อเริ่มงาน" : "กำลังพัฒนา : เริ่มพัฒนาแล้ว"}
              </p>
            </Col>
            <Col>
              <Form.Label className="mt-3">สถานะของโปรเจค</Form.Label>
              <Form.Select name="projectDurationId" value={projectDurationId} onChange={(e) => setFormdata({ ...formdata, projectDurationId: e.target.value })}>
                <option value="1">15 วัน</option>
                <option value="2">30 วัน</option>
                <option value="3">60 วัน</option>
              </Form.Select>
            </Col>
          </Row>
        </div>
      </Form>

      <Form style={{ marginTop: "40px", background: "#fff", padding: "20px" }}>
        <h6><b>ข้อมูลติดต่อ(ไม่บังคับ)</b></h6>
        <Form.Group as={Row} className="mt-3">
          <Col>
            <Form.Label>Facebook (username)</Form.Label>
            <Form.Control label="projectContact" name="projectContact.facebook" type="text" value={projectContact} placeholder="" onChange={(e) => setFormdata({ ...formdata, projectContact: e.target.value })} ></Form.Control>
          </Col>
          {/* <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control label="projectContact" name="projectContact.email" type="text" value={projectContact.email} placeholder="" onChange={setFormdata} ></Form.Control>
          </Col> */}
        </Form.Group>
        <div className="Tag-box mt-4">
          <label>โปรแกรมที่ใช้ทำงาน</label>
          <div className="Tag-group mt-3">
            <img width="24" height="24" src={gitlab} alt="gitlab" />
            <img width="24" height="24" src={github} alt="github" />
            <img width="24" height="24" src={jira} alt="jira" />
            <img width="24" height="24" src={bitbucket} alt="bitbucket" />
            <img width="24" height="24" src={trello} alt="trello" />
          </div>
        </div>
      </Form>
    </>
  );
}

export default StartProStep3;
