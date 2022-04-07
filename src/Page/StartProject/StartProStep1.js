import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import DataWork from "../../data/Working";
import axios from "axios";


export function StartProStep1({ formdata, setFormdata }) {

  const { projectName, projectCategoryId } = formdata;
  const [projectCategory, setProjectCategory] = useState([]);
  // console.log(projectName);
  // console.log(projectCategoryId);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projectcategory") // Get Tag
      .then((res) => {
        const projectCategory = res.data;
        setProjectCategory(projectCategory)
        // console.log(projectCategory)
      });
  }, [])

  const projectCategoryElement = projectCategory.map((val, index) => {
    return (
      <option key={index} value={val.id}>{val.project_category_name}</option>   // Change to column table name
    )
  });

  return (<Form className="justify-content-md-center ">
    <h1 className="d-flex justify-content-center">ชั้นตอนที่ 1: สร้างชื่อ และประเภทโปรเจค</h1>
    <p className="d-flex justify-content-center text-secondary">
      <h3>ในการเลือกประเภท คุณสมารถเลือกได้ถึง 3 ประเภท <p className="d-flex justify-content-center text-secondary">และแก้ไขได้ตลอดเวลา</p></h3>
    </p>
    <Form.Label className="mt-3">ชื่อโปรเจค</Form.Label>
    <Form.Control label="project Name" name="projectName" type="text" value={projectName} placeholder="" onChange={setFormdata}></Form.Control>
    {/* <input value={projectName} onChange={e => setFormdata({ ...formdata, projectName: e.target.value })} /> */}
    <Form.Label className="mt-3">เลือกประเภทสายงานโปรเจค</Form.Label>
    <Form.Select name="projectCategoryId" value={projectCategoryId} onChange={setFormdata} defaultValue={6}>
      {projectCategoryElement}
    </Form.Select>
  </Form>)
}


