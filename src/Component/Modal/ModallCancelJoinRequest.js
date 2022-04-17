import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import axios from "axios";
import userEvent from '@testing-library/user-event';

function ModallCancelJoinRequest({ modalCancel, setModalCancel, userJoinReq, setButtonChange }) {

    function handleReject() {
        axios.delete(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectjoinreq/" + userJoinReq)
            .then((res) => {
                // setButtonChange(0)
                // setModalCancel(false)
                window.location.reload(false);
                console.log(res.data)
            })
    }
    return (
        <Modal
            show={modalCancel}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => setModalCancel(false)}
        >
            { }
            <Modal.Header closeButton>
                <div>ยกเลิกการขอเข้าร่วม</div>
            </Modal.Header>
            <Modal.Body>
                <div>คุณกำลังยกเลิกเข้าร่วมโปรเจค ใช่ไหม
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => setModalCancel(false)}>ไม่ยกเลิก</Button>
                <Button onClick={() => handleReject()}>ยกเลิกเข้าร่วม</Button>

            </Modal.Footer>

        </Modal>
    )
}

export default ModallCancelJoinRequest