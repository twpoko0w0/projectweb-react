
import React from 'react'
import { Form, Button } from 'react-bootstrap'

function FormInvite() {
  return (
    <>
      <Form>
        <Form.Label>เชิญคนเข้าโปเจคเข้ากลุ่ม และคนรู้จัก</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
        <Form.Label className='mt-4'>ข้อความ</Form.Label>
        <Form.Control as="textarea" />
        <Button className="Submit-send mt-4" style={{ marginTop: "10px", float: "right" }} variant="primary" type="submit">
          ส่งคำเชิญ <img />
        </Button>
      </Form>
    </>
  )
}

export default FormInvite