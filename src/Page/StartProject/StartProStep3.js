import React, { useState } from "react";
import { Col, Form, Row, Alert } from "react-bootstrap";
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

const StyleForm = styled.div`
.content-box{
  text-align :center;
}
.custom-btn{
  width: 100%;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
  border-radius: 0px 0px 20px 20px ;
}
.dd-box{
  width: 400px;
  padding: 20px;
  border: 2px dashed #c2cdda ;
  // border-bottom: none;
  border-radius: 20px 20px 20px 20px ;
  text-align :center;
}
.imgput {
  width: 100%;
  height: 100% ;
  object-fit: cover;
}
.label-1{
  font-family: 'Roboto';
font-style: normal;
font-weight: 400;
}
.staute-label{
  margin: 0px ;
  font-family: 'Roboto';
font-style: normal;
font-weight: 400;
  padding-top: 16px;
  color: #3082FE;
  font-size: 14px;
}

`;

function StartProStep3({ formdata, setFormdata, forceUpdate, setImage, url, software, selectSoftware, currentUser, message, image, test, setTest }) {
  const { projectStatusId, projectDetail, projectBriefDetail, projectContact, projectDurationId } = formdata;
  const [text, setText] = useState("");

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var image = document.getElementById('output');
      image.src = URL.createObjectURL(e.target.files[0]);
      setTest(image.src)
    }
  };

  function handleSoftwareAdd(softwareId) {
    // console.log(softwareRelNew)
    const index = selectSoftware.map(x => x.user_software_id).indexOf(softwareId)
    if (index === -1) {
      const objAdd = {
        project_software_id: softwareId
      }
      selectSoftware.push(objAdd)
      forceUpdate();
    }
    console.log(selectSoftware)
  }

  function handleSoftwareRemove(softwareId) {
    const index = selectSoftware.map(x => x.project_software_id).indexOf(softwareId)  //หาที่อยู่ obj
    const remove = index !== 0 ? selectSoftware.splice(index, 1) : selectSoftware.shift()
    forceUpdate();
  }

  const softwareElement = software.map((x) => {
    if (x.software_image_link !== " ") {
      return (
        <span>
          {selectSoftware.map(y => y.project_software_id).indexOf(x.id) === -1 ? // ไม่มี:มี
            <>
              <button className="Tool-tag mt-2 text-body" onClick={() => handleSoftwareAdd(x.id)}>
                <img width="24" height="24" src={x.software_image_link} alt="gitlab" className="ms-2" />
                {x.user_software}
              </button>
            </>
            :
            <>
              <button className="Tool-tag mt-2 bg-primary text-light" onClick={() => handleSoftwareRemove(x.id)}>
                <img width="24" height="24" src={x.software_image_link} alt="gitlab" className="ms-2" />
                {x.user_software}
              </button>
            </>
          }

        </span>
      );
    }
  });

  return (
    <StyleForm>
      <div style={{ padding: "0 14rem" }}>
        <h1 className="d-flex justify-content-center">ชั้นตอนที่ 3: กรอกข้อมูลโปรเจค</h1>
        <h5 className="d-flex justify-content-center text-secondary">อธิบายรายละเอียดโปรเจคของคุณ</h5>
        <Form style={{ background: "#fff", padding: "32px" }}>
          <h6 className="mt-5"><b>ข้อมูลโปรเจค</b></h6>
          <div className="d-flex justify-content-center  box-choose">
            <div className="content-box">
              <div className=" dd-box">
                <img className="rounded imgput" id="output" width="354" alt="upload" height="200" src={test || "http://via.placeholder.com/354x200"} />
              </div>
              <input className="default-btn" id="img" type="file" onChange={handleChange} style={{ display: "none" }} />
              <label for="img" style={{ padding: "10px" }} className="bg-primary text-light mt-3">{image ? image.name : "Click me to upload image"}</label>
              {/* <Button className="custom-btn" id="custom-btn"
             onClick={CustomClickbtn}
             >Choose File
             </Button> */}
            </div>
          </div>
          <Form.Label className="mt-5 label-1">รายละเอียดโดยย่อ (จะแสดงแบบสาธารณะ)</Form.Label>
          <Form.Control label="projectBriefDetail" name="projectBriefDetail" type="text" value={projectBriefDetail} placeholder="กรอกข้อมูล" onChange={(e) => setFormdata({ ...formdata, projectBriefDetail: e.target.value })} as="textarea"></Form.Control>
          <p>{formdata.projectBriefDetail.length}/350</p>
          <Form.Label className="mt-4">รายละเอียดทั้งหมด (เฉพาะคนในทีม)</Form.Label>
          <Form.Control label="projectDetail" name="projectDetail" type="text" value={projectDetail} placeholder="กรอกข้อมูล" onChange={(e) => setFormdata({ ...formdata, projectDetail: e.target.value })} as="textarea" style={{ height: "144px" }}></Form.Control>
          <div className="Box-drop">
            <Row>
              <Col >
                <Form.Label className="mt-3 label-1">สถานะของโปรเจค</Form.Label>
                <Form.Select style={{ width: "160px" }} name="projectStatusId" value={projectStatusId} onChange={(e) => setFormdata({ ...formdata, projectStatusId: e.target.value })}>
                  <option value="1">กำลังวางแผน</option>
                  <option value="2">กำลังพัฒนา</option>
                </Form.Select>
                <p className="staute-label">
                  {projectStatusId === 1 ? "วางแผน : สถานะที่ยังไม่เริ่มรอสมาชิกเข้าร่วมเพื่อเริ่มงาน" : "กำลังพัฒนา : เริ่มพัฒนาแล้ว"}
                </p>
              </Col>
              <Col sm={5}>
                <Form.Label className="mt-3 label-1">ระยะเวลาการทำโปรเจคโดยประมาณ</Form.Label>
                <Form.Select style={{ width: "120px" }} name="projectDurationId" value={projectDurationId} onChange={(e) => setFormdata({ ...formdata, projectDurationId: e.target.value })}>
                  <option value="1">15 วัน</option>
                  <option value="2">30 วัน</option>
                  <option value="3">60 วัน</option>
                </Form.Select>
              </Col>
            </Row>
          </div>
        </Form>

        <div style={{ marginTop: "40px", background: "#fff", padding: "32px" }}>
          <h6><b>ข้อมูลติดต่อ(ไม่บังคับ)</b></h6>
          <Form.Group as={Row} className="mt-3">
            <Col>
              <Form.Label>Facebook (username)</Form.Label>
              <Form.Control label="projectContact" name="projectContact.facebook" type="text" value={projectContact.facebook} placeholder="" onChange={(e) => setFormdata({ ...formdata, projectContact: e.target.value })} ></Form.Control>
            </Col>

          </Form.Group>
          <div className="Tag-box mt-4">
            <label className="label-1">โปรแกรมที่ใช้ทำงาน</label>
            <div className="Tag-group mt-3">
              {softwareElement}
            </div>
          </div>
        </div>
      </div>

    </StyleForm>
  );
}

export default StartProStep3;
