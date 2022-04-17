import React, { useState, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";
import DataWork from "../../data/Working";
import axios from "axios";
import styledComponents from "styled-components";

const SytleBox = styledComponents.div`

h5 {
  text-align: center;
}
.box{
  padding: 0 14rem;
}
`;

export function StartProStep1({ formdata, setFormdata, message }) {

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

  return (
    <SytleBox >
      <Form className="justify-content-md-center ">
        <h1 className="d-flex justify-content-center">
          ชั้นตอนที่ 1: สร้างชื่อ และประเภทโปรเจค
        </h1>
        <p className="d-flex justify-content-center text-secondary">
          <h5 >
            ในการเลือกประเภท คุณสมารถเลือกได้ถึง 3 ประเภท
            <br />
            และแก้ไขได้ตลอดเวลา
          </h5>
        </p>
        <div className="box">
          <Form.Label className="mt-3">ชื่อโปรเจค</Form.Label>
          <Form.Control
            label="project Name"
            name="projectName"
            type="text"
            value={projectName}
            placeholder=""
            onChange={(e) => setFormdata({ ...formdata, projectName: e.target.value })}
          ></Form.Control>
          {/* <input value={projectName} onChange={e => setFormdata({ ...formdata, projectName: e.target.value })} /> */}
          <Form.Label className="mt-3">เลือกประเภทสายงานโปรเจค</Form.Label>
          <Form.Select
            name="projectCategoryId"
            value={projectCategoryId}
            onChange={(e) => setFormdata({ ...formdata, projectCategoryId: e.target.value })}
            defaultValue={6}
          >
            {projectCategoryElement}
          </Form.Select>
        </div>
      </Form>
    </SytleBox>
  );
}


