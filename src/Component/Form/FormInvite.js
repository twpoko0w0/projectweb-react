
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function FormInvite() {
  const [emailTo, setEmailTo] = useState("")
  const [body, setBody] = useState("")
  return (
    <>
      <Form>
        <Form.Label>เชิญคนเข้าโปเจคเข้ากลุ่ม และคนรู้จัก</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmailTo(e.target.value)} />
        <Form.Label className='mt-4'>ข้อความ</Form.Label>
        <Form.Control as="textarea" onChange={(e) => setBody(e.target.value)} />
        <Button className="Submit-send mt-4" style={{ marginTop: "10px", float: "right" }} variant="primary" type="submit" onClick={(e) => {
          e.preventDefault();
          window.location.href = "mailto:" + emailTo + "?body=" + body
        }}>
          ส่งคำเชิญ <img />
        </Button>
      </Form>
    </>
  )
}

export default FormInvite