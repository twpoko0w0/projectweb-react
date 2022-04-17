import React, { useState } from "react";
import { Col, Row, Form, Button, Image } from "react-bootstrap";
import More from "../logo/more_horiz_black_24dp.svg";
// import gitlab from '../Card/icon-img/icons8-gitlab.svg'
// import trello from '../Card/icon-img/icons8-trello 1.svg'
// import github from '../Card/icon-img/icons8-github.svg'
// import jira from '../Card/icon-img/icons8-jira.svg'
// import bitbucket from '../Card/icon-img/icons8-bitbucket.svg'
// import close from '../logo/cancel_black_24dp copy.svg'

const findDuration = [
  { id: 1, project_duration: 15 },
  { id: 2, project_duration: 30 },
  { id: 3, project_duration: 60 },
]

const findTier = [
  { id: 1, project_seriousness_name: "กำลังวางแผน" },
  { id: 2, project_seriousness_name: "กำลังพัฒนา" }
]

function FormEditDataProject({ projectDetail, updateProjectDetail, setUpdateProjectDetail, isOpen, setIsOpen, defaultValue, Update, UpdateAll, setImage, image, buttonShow, setButtonShow, softwareRel, softwareRelNew, softwareRelDel, software, forceUpdate, user, setSoftwareRelNew, setSoftwareRelDel, currUserRole, }) {

  const [currProjectDetail, setCurrProjectDetail] = useState("");
  const [currBrief, setCurrBrief] = useState("")
  const [currDuration, setCurrDuration] = useState(0)
  const [currTier, setCurrTier] = useState(0)
  const [currContact, setCurrContact] = useState("")
  // function handleEdit(edit) {
  //   setIsOpen(edit);
  //   setUpdateProjectDetail(defaultValue)
  // }

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var image = document.getElementById('output');
      image.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  function handleReset(edit) {
    setIsOpen(edit);
    setButtonShow("");
    setUpdateProjectDetail(defaultValue)  // ตัวนี้แสดงตอนกด edit 
    setCurrProjectDetail(defaultValue.project_detail);   // ค่าพวกนี้จะแสดงปกติ
    setCurrBrief(defaultValue.project_brief_detail);
    setCurrDuration(defaultValue.project_duration_id)
    setCurrTier(defaultValue.project_seriousness_id)
    setCurrContact(defaultValue.project_contact);
  }

  function handleEdit(edit) {
    setIsOpen(edit);
    setButtonShow(edit)
    setCurrProjectDetail(updateProjectDetail.project_detail);
    setCurrBrief(updateProjectDetail.project_brief_detail);
    setCurrContact(updateProjectDetail.project_contact);
  }

  function handleCancel(edit) {  //ทำรวมได้  // กด no เพื่อย้อนกลับไปค่าล่าสุดที่ยังไม่ได้พิมเพิ่มเข้ามา
    setIsOpen(edit);
    setButtonShow(edit)
    LastedValue();
  }

  function LastedValue() {
    setCurrProjectDetail(updateProjectDetail.project_detail)  // ต้องเป็นค่าล่าสุดจากการกด ok 
    setCurrBrief(updateProjectDetail.project_brief_detail)
    setCurrDuration(updateProjectDetail.project_duration_id)
    setCurrTier(updateProjectDetail.project_seriousness_id)
    setCurrContact(updateProjectDetail.project_contact)
  }

  function handleDetail(value) {   // ต้องทำแยก
    if (value === "") {
      setIsOpen("close");
    } else {
      setUpdateProjectDetail({ ...updateProjectDetail, project_detail: value === "" ? updateProjectDetail.project_detail : value })
      setIsOpen("close");
    }
  }

  function handleBriefDetail(value) {
    if (value === "") {
      setIsOpen("close");
    } else {
      setUpdateProjectDetail({ ...updateProjectDetail, project_brief_detail: value === "" ? updateProjectDetail.project_brief_detail : value })
      setIsOpen("close");
    }
  }

  function handleDuration(value) {
    if (value === "") {
      setIsOpen("close");
    } else {
      setUpdateProjectDetail({ ...updateProjectDetail, project_duration_id: value === "" ? updateProjectDetail.project_duration_id : value })
      setIsOpen("close");
    }
  }

  function handleTier(value) {
    if (value === "") {
      setIsOpen("close");
    } else {
      setUpdateProjectDetail({ ...updateProjectDetail, project_seriousness_id: value === "" ? updateProjectDetail.project_seriousness_id : value })
      setIsOpen("close");
    }
  }

  function handleContact(value) {
    if (value === "") {
      setIsOpen("close");
    } else {
      setUpdateProjectDetail({ ...updateProjectDetail, project_contact: value === "" ? updateProjectDetail.project_contact : value })
      setIsOpen("close");
    }
  }

  function handleSoftwareAdd(softwareId) {
    // console.log(softwareRelNew)
    const index = softwareRelNew.map(x => x.project_software_id).indexOf(softwareId)
    if (index === -1) {
      const indexDel = softwareRelDel.map(x => x.software_id).indexOf(softwareId)

      if (indexDel !== -1) {
        const sofwareRelId = softwareRelDel.find(x => x.software_id === softwareId).id
        const objAdd = {
          id: sofwareRelId,
          user_id: user.uid,
          project_software_id: softwareId
        }
        softwareRelNew.push(objAdd)
        forceUpdate();
      } else {
        let rand = Math.floor(Math.random() * 5)
        const objAdd = {
          id: rand,
          user_id: user.uid,
          project_software_id: softwareId
        }
        softwareRelNew.push(objAdd)
        forceUpdate();
      }

      if (indexDel !== -1) {
        const remove = indexDel !== 0 ? softwareRelDel.splice(indexDel, 1) : softwareRelDel.shift()
      }

    }

  }

  function handleSoftwareRemove(softwareId) {
    const index = softwareRelNew.map(x => x.project_software_id).indexOf(softwareId)  //หาที่อยู่ obj

    const objDel = {
      id: softwareRelNew[index].id,
      software_id: softwareId
    }
    softwareRelDel.push(objDel)

    const remove = index !== 0 ? softwareRelNew.splice(index, 1) : softwareRelNew.shift()
    forceUpdate();
  }

  const softwareElementDisplay = softwareRelNew.map((x, index) => {
    const softwareImage = software.find(y => y.id === x.project_software_id).software_image_link
    return (
      <Image
        className="ms-2 mb-3 mt-3"
        width={30}
        height={30}
        src={softwareImage}
        alt="Profile"
        roundedCircle
        key={index}
      />
    )
  })

  const softwareElement = software.map((x, index) => {
    if (x.software_image_link !== " ") {
      return (
        <span key={index}>
          {softwareRelNew.map(y => y.project_software_id).indexOf(x.id) === -1 ? // ไม่มี:มี
            <>
              <button className="Tool-tag mt-2 text-body" onClick={() => handleSoftwareAdd(x.id)}>
                <img width="24" height="24" src={x.software_image_link} alt="gitlab" className="ms-2" />
                {x.user_software}
              </button>
            </>
            :
            <>
              <button className="Tool-tag mt-2 bg-primary text-light" onClick={() => handleSoftwareRemove(x.id)}>
                <img width="24" height="24" src={x.software_image_link} alt="gitlab" className="ms-2" />
                {x.user_software}
              </button>
            </>
          }

        </span>
      );
    }
  });

  if (currUserRole !== 3) {
    return (
      <>
        <div className="form-contant">
          <Row>
            <Col sm={2}>
              <label className="Text-bold">รูป:</label>
            </Col>
            {isOpen === "image" ? <>
              <Col>
                <div className="">
                  <div className="d-image">
                    <div className="image-box">
                    </div>
                    <p className="d-flex justify-content-center"><img className="rounded" id="output" width="354" alt="upload" height="200" src={updateProjectDetail.project_image_link || "http://via.placeholder.com/354x200"} /></p>
                    <input type="file" onChange={handleChange} className="mt-3" />
                  </div>

                </div>
              </Col>
              <Col sm="auto">
                <Button type="submit" onClick={() => !image ? handleEdit("close") : UpdateAll()}>
                  บันทึก</Button>
                <span
                  onClick={() => handleCancel("close")}
                  style={{ color: "#0d6efd", padding: "0px 20px" }}
                  className="text-center"
                >
                  ยกเลิก
                </span>
              </Col>
            </> : <>
              <Col>
                <div className="data-img px-3">
                  <img
                    className="img-data "
                    src={projectDetail.project_image_link}
                    alt="Test"
                  />
                  {"        "}
                </div>
              </Col>
              <Col sm={1}>
                <span
                  className="edit-btn"
                  onClick={() => handleEdit("image")}
                >
                  แก้ไข
                </span>
              </Col>
            </>}

          </Row>
          <hr />
          <Row style={{ height: "68px" }}>
            <Col sm={2}>
              <label className="Text-bold">รายละเอียดโดยย่อ:</label>
            </Col>
            {isOpen === "detail" ? (
              <>
                <Col>
                  <Form.Control
                    label="projectBriefDetail"
                    name="projectBriefDetail"
                    type="text"
                    value={currProjectDetail}
                    placeholder="กรอกข้อมูล"
                    as="textarea"
                    onChange={e => setCurrProjectDetail(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col sm="auto">
                  <Button type="submit" className='bg-primary' onClick={() => handleDetail(currProjectDetail)}>
                    บันทึก
                  </Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <div className="text-data">
                    <p className="Text-data px-3">{currProjectDetail === "" ? updateProjectDetail.project_detail : currProjectDetail}</p>
                  </div>
                </Col>
                <Col sm={1}>
                  <span
                    className="edit-btn"
                    onClick={() => handleEdit("detail")}
                  >
                    แก้ไข
                  </span>
                </Col>
              </>
            )}
          </Row>
          <hr />
          <Row style={{ height: "68px" }}>
            <Col sm={2}>
              <label className="Text-bold">รายละเอียดทั้งหมด:</label>
            </Col>
            {isOpen === "brief" ? (
              <>
                <Col>
                  <Form.Control
                    label="projectDetail"
                    name="projectDetail"
                    type="text"
                    value={currBrief}
                    placeholder="กรอกข้อมูล"
                    as="textarea"
                    onChange={e => setCurrBrief(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col sm="auto">
                  <Button type="submit" className='bg-primary' onClick={() => handleBriefDetail(currBrief)}>
                    บันทึก
                  </Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <div className="text-data">
                    <p className="Text-data px-3">{currBrief === "" ? updateProjectDetail.project_brief_detail : currBrief}</p>
                  </div>
                </Col>
                <Col sm={1}>
                  <span
                    className="edit-btn"
                    onClick={() => handleEdit("brief")}
                  >
                    แก้ไข
                  </span>
                </Col>
              </>
            )}
          </Row>
          <hr />
          <Row>
            <Col sm={2}>
              <label className="Text-bold">ระยะเวลาในการทำโปรเจคโดยประมาณ:</label>
            </Col>
            {isOpen === "duration" ? (
              <>
                <Col>
                  <Form.Select name="projectDurationId" value={currDuration === "" ? updateProjectDetail.project_duration_id : currDuration} onChange={e => setCurrDuration(e.target.value)}>
                    <option value="1">15 วัน</option>
                    <option value="2">30 วัน</option>
                    <option value="3">60 วัน</option>
                  </Form.Select>
                </Col>
                <Col sm="auto">
                  <Button type="submit" className='bg-primary' onClick={() => handleDuration(currDuration)}>
                    แก้ไข
                  </Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <div className="Date-data">
                    <p className="Text-data px-3"> {updateProjectDetail.project_duration_id === 0 ? null : currDuration === 0 ? findDuration.find(x => x.id === parseInt(updateProjectDetail.project_duration_id)).project_duration : findDuration.find(x => x.id === parseInt(currDuration)).project_duration} วัน</p>
                  </div>
                </Col>
                <Col sm={1}>
                  <span
                    className="edit-btn"
                    onClick={() => handleEdit("duration")}
                  >
                    แก้ไข
                  </span>
                </Col>
              </>
            )}
          </Row>
          <hr />
          <Row>
            <Col sm={2}>
              <label className="Text-bold">สถานะของโปรเจค:</label>
            </Col>
            {isOpen === "status" ? (
              <>
                <Col>
                  <Form.Select name="projectStatusId" value={currTier === "" ? updateProjectDetail.project_status_id : currTier} onChange={e => setCurrTier(e.target.value)}>
                    <option value="1">กำลังวางแผน</option>
                    <option value="2">กำลังพัฒนา</option>
                    <option value="3">โพรเจคเสร็จสิ้น</option>
                  </Form.Select>
                </Col>
                <Col sm="auto">
                  <Button type="submit" className='bg-primary' onClick={() => handleTier(currTier)}>
                    บันทึก
                  </Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <div className="status-data">
                    <p className="Text-data px-3"> {updateProjectDetail.project_status_id === 0 ? null : currTier === 0 ? findTier.find(x => x.id === parseInt(updateProjectDetail.project_status_id)).project_seriousness_name : findTier.find(x => x.id === parseInt(currTier)).project_seriousness_name} </p>
                  </div>
                </Col>
                <Col sm={1}>
                  <span
                    className="edit-btn"
                    onClick={() => handleEdit("status")}
                  >
                    แก้ไข
                  </span>
                </Col>
              </>
            )}
          </Row>
          <hr />
          <Row>
            <Col sm={2}>
              <label className="Text-bold">ข้อมูลติดต่อ:</label>
            </Col>
            {isOpen === "contact" ? (
              <>
                <Col>
                  <Form.Label className="mt-0">Facebook (username)</Form.Label>
                  <Form.Control
                    label="Facebook-contact"
                    name="Facebookcontact"
                    type="email"
                    value={currContact}
                    onChange={e => setCurrContact(e.target.value)}
                    placeholder=""
                  ></Form.Control>
                  <Form.Label className="mt-3">Email</Form.Label>
                  <Form.Control
                    label="email-contact"
                    name="emailcontact"
                    type="email"
                    value=""
                    placeholder=""
                  ></Form.Control>
                </Col>
                <Col sm="auto">
                  <Button type="submit" onClick={() => handleContact(currContact)}>
                    บันทึก</Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                    className="text-center"
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <div className="email-contact">
                    <p className="Text-data px-3">{currContact === "" ? updateProjectDetail.project_contact : currContact}</p>
                  </div>
                </Col>
                <Col sm={1}>
                  <span
                    className="edit-btn"
                    onClick={() => handleEdit("contact")}
                  >
                    แก้ไข
                  </span>
                </Col>
              </>
            )}
          </Row>
          <hr />
          <Row>
            <Col sm={2}>
              <label className="Text-bold">โปรแกรมที่ใช้ทำงาน:</label>
            </Col>
            {isOpen === "tools" ? <>
              {/* <Col>
              <button className="Tool-Tag"><img width="24" height="24" src={gitlab} alt="gitlab" />gitlab</button>
              <button className="Tool-Tag"><img width="24" height="24" src={github} alt="github" />github</button>
              <button className="Tool-Tag"><img width="24" height="24" src={jira} alt="jira" />jira</button>
              <button className="Tool-Tag"> <img width="24" height="24" src={bitbucket} alt="bitbucket" />bitbucket</button>
              <button className="Tool-Tag"> <img width="24" height="24" src={trello} alt="trello" />trello</button>
            </Col> */}
              <Col sm="auto">
                {softwareElement}
                <br />
                <Button className="mt-4" type="submit" onClick={() => handleCancel("close")}>บันทึก</Button>
              </Col>
            </> : <>
              <Col>
                {softwareElementDisplay}
              </Col>
              <Col sm={1}>
                <span
                  className="edit-btn"
                  onClick={() => handleEdit("tools")}
                >
                  แก้ไข
                </span>
              </Col>
            </>}

          </Row>
          <hr />
          {buttonShow !== "" ? updateProjectDetail === defaultValue ? <>{softwareRel === softwareRelNew ? null : <div>
            <Row>
              <Col md={6}>
                <button className='text-dark' onClick={() => handleReset("close")}>Reset</button>
              </Col>
              <Col md={6}>
                <button className='bg-primary' onClick={UpdateAll}>Confirm</button>
              </Col>
            </Row>
          </div>
          }
          </>
            :
            <>{softwareRel === softwareRelNew ? null : <div>
              <Row>
                <Col md={6}>
                  <button className='text-dark' onClick={() => handleReset("close")}>Reset</button>
                </Col>
                <Col md={6}>
                  <button className='bg-primary' onClick={UpdateAll}>Confirm</button>
                </Col>
              </Row>
            </div>
            }
            </>
            : null
          }
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="form-contant">
          <Row>
            <Col sm={2}>
              <label className="Text-bold">รูป:</label>
            </Col>
            {isOpen === "image" ? <>
              <Col>
                <div className="">
                  <div className="d-image">
                    <div className="image-box">
                    </div>
                    <p className="d-flex justify-content-center"><img className="rounded" id="output" width="354" alt="upload" height="200" src={updateProjectDetail.project_image_link || "http://via.placeholder.com/354x200"} /></p>
                    <input type="file" onChange={handleChange} className="mt-3" />
                  </div>

                </div>
              </Col>
              <Col sm="auto">
                <Button type="submit" onClick={() => !image ? handleEdit("close") : UpdateAll()}>
                  บันทึก</Button>
                <span
                  onClick={() => handleCancel("close")}
                  style={{ color: "#0d6efd", padding: "0px 20px" }}
                  className="text-center"
                >
                  ยกเลิก
                </span>
              </Col>
            </> : <>
              <Col>
                <div className="data-img px-3">
                  <img
                    className="img-data "
                    src={projectDetail.project_image_link}
                    alt="Test"
                  />
                  {"        "}
                </div>
              </Col>

            </>}

          </Row>
          <hr />
          <Row style={{ height: "68px" }}>
            <Col sm={2}>
              <label className="Text-bold">รายละเอียดโดยย่อ:</label>
            </Col>
            {isOpen === "detail" ? (
              <>
                <Col>
                  <Form.Control
                    label="projectBriefDetail"
                    name="projectBriefDetail"
                    type="text"
                    value={currProjectDetail}
                    placeholder="กรอกข้อมูล"
                    as="textarea"
                    onChange={e => setCurrProjectDetail(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col sm="auto">
                  <Button type="submit" className='bg-primary' onClick={() => handleDetail(currProjectDetail)}>
                    บันทึก
                  </Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <div className="text-data">
                    <p className="Text-data px-3">{currProjectDetail === "" ? updateProjectDetail.project_detail : currProjectDetail}</p>
                  </div>
                </Col>

              </>
            )}
          </Row>
          <hr />
          <Row style={{ height: "68px" }}>
            <Col sm={2}>
              <label className="Text-bold">รายละเอียดทั้งหมด:</label>
            </Col>
            {isOpen === "brief" ? (
              <>
                <Col>
                  <Form.Control
                    label="projectDetail"
                    name="projectDetail"
                    type="text"
                    value={currBrief}
                    placeholder="กรอกข้อมูล"
                    as="textarea"
                    onChange={e => setCurrBrief(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col sm="auto">
                  <Button type="submit" className='bg-primary' onClick={() => handleBriefDetail(currBrief)}>
                    บันทึก
                  </Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <div className="text-data">
                    <p className="Text-data px-3">{currBrief === "" ? updateProjectDetail.project_brief_detail : currBrief}</p>
                  </div>
                </Col>

              </>
            )}
          </Row>
          <hr />
          <Row>
            <Col sm={2}>
              <label className="Text-bold">ระยะเวลาในการทำโปรเจคโดยประมาณ:</label>
            </Col>
            {isOpen === "duration" ? (
              <>
                <Col>
                  <Form.Select name="projectDurationId" value={currDuration === "" ? updateProjectDetail.project_duration_id : currDuration} onChange={e => setCurrDuration(e.target.value)}>
                    <option value="1">15 วัน</option>
                    <option value="2">30 วัน</option>
                    <option value="3">60 วัน</option>
                  </Form.Select>
                </Col>
                <Col sm="auto">
                  <Button type="submit" className='bg-primary' onClick={() => handleDuration(currDuration)}>
                    แก้ไข
                  </Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <div className="Date-data">
                    <p className="Text-data px-3"> {updateProjectDetail.project_duration_id === 0 ? null : currDuration === 0 ? findDuration.find(x => x.id === parseInt(updateProjectDetail.project_duration_id)).project_duration : findDuration.find(x => x.id === parseInt(currDuration)).project_duration} วัน</p>
                  </div>
                </Col>

              </>
            )}
          </Row>
          <hr />
          <Row>
            <Col sm={2}>
              <label className="Text-bold">สถานะของโปรเจค:</label>
            </Col>
            {isOpen === "status" ? (
              <>
                <Col>
                  <Form.Select name="projectStatusId" value={currTier === "" ? updateProjectDetail.project_status_id : currTier} onChange={e => setCurrTier(e.target.value)}>
                    <option value="1">กำลังวางแผน</option>
                    <option value="2">กำลังพัฒนา</option>
                    <option value="3">โพรเจคเสร็จสิ้น</option>
                  </Form.Select>
                </Col>
                <Col sm="auto">
                  <Button type="submit" className='bg-primary' onClick={() => handleTier(currTier)}>
                    บันทึก
                  </Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <div className="status-data">
                    <p className="Text-data px-3"> {updateProjectDetail.project_status_id === 0 ? null : currTier === 0 ? findTier.find(x => x.id === parseInt(updateProjectDetail.project_status_id)).project_seriousness_name : findTier.find(x => x.id === parseInt(currTier)).project_seriousness_name} </p>
                  </div>
                </Col>

              </>
            )}
          </Row>
          <hr />
          <Row>
            <Col sm={2}>
              <label className="Text-bold">ข้อมูลติดต่อ:</label>
            </Col>
            {isOpen === "contact" ? (
              <>
                <Col>
                  <Form.Label className="mt-0">Facebook (username)</Form.Label>
                  <Form.Control
                    label="Facebook-contact"
                    name="Facebookcontact"
                    type="email"
                    value={currContact}
                    onChange={e => setCurrContact(e.target.value)}
                    placeholder=""
                  ></Form.Control>
                  <Form.Label className="mt-3">Email</Form.Label>
                  <Form.Control
                    label="email-contact"
                    name="emailcontact"
                    type="email"
                    value=""
                    placeholder=""
                  ></Form.Control>
                </Col>
                <Col sm="auto">
                  <Button type="submit" onClick={() => handleContact(currContact)}>
                    บันทึก</Button>
                  <span
                    onClick={() => handleCancel("close")}
                    style={{ color: "#0d6efd", padding: "0px 20px" }}
                    className="text-center"
                  >
                    ยกเลิก
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <div className="email-contact">
                    <p className="Text-data px-3">{currContact === "" ? updateProjectDetail.project_contact : currContact}</p>
                  </div>
                </Col>

              </>
            )}
          </Row>
          <hr />
          <Row>
            <Col sm={2}>
              <label className="Text-bold">โปรแกรมที่ใช้ทำงาน:</label>
            </Col>
            {isOpen === "tools" ? <>
              {/* <Col>
              <button className="Tool-Tag"><img width="24" height="24" src={gitlab} alt="gitlab" />gitlab</button>
              <button className="Tool-Tag"><img width="24" height="24" src={github} alt="github" />github</button>
              <button className="Tool-Tag"><img width="24" height="24" src={jira} alt="jira" />jira</button>
              <button className="Tool-Tag"> <img width="24" height="24" src={bitbucket} alt="bitbucket" />bitbucket</button>
              <button className="Tool-Tag"> <img width="24" height="24" src={trello} alt="trello" />trello</button>
            </Col> */}
              <Col sm="auto">
                {softwareElement}
                <br />
                <Button className="mt-4" type="submit" onClick={() => handleCancel("close")}>บันทึก</Button>
              </Col>
            </> : <>
              <Col>
                {softwareElementDisplay}
              </Col>

            </>}

          </Row>
          <hr />
          {buttonShow !== "" ? updateProjectDetail === defaultValue ? <>{softwareRel === softwareRelNew ? null : <div>
            <Row>
              <Col md={6}>
                <button className='text-dark' onClick={() => handleReset("close")}>Reset</button>
              </Col>
              <Col md={6}>
                <button className='bg-primary' onClick={UpdateAll}>Confirm</button>
              </Col>
            </Row>
          </div>
          }
          </>
            :
            <>{softwareRel === softwareRelNew ? null : <div>
              <Row>
                <Col md={6}>
                  <button className='text-dark' onClick={() => handleReset("close")}>Reset</button>
                </Col>
                <Col md={6}>
                  <button className='bg-primary' onClick={UpdateAll}>Confirm</button>
                </Col>
              </Row>
            </div>
            }
            </>
            : null
          }
        </div>
      </>
    );
  }


}

export default FormEditDataProject;
