import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import axios from "axios";
import { Link, useParams, NavLink } from 'react-router-dom';


const StyleFormTier = styled.div`

.formTier-box{
    display: inline ;
}
// .select-style{
//     display: inline ;
//     margin: 0px ;
//     width: 352px;
//     height: 40px;
// }
`;

function FormEditTier({ projectDetail, updateProjectDetail, setUpdateProjectDetail, isOpen, setIsOpen, defaultValue, currUserRole }) {
  const [Tier, setTier] = useState([]);
  const { id } = useParams()

  function handleEditTierClick() {
    setIsOpen("tier");
    setUpdateProjectDetail(defaultValue)
  }

  function handleClose() {
    setIsOpen("close")
    setUpdateProjectDetail(defaultValue)
  }

  function UpdateSeriousnessId() {
    axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/project/" + id, updateProjectDetail)
      .then((res) => {
        window.location.reload(false);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  if (currUserRole !== 3) {
    return (
      <StyleFormTier>
        <Row >
          <Col sm="2"><label className="Text-bold">ระดับ:</label></Col>
          {isOpen === "tier" ? (
            <>
              <Col style={{ minHeight: '40px' }}>
                <Form.Select className="select-style" value={updateProjectDetail.project_seriousness_id}
                  onChange={e => setUpdateProjectDetail({ ...updateProjectDetail, project_seriousness_id: e.target.value })}>
                  <option value="1">งานอดิเรก</option>
                  <option value="2">ผลงาน</option>
                </Form.Select>
              </Col>
              <Col sm="auto">
                <Button type="submit" className='bg-primary ms-4' onClick={UpdateSeriousnessId}>
                  บันทึก
                </Button>
                <span
                  onClick={() => handleClose()}
                  className='Text-cancel'
                  style={{ color: "#0d6efd", padding: "0px 20px" }}
                >
                  ยกเลิก
                </span>
              </Col>
            </>
          ) : (<>
            <Col style={{ minHeight: '40px' }}>
              <p className="Text-data px-3">{projectDetail.project_seriousness_name}</p>
            </Col>
            <Col sm="auto">
              <span
                className="edit-btn"
                onClick={() => handleEditTierClick(Tier)}
              >
                แก้ไข
              </span>
            </Col>
          </>)
          }
        </Row>
        <hr />
      </StyleFormTier>
    )
  } else {
    return (
      <StyleFormTier>
        <Row >
          <Col sm="2"><label className="Text-bold">ระดับ:</label></Col>
          {isOpen === "tier" ? (
            <>
              <Col style={{ minHeight: '40px' }}>
                <Form.Select className="select-style" value={updateProjectDetail.project_seriousness_id}
                  onChange={e => setUpdateProjectDetail({ ...updateProjectDetail, project_seriousness_id: e.target.value })}>
                  <option value="1">งานอดิเรก</option>
                  <option value="2">ผลงาน</option>
                </Form.Select>
              </Col>
              <Col sm="auto">
                <Button type="submit" className='bg-primary ms-4' onClick={UpdateSeriousnessId}>
                  บันทึก
                </Button>
                <span
                  onClick={() => handleClose()}
                  className='Text-cancel'
                  style={{ color: "#0d6efd", padding: "0px 20px" }}
                >
                  ยกเลิก
                </span>
              </Col>
            </>
          ) : (<>
            <Col style={{ minHeight: '40px' }}>
              <p className="Text-data px-3">{projectDetail.project_seriousness_name}</p>
            </Col>
          </>)
          }
        </Row>
        <hr />
      </StyleFormTier>
    )
  }

}

export default FormEditTier