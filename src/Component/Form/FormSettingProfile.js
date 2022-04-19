import React from 'react'
import { Button, Col, Form, Row, Alert } from 'react-bootstrap'

function FormSettingProfile({ currentUser, firstName, lastName, email, setFirstName, setLastName, setEmail, UpdateGeneral, message }) {

  return (
    <>
      <Row>
        <Col>
          <Form.Label>ชื่อจริง</Form.Label>
          <Form.Control
            type="text"
            name="editNameProfile"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Label>นามสกุล</Form.Label>
          <Form.Control
            type="text"
            name="editLastProfile"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Col>
      </Row>

      {message && <Alert variant="success" className="mt-5">{message}</Alert>}
      <div className="contant-box">
        <span>ยกเลิก</span>
        <Button onClick={() => UpdateGeneral()}>บันทึก</Button>
      </div>

    </>
  )
}

export default FormSettingProfile