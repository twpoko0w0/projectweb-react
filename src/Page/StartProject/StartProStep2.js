import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function StartProStep2({ formdata, setFormdata }) {
  const { projectSeriousnessId } = formdata;
  const projectSeriousnessToInt = parseInt(projectSeriousnessId);
  // console.log("This is project SeId: " + projectSeriousnessId);

  return (
    <>
      <div className="container-grid">
        <h1 className="d-flex justify-content-center">ชั้นตอนที่ 2: เลือกระดับของโปรเจค</h1>
        <p className="d-flex justify-content-center text-secondary"><h5>เลือกระดับเพื่อค้นหาทีมที่เหมาะกับโปรเจคของเรา</h5></p>
        <div className="d-flex justify-content-center">
          <div>
            <Form.Group className="mt-5">
              <Form.Check type="radio" id={1} name="projectSeriousnessId" value={1} inline onChange={(e) => setFormdata({ ...formdata, projectSeriousnessId: e.target.value })} checked={projectSeriousnessToInt === 1} />
              <label for={1}><b>งานอดิเรก:</b> เป็นประเภทที่ไม่จริงจังมากเกินไป อยากทดสอบไอเดียของโปรเจคว่าเป็นจริงได้มากแค่ไหน</label><br />
              <Form.Check type="radio" id={2} name="projectSeriousnessId" value={2} inline onChange={(e) => setFormdata({ ...formdata, projectSeriousnessId: e.target.value })} className="mt-4" checked={projectSeriousnessToInt === 2} />
              <label for={2}><b>ผลงาน:</b> เป็นประเภทที่จริงจังกับงาน อยากให้งานชิ้นนี้เกิดขึ้นจริง เพื่อเก็บเป็นผลงานของตัวเอง</label><br />
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartProStep2;
