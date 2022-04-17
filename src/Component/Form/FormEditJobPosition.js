import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, ListGroup, Row, Spinner, DropdownButton } from "react-bootstrap";
import More from "../logo/more_horiz_black_24dp.svg";
import Add from "../logo/add_circle_black_24dp copy.svg"
import styled from "styled-components";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import ModalAddjoe from "../Modal/ModalAddjoe";

const Styledrop = styled.div`
  span {
    margin: 0px;
    padding: 0px;
    align-items: center;
  }
  .bg {
    background: #fff;
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
  hr {
  margin: 1rem 0;
  color: inherit;
  background-color: currentColor;
  border: 0;
  opacity: 0.25;
}
.grid-box{
  display: flex;
  justify-content: space-between;
}
.material-icons-outlined{
  color: #3082FE ;
  padding-right: 10px;
}
// .content {
//     margin-left: auto;
//     margin-right: auto;
//     table-layout: fixed;
//     border-collapse: collapse;
//     z-index: -1;
//     position:relative;
// }

`;

const quantityId = [
  { id: 1, quantity: "1 ตำแหน่ง" },
  { id: 2, quantity: "2 ตำแหน่ง" },
  { id: 3, quantity: "3 ตำแหน่ง" },
  { id: 4, quantity: "4 ตำแหน่ง" },
  { id: 5, quantity: "5 ตำแหน่ง" }
]

function FormEditJobPosition({ objectTag, projectTag }) {
  const [open, setOpen] = useState(false);
  const [isEditingTag, setEditingTag] = useState(0);
  const [selectedTag, setSelectedTag] = useState(0);
  const [newRole, setNewRole] = useState("");
  const [newQuantity, setNewquantity] = useState(0)
  const { id } = useParams(null);
  const [modalShow, setModalShow] = useState(false);

  const projectTagElement = projectTag.map((val, index) => {
    return (
      <option key={index} value={val.id}>{val.project_tag_name}</option>
    )
  });

  const tagList = objectTag.map((x, index) => {
    const findQuantity = quantityId.find(thisQuantity => thisQuantity.quantity === x.project_quantity).id
    return (
      <>
        <div key={index} >
          <Row  >
            {(isEditingTag === x.project_tag_relation_id) ? <>
              <Col sm={2} >
                <Form.Select onChange={e => setSelectedTag(e.target.value)} value={selectedTag}>
                  {projectTagElement}
                </Form.Select>
              </Col>
              <Col sm={6} >
                <Form.Control
                  label="Detail-tag"
                  name="TagDetail"
                  type="text"
                  value={newRole}
                  placeholder="รายละเอียด"
                  onChange={e => setNewRole(e.target.value)}
                >
                </Form.Control>
              </Col>
              <Col style={{ padding: "0px" }}>
                <Form.Select value={newQuantity} onChange={e => setNewquantity(e.target.value)}>
                  <option value={1}>1 ตำแหน่ง</option>
                  <option value={2}>2 ตำแหน่ง</option>
                  <option value={3}>3 ตำแหน่ง</option>
                  <option value={4}>4 ตำแหน่ง</option>
                  <option value={5}>5 ตำแหน่ง</option>
                </Form.Select>
              </Col>
              <Col sm="auto">
                <Button onClick={() => UpdateTagRel(x.project_tag_relation_id)}>
                  บันทึก
                </Button>
                <span
                  onClick={() => setEditingTag(false)}
                  style={{ color: "#3082FE", marginLeft: "20px" }}
                >
                  ยกเลิก
                </span>
              </Col>
            </> : <>
              <Col sm={2}>
                <label className="Text-bold">{x.project_tag_name}</label>
              </Col>
              <Col>
                <div className="grid-box">
                  <label className="Text-data">{x.project_role}</label>
                  <label className="Text-data" style={{ color: "#3082FE" }}>{x.project_quantity}</label>
                </div>
              </Col>
              <Col sm="auto">
                <Dropdown className="style-drop" align="end">
                  <Dropdown.Toggle className="dropdown-box" id="dropdown" as="span">
                    <img src={More} alt="More" />
                    <Dropdown.Menu style={{ width: "80px" }} >
                      <Dropdown.Item eventKey="1" onClick={() => handleEditTag(x.project_tag_relation_id, x.project_role, findQuantity, x.project_tag_id,)}>แก้ไข</Dropdown.Item>
                      <Dropdown.Item eventKey="2" onClick={() => DeleteTagRel(x.project_tag_relation_id)} style={{ color: "red" }}>ลบ</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Toggle>
                </Dropdown>
              </Col>
            </>}
          </Row>
          <hr />
        </div>
      </>
    )
  })

  function handleEditTag(TagRelId, role, quantity, tagId) {
    setEditingTag(TagRelId)
    setSelectedTag(tagId)
    setNewRole(role)
    setNewquantity(quantity)
  }

  function UpdateTagRel(tagRelId) {
    let tagRelIdInt = parseInt(tagRelId);
    const objectTagRel = {
      project_tag_rel_id: tagRelIdInt, // parseInt(id)
      project_id: id,
      project_tag_id: parseInt(selectedTag),
      project_tag_role: newRole,
      project_position_quantity_id: newQuantity
    }
    const { project_tag_rel_id, project_tag_id, project_id, project_tag_role, project_position_quantity_id } = objectTagRel

    axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/projecttagrel/" + project_tag_rel_id, {
      project_id: project_id,
      project_tag_id: project_tag_id,
      project_tag_role: project_tag_role,
      project_position_quantity_id: project_position_quantity_id
    })
      .then((res) => {
        console.log(res.data)
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const DeleteTagRel = (project_tag_rel_id) => {
    axios.delete(process.env.REACT_APP_API_ENDPOINT + "/api/projecttagrel/" + project_tag_rel_id)
      .then((res) => {
        window.location.reload(false);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const props = { projectTag, modalShow, setModalShow, projectTagElement }

  return (
    <Styledrop>
      {tagList}
      <div className="mt-3">
        <span className="Add-Text d-flex"
          style={{ color: "#3082FE" }}
          onClick={() => setModalShow(true)}>
          <span className="material-icons-outlined">
            add_circle
          </span>
          หาตำแหน่ง
        </span>
        <ModalAddjoe {...props} />
      </div>
    </Styledrop>
  );
}

export default FormEditJobPosition;
