import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


function FormSettingPassword({ currentUser }) {


  const auth = getAuth();
  function handleResetPassword() {
    sendPasswordResetEmail(auth, currentUser.email)
      .then((res) => {
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
      });
    // currentUser.sendPasswordResetEmail(currentUser.email)
  }

  const handleInputChange = e => {
    console.log(e.target.value)
  };

  return (
    <div>
      <Form.Label>รหัสปัจุบัน</Form.Label>
      <Form.Control
        type="password"
        name="PasswordUser"
      />
      <Form.Label style={{ marginTop: "20px" }}>รหัสใหม่</Form.Label>
      <Form.Control
        style={{ marginBottom: "10px" }}
        type="password"
        name="NewPassword"
        onChange={handleInputChange}
      />
      <Form.Check
        label="มี 6 ตัวอักษรขึ้นไป"
        name="6+Characters"
        type="radio"
        id="6+Characters"
      />
      <Form.Check
        label="มีตัวอักษรพิมพ์ใหญ่ 1 ตัว"
        name="Capital letters"
        type="radio"
        id="Capital"
      />
      <Form.Label style={{ marginTop: "20px" }}>พิมพ์อีกครั้ง</Form.Label>
      <Form.Control
        type="password"
        name="AgainPassword"
      />
      <div className="contant-box">
        <span>ยกเลิก</span>
        <Button onClick={() => handleResetPassword()}>บันทึก</Button>
      </div></div>
  )
}

export default FormSettingPassword