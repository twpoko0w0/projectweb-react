import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import styledComponents from 'styled-components'
import { NavLink } from 'react-router-dom';

function undoModal({ undoModalShow, setUndoModalShow, user, isUserMember, isUserJoin }) {

  if (user) {
    return (
      <Modal
        show={undoModalShow}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setUndoModalShow(false)}
      >
        { }
        <Modal.Header closeButton>
          <div>สำหรับสมาชิกเท่านั้น</div>
        </Modal.Header>
        <Modal.Body>
          <div>ข้อมูลนี้สำหรับสมาชิกภายในโปรเจคเท่านั้น
            ขอเข้าร่วมเลย!
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setUndoModalShow(false)}>โอเคร</Button>
        </Modal.Footer>

      </Modal>
    )
  } else {
    return (
      <Modal
        show={undoModalShow}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setUndoModalShow(false)}
      >
        { }
        <Modal.Header closeButton>
          <div>สำหรับสมาชิกเท่านั้น</div>
        </Modal.Header>
        <Modal.Body>
          <div>ข้อมูลนี้สำหรับสมาชิกภายในโปรเจคเท่านั้น
            สร้างบัญชี และขอเข้าร่วมเลย!
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setUndoModalShow(false)}>ไว้ทีหลัง</Button>
          <NavLink to={`/Signup`} style={{ color: "black", textDecoration: 'none' }}>
            <Button>สร้างบัญชี</Button>
          </NavLink>
        </Modal.Footer>

      </Modal>
    )
  }

}

export default undoModal