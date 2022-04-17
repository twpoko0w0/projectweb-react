import React, { useState, useReducer } from 'react'
import axios from "axios";
import { Link, useParams, NavLink } from 'react-router-dom';
import { Col, Form, Row, Button } from "react-bootstrap";

const findCateName = [
  { id: 7, project_category_name: "Craft" },
  { id: 6, project_category_name: "Technology" },
  { id: 5, project_category_name: "Music" },
  { id: 4, project_category_name: "Games" },
  { id: 3, project_category_name: "Film & Video" },
  { id: 2, project_category_name: "Design" },
  { id: 1, project_category_name: "Art" },
]

function FormEditNameAndTag({ projectDetail, updateProjectDetail, setUpdateProjectDetail, isOpen, setIsOpen, defaultValue, Update, buttonShow, setButtonShow, UpdateAll, currUserRole }) {
  const { id } = useParams();
  const [currName, setCurrName] = useState("")
  const [currCategory, setCurrCategory] = useState(0)

  // เปิด/ปิด edit
  function handleReset(edit) {
    setIsOpen(edit);
    setButtonShow("");
    setUpdateProjectDetail(defaultValue)
    setCurrName(defaultValue.project_name);
    setCurrCategory(defaultValue.project_category_id)
  }

  function handleEdit(edit) {   //ใช้ set ค่า curr ให้เป็น update project ตอนกด edit
    setIsOpen(edit);
    setButtonShow(edit);
    setCurrName(updateProjectDetail.project_name);
    setCurrCategory(updateProjectDetail.project_category_id);
  }

  function handleCancel(edit) {  //ทำรวมได้  // กด no เพื่อย้อนกลับไปค่าล่าสุดที่ยังไม่ได้พิมเพิ่มเข้ามา
    setIsOpen(edit);
    setButtonShow(edit)
    LastedValue();
  }

  function LastedValue() {
    setCurrName(updateProjectDetail.project_name)
    setCurrCategory(updateProjectDetail.project_category_id)
  }

  function handleName(value) {   // ต้องทำแยก
    if (value === "") {
      setIsOpen("close");
    } else {
      setUpdateProjectDetail({ ...updateProjectDetail, project_name: value === "" ? updateProjectDetail.project_name : value })
      setIsOpen("close");
    }
  }

  function handleCategory(value) {
    setUpdateProjectDetail({ ...updateProjectDetail, project_category_id: value })
    setIsOpen("close");
  }

  if (currUserRole !== 3) {
    return (
      <>
        <div className="Box-contant" style={{ padding: "10px" }}>
          <Row>
            <Col sm="2"><label className="Text-bold">ชื่อโปรเจค:</label></Col>
            {isOpen === "name" ? (                    // เงื่อนไขการแสดงผลโดย ถ้า EditNameProject ถูกเรียกใช้ ก็จะแสดง form-box ถ้าไม่แสดงตัวเดิม
              <>
                <Col style={{ minHeight: '40px' }}>
                  <Form.Control
                    type="text"
                    name="editlablenameProject"
                    value={currName}
                    onChange={(e) => setCurrName(e.target.value)}
                  />
                </Col>
                <Col sm="auto">
                  <Button type="submit" className='ms-0' onClick={() => handleName(currName)}>
                    บันทึก
                  </Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (                                                     //ตัวเดิม              บรรทัดล่างไว้กัน แสดงค่าว่าง เพราะ currname ต้องรอโหลด api
              <>
                <Col style={{ minHeight: '40px' }}>
                  <p className="Text-data px-3">{currName === "" ? updateProjectDetail.project_name : currName}</p>
                </Col>
                <Col sm="auto">
                  <span
                    className="edit-btn"
                    onClick={() => handleEdit("name")}
                  >
                    แก้ไข
                  </span>
                </Col>
              </>
            )}
          </Row>
          <hr />
        </div>
        <div className="Box-contant" style={{ padding: "10px" }}>
          <Row>
            <Col sm="2"><label className="Text-bold">ประเภท:</label></Col>
            {isOpen === "category" ? (
              <>
                <Col style={{ minHeight: '40px' }}>
                  <Form.Select defaultValue={currCategory === 0 ? updateProjectDetail.project_category_id : currCategory} onChange={e => setCurrCategory(e.target.value)}>
                    <option value={7}>Craft</option>
                    <option value={6}>Technology</option>
                    <option value={5}>Music</option>
                    <option value={4}>Games</option>
                    <option value={3}>Film & Video</option>
                    <option value={2}>Design</option>
                    <option value={1}>Art</option>
                  </Form.Select>
                </Col>
                <Col sm="auto">
                  <Button type="submit" className='bg-primary ms-4' onClick={() => handleCategory(currCategory)}>
                    บันทึก
                  </Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col style={{ minHeight: '40px' }}>
                  <p
                    className="Text-data px-3"
                  >
                    {updateProjectDetail.project_category_id === 0 ? null : currCategory === 0 ? findCateName.find(x => x.id === parseInt(updateProjectDetail.project_category_id)).project_category_name : findCateName.find(x => x.id === parseInt(currCategory)).project_category_name}
                  </p>
                </Col>
                <Col sm="auto">
                  <span
                    className="edit-btn"
                    onClick={() => handleEdit("category")}
                  >
                    แก้ไข
                  </span>
                </Col>
              </>
            )}
          </Row>
          <hr />
          {buttonShow !== "" ? updateProjectDetail === defaultValue ? null : <div>
            <Row>
              <Col md={6}>
                <button className='text-dark' onClick={() => handleReset("close")}>Reset</button>
              </Col>
              <Col md={6}>
                <button className='bg-primary' onClick={UpdateAll}>Confirm</button>
              </Col>
            </Row>
          </div> : null
          }

        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="Box-contant" style={{ padding: "10px" }}>
          <Row>
            <Col sm="2"><label className="Text-bold">ชื่อโปรเจค:</label></Col>
            {isOpen === "name" ? (                    // เงื่อนไขการแสดงผลโดย ถ้า EditNameProject ถูกเรียกใช้ ก็จะแสดง form-box ถ้าไม่แสดงตัวเดิม
              <>
                <Col style={{ minHeight: '40px' }}>
                  <Form.Control
                    type="text"
                    name="editlablenameProject"
                    value={currName}
                    onChange={(e) => setCurrName(e.target.value)}
                  />
                </Col>
                <Col sm="auto">
                  <Button type="submit" className='ms-0' onClick={() => handleName(currName)}>
                    บันทึก
                  </Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (                                                     //ตัวเดิม              บรรทัดล่างไว้กัน แสดงค่าว่าง เพราะ currname ต้องรอโหลด api
              <>
                <Col style={{ minHeight: '40px' }}>
                  <p className="Text-data px-3">{currName === "" ? updateProjectDetail.project_name : currName}</p>
                </Col>

              </>
            )}
          </Row>
          <hr />
        </div>
        <div className="Box-contant" style={{ padding: "10px" }}>
          <Row>
            <Col sm="2"><label className="Text-bold">ประเภท:</label></Col>
            {isOpen === "category" ? (
              <>
                <Col style={{ minHeight: '40px' }}>
                  <Form.Select defaultValue={currCategory === 0 ? updateProjectDetail.project_category_id : currCategory} onChange={e => setCurrCategory(e.target.value)}>
                    <option value={7}>Craft</option>
                    <option value={6}>Technology</option>
                    <option value={5}>Music</option>
                    <option value={4}>Games</option>
                    <option value={3}>Film & Video</option>
                    <option value={2}>Design</option>
                    <option value={1}>Art</option>
                  </Form.Select>
                </Col>
                <Col sm="auto">
                  <Button type="submit" className='bg-primary ms-4' onClick={() => handleCategory(currCategory)}>
                    บันทึก
                  </Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col style={{ minHeight: '40px' }}>
                  <p
                    className="Text-data px-3"
                  >
                    {updateProjectDetail.project_category_id === 0 ? null : currCategory === 0 ? findCateName.find(x => x.id === parseInt(updateProjectDetail.project_category_id)).project_category_name : findCateName.find(x => x.id === parseInt(currCategory)).project_category_name}
                  </p>
                </Col>

              </>
            )}
          </Row>
          <hr />
          {buttonShow !== "" ? updateProjectDetail === defaultValue ? null : <div>
            <Row>
              <Col md={6}>
                <button className='text-dark' onClick={() => handleReset("close")}>Reset</button>
              </Col>
              <Col md={6}>
                <button className='bg-primary' onClick={UpdateAll}>Confirm</button>
              </Col>
            </Row>
          </div> : null
          }

        </div>
      </>
    )
  }

}

export default FormEditNameAndTag