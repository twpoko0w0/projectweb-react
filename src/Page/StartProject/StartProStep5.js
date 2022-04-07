import React from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar1 from '../../Component/Navbar'

function StartProStep5() {
  return (
    <>
      <h1>ชั้นตอนที่ 5: เชิญคนรู้จัก</h1>
      <h5>เชิญคนรู้จักของคุณ (ไม่บังคับ)</h5>
      <Form>
        <Form.Label className="Text-label">เชิญโปรเจคให้เข้ากลุ่ม และคนรู้จัก</Form.Label>
        <Form.Control type="email" placeholder="name@example.com"/>
        <Form.Label className="Text-label">ข้อความ</Form.Label>
        <Form.Control as="textarea" style={{ height: "144px" }} />
      </Form>
    </>
  )
}

export default StartProStep5