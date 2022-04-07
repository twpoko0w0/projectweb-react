import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import Add from "../logo/add_circle_black_24dp.svg";
import styled from 'styled-components'
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const SelectStyle = styled.div`
.form-select{
    color: #3082FE;
    border: 1px solid #3082FE;
    
}
`
const AddbtnStyle = styled.div`
.add-btn{
    margin-top: 10px;
    float: right;
}
`

function ModalAddjoe({ modalShow, setModalShow, projectTagElement }) {
  const [selectTag, setSelectTag] = useState(47);
  const [quantity, setQuantity] = useState(1);
  const [tagRole, setTagRole] = useState("");
  const [message, setMessage] = useState("")
  const { id } = useParams()

  function AddTag() {
    if (tagRole === "") {
      setMessage("กรุณากรอกหน้าที่ที่ต้องทำ")
    }

    else {
      setMessage("")
      axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/projecttagrel/", {
        project_id: id,
        project_tag_id: selectTag,
        project_tag_role: tagRole,
        project_position_quantity_id: quantity
      })
        .then((res) => {
          console.log(res.data)
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setModalShow(false)}
    >
      <Modal.Header closeButton>
        <h4>เพิ่มตำแหน่ง</h4>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm={9}>
            <Form.Label>ตำแหน่ง</Form.Label>
            <Form.Select onChange={(e) => setSelectTag(e.target.value)} value={selectTag}>
              {projectTagElement}
            </Form.Select>
          </Col>
          <Col sm={3} style={{ paddingTop: "30px" }}>
            <SelectStyle>
              <Form.Select className='Add-more' onChange={(e) => setQuantity(e.target.value)} value={quantity} >
                <option value={1}>1 ตำแหน่ง</option>
                <option value={2}>2 ตำแหน่ง</option>
                <option value={3}>3 ตำแหน่ง</option>
                <option value={4}>4 ตำแหน่ง</option>
                <option value={5}>5 ตำแหน่ง</option>
              </Form.Select>
            </SelectStyle>
          </Col>
          <Col>
            <Form.Label style={{ paddingTop: "10px" }}>ตำแหน่งนี้มีหน้าที่อะไร</Form.Label>
            {message && <Alert variant="danger" className="mt-2">{message}</Alert>}
            <Form.Control label="projectRole" name="projectRole" type="text" as="textarea" onChange={(e) => setTagRole(e.target.value)} required></Form.Control></Col>
        </Row>
        <AddbtnStyle>
          <Button className='add-btn'><img style={{ paddingRight: "10px" }} src={Add} alt="Add" onClick={() => AddTag()} />เพิ่ม</Button>
        </AddbtnStyle>
      </Modal.Body>
    </Modal>
  )
}

export default ModalAddjoe