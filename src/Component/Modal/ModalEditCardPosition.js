import React from 'react'
import { Modal, Button, Form, Row, Col, Alert,ListGroup,FloatingLabel } from "react-bootstrap";
import styled from "styled-components";
const StyleElem = styled.div`
.modal-header{
  border-bottom: none; 
}
.modal-header .btn-close{
 margin : 0px;
}
h6 {
  font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 20px;
  margin: 0px;
  padding-left: 28px;
}
.modal-body {
    height: 400px;
}
  .material-icons {
    padding: 0px;
    margin: 0px;
    float: right;
  }
  .Tool-tag {
    color: #000;
    margin-right: 20px;
    border: #e9e9e9;
  }
  .lable-text {
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
    margin: 20px 0px;
  }
  .More {
    margin-top: 20px;
    text-align: center;
  }
  .add-btn {
    margin-top: 10px;
    float: right;
  }
  .select-1 {
    margin-bottom: 16px;
  }
  .modal-footer{
    border-top: none;
  }
  span {
      padding: 20px ;
      margin: 0px;
  }
  .close-btn{
      color: #0E6DFD;
  }
`;

function ModalEditCardPosition({modalEditPosition,setModalEditPosition}) {
  return (
    <>
<Modal
        show={modalEditPosition}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setModalEditPosition(false)}
      >
        <StyleElem>
        <Modal.Header closeButton>
        <div className="grid-box"></div>
          <h6>แก้ไขตำแหน่ง Pansa</h6>
        </Modal.Header>
        <Modal.Body>
        <Form.Label className="lable-text">ตำแหน่ง</Form.Label>
        <Form.Select>
          <option value={1}>Ux</option>
          <option value={2}>Back-End</option>
        </Form.Select>
        <Form.Text className="text-muted">
        {"สามารถเพิ่ม ลบ ตำแหน่งทั้งหมดในเมนู รายละเอียด > ตำแหน่งที่ต้องการ"}        </Form.Text>
        </Modal.Body>
        <Modal.Footer>
            <span className="close-btn"
            onClick={() => setModalEditPosition(false)}
            >
                ยกเลิก
            </span>
        <Button className="add-btn">
              submit
            </Button>
        </Modal.Footer>
        </StyleElem>
      
      </Modal>
    </>
  )
}

export default ModalEditCardPosition