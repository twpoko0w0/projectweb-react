import React from 'react'
import { Modal, Button, Form, Row, Col, Alert, ListGroup, Image } from "react-bootstrap";
import styledComponents from 'styled-components';


const StyleModalSuccess = styledComponents.div`

span{
    padding: 0px;
    margin: 0px;
    cursor: context-menu;
}
.modal-header{
    position: relative;
    width: 100%;
    justify-content: center;
    border-bottom: none;
}
.circle-bg{
    position: absolute;
    top: -33px;
    left: 217px;
    width: 66.4px;
    height: 66.4px;
    background: #fff;
    border-radius: 50%;
}
.material-icons-round{
    font-size: 80px;
    position: absolute;
    top: -40px;
    left: 210px;
    color: #28A745;
}
p {
    margin: 0px;
}
h4 {
    margin-top: 40px;
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 28px;
}
.Text-box {
    display: flex;
    text-align: center;
    justify-content: center;
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
}

`;



function ModalSuccess({ modalSuccess, setModalSuccess, currentUser }) {



    return (
        <>
            <Modal
                show={modalSuccess}
                aria-labelledby="contained-modal-title-vcenter"
                centered

                onHide={() => setModalSuccess(false)}
            >
                <StyleModalSuccess  >
                    <Modal.Header  >
                        <div className="circle-bg"></div>
                        <span className="material-icons-round">
                            check_circle
                        </span>
                        <h4>อีเมลถูกส่งแล้ว</h4>
                    </Modal.Header>
                    <Modal.Body style={{ padding: "14px" }}>
                        <div className="Text-box " >
                            <div className="content">
                                <p className="text-1" >
                                    ระบบจะส่งฟอร์มเปลี่ยนรหัสผ่านไปอีเมล
                                </p>
                                <strong style={{ color: "#28A745" }}>Greentuan69@hotmail.com</strong>
                                <p className="text-2" >
                                    เพื่อตั้งค่ารหัสใหม่
                                </p>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setModalSuccess(false)}>ตกลง</Button>
                    </Modal.Footer>
                </StyleModalSuccess>

            </Modal></>
    )
}

export default ModalSuccess