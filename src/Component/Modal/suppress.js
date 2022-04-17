import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from "axios";


function suppress({ modalShow, setModalShow, updateProjectDetail, id, navigate }) {


  function Deactivate() {
    axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/project/" + id, {
      project_name: updateProjectDetail.project_name,
      project_activated: 0,
      project_status_id: updateProjectDetail.project_status_id,
      project_category_id: updateProjectDetail.project_category_id,
      project_seriousness_id: updateProjectDetail.project_seriousness_id,
      project_detail: updateProjectDetail.project_detail,
      project_brief_detail: updateProjectDetail.project_brief_detail,
      project_contact: updateProjectDetail.project_contact,
      project_image_link: updateProjectDetail.project_image_link,
      project_duration_id: updateProjectDetail.project_duration_id
    })
      .then((res) => {
        console.log(res.data)
        navigate({ pathname: '/' })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
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
        <Button onClick={() => Deactivate()}>yes</Button>
        <Button variant='outline-danger' onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default suppress