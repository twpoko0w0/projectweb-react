import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col, Alert, ListGroup, Image } from "react-bootstrap";
import styledComponents from 'styled-components';
import ModalSuccess from './ModalSuccess';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Stylemodal = styledComponents.div`

.modal-header{
    padding: 26px 20px;
}
h6 {
    margin: 0px;
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
    font-size: 20px;
}
.modal-body{
    padding: 0px;
}
p {
    margin: 0px;
}   
.Text-box{
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
}
`;

function ModalEditConfirm({ modalOpan, setModalOpan, setModalSuccess, currentUser }) {

    function handleChecked() {
        setModalSuccess(true);
        setModalOpan(false);
    }

    const auth = getAuth();
    function handleResetPassword() {
        sendPasswordResetEmail(auth, currentUser.email)
            .then(() => {
                handleChecked()
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode)
            });
    }

    return (
        <>
            <Modal
                show={modalOpan}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setModalOpan(false)}
            >
                <Stylemodal>
                    <Modal.Header closeButton>
                        <h6>ยืนยันการเปลี่ยนรหัสผ่าน</h6>
                    </Modal.Header>
                    <Modal.Body style={{ padding: "14px" }}>
                        <div className="Text-box " >
                            <p className="text mb-0" >
                                ระบบจะส่งฟอร์มเปลี่ยนรหัสผ่านไปอีเมล
                            </p>
                            <strong>Greentuan69@hotmail.com</strong>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary">ไว้ทีหลัง</Button>
                        <Button onClick={() => handleResetPassword()}>เปลี่ยนรหัสผ่าน</Button>
                    </Modal.Footer>
                </Stylemodal>

            </Modal>

        </>
    )
}

export default ModalEditConfirm