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

function ModalEditRole({modalEditRole,setModalEditRole}) {
  return (
    <>
    <Modal
            show={modalEditRole}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => setModalEditRole(false)}
          >
            <StyleElem>
            <Modal.Header closeButton>
            <div className="grid-box"></div>
              <h6>ปรับบทบาท Pansa</h6>
            </Modal.Header>
            <Modal.Body>
            <Form.Group className="mt-5">
          <div className="box-style">
          <Form.Check type="radio" id={1} name="projectSeriousnessId" value={1} inline  />
          <label for={1}><b>Moderator:</b>สามารถจัดการข้อมูลเบื้องต้นภายในโปรเจคได้</label>
          </div><br/>
          <div className="box-style">
          <Form.Check className="mt-4" type="radio" id={2} name="projectSeriousnessId" value={2} inline  />
          <label for={2}><b>Member:</b> สมาชิกภายในทีม ไม่สามารถแก้ไขข้อมูลได้</label><br />
          </div>
        </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <span className="close-btn"
                onClick={() => setModalEditRole(false)}
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

export default ModalEditRole