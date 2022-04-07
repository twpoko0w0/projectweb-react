import React from 'react'
import { Modal,Button } from 'react-bootstrap'

function suppress(props) {
  return (
    <Modal
    {...props}
    size="sm"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        ระงับโปรเจค
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
        คุณแน่ใจว่าจะระงับโปรเจคใช่หรือไม่
      </p>
    </Modal.Body>
    <Modal.Footer>
        <Button>yes</Button>
      <Button variant='outline-danger' onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default suppress