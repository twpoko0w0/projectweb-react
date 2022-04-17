import React, { useState } from "react";
import { Container, Row, Dropdown, Image } from "react-bootstrap";
import styled from "styled-components";
import more from "../logo/more_horiz.svg";
import More from "../logo/more_horiz_black_24dp.svg";
import New from '../logo/New.svg'
import ModalEditCardPosition from "../Modal/ModalEditCardPosition";
import ModalEditRole from "../Modal/ModalEditRole";
import axios from "axios";
import { NavLink } from 'react-router-dom';


const Containerstyle = styled.div`
.card{
  height: 313px;
  width: 261px;
  border-radius: 4px;
  box-sizing: border-box;

}

.infomation{
  padding: 16px;
}

.img{
  height: 72px;
  width: 72px;
  border-radius: 50%;
  background-color: #000;
  margin: 0 auto;
}

.name{
  color: #424242;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  text-align: center;
}

.tag{
  color: #282828;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  margin-top: 4px;
  text-align: center;
}

.role{
  color: #424242;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.25px;
  margin-top: 16px;
}

.position-owner{
  background-color: #FFA62B;
  color: #fff;
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 25px;
  text-align: center;
}

.position-moderator{
  background-color: #5961F9;
  color: #fff;
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 25px;
  text-align: center;
}

.position-member{
  background-color: #424242;
  color: #fff;
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 25px;
  text-align: center;
}

.morebutton{
  position: absolute;
  top: 14px;
  right: 16px;
}

.col-3{
  padding: 0px;
}

.row{
  margin: 0px;
}
.cardNew{
  height: 161px;
  width: 261px;
  border-radius: 4px;
  box-sizing: border-box;

}

.infomation1{
  padding: 16px;
}
.name1{
  color: #424242;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  text-align: center;
}

.tag1{
  color: #282828;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  margin-top: 4px;
  text-align: center;
}

.role1{
  color: #424242;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.25px;
  margin-top: 16px;
}

.position1{
  background-color: #424242;
  color: #fff;
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 25px;
  text-align: center;
}

.morebutton1{
  position: absolute;
  top: 8px;
  right: 16px;
}

.col-3{
  padding: 0px;
}

.newmember1{
    position: absolute;
    top: -3px;
    left: -2px;
}
span{
  padding: 0px ;
  margin: 0px ;
  
}
.dropdown-toggle::after {
  display: none;
}
.img1 {
   object-fit: cover;
    height: 72px;
  width: 72px;
}
.img2 {
  object-fit: cover;
    height: 72px;
  width: 72px;
}

.img-box{
  display: flex;
  justify-content: center;
}
.dropdown-menu{
  min-width: 80px;
}
.custom-btn{
  cursor: pointer;
  padding: 4px 10px   ;
  color: black;
}
.custom-btn:hover{
  background: rgba(48, 130, 254, 0.15);
}
.dropstart .dropdown-toggle::before{
  margin-right: 10px;
}
a.de{
  padding: 4px 26px;
  color: red;
}

`;

const findCardRole = [
  { id: 1, role: "Owner" },
  { id: 2, role: "Moderator" },
  { id: 3, role: "Member" },
]

const SetCardRole = [
  { id: 2, role: "Moderator" },
  { id: 3, role: "Member" },
]

function CardMember({ userReq, id, userData, member, tagRel, projectTag, user, DeleteMember, navigate }) {

  const [modalEditPosition, setModalEditPosition] = useState(false);
  const [modalEditRole, setModalEditRole] = useState(false);

  function handleSetTag(relId, user_id, project_role_id, project_tag_rel_id) {
    axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectrel/" + relId, {
      user_id: user_id,
      project_id: parseInt(id),
      project_role_id: project_role_id,
      project_tag_rel_id: project_tag_rel_id
    }).then(() => {
      window.location.reload(false);
    })
  }

  function handleSetRole(relId, user_id, project_role_id, project_tag_rel_id) {
    axios.put(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectrel/" + relId, {
      user_id: user_id,
      project_id: parseInt(id),
      project_role_id: project_role_id,
      project_tag_rel_id: project_tag_rel_id
    }).then(() => {
      window.location.reload(false);
    })
  }

  const memberElement = member.sort((a, b) => a.id - b.id).map((x, index) => {
    const role = findCardRole.find(y => y.id === x.project_role_id).role
    const currentUserRole = member.find(z => z.user_id === user.uid).project_role_id

    const roleElement = SetCardRole.map((j, index) => {
      return (
        <Dropdown.Item key={index} onClick={() => handleSetRole(x.id, x.user_id, j.id, x.project_tag_rel_id)}>{j.role}</Dropdown.Item>
      )
    })

    const tagRelElement = tagRel.map((j, index) => {   // project tag rel database
      const tagName = projectTag.find(z => z.id === j.project_tag_id).project_tag_name
      return (
        <Dropdown.Item key={index} onClick={() => handleSetTag(x.id, x.user_id, x.project_role_id, j.id)}>{tagName}</Dropdown.Item>
      )
    })

    if (currentUserRole === 3) {                 //สำหรับ currUser เป็น member
      if (x.project_tag_rel_id !== 191) {                                    //Card เต็ม
        let a = tagRel.find(y => y.id === x.project_tag_rel_id).project_tag_id;
        let b = projectTag.find(z => z.id === parseInt(a)).project_tag_name;

        return (
          <div className="card col-3 mt-4" key={index}>
            <div className="infomation">
              <div className="img-box">
                <NavLink to={`/Profile/${x.user_id}`} style={{ color: "black", textDecoration: 'none' }}><Image className="img2" src={x.user_image_link} alt="img" roundedCircle /></NavLink>
              </div>
              <div className="name">{x.first_name} {x.last_name} {user.uid} {x.user_id}</div>
              <div className="tag">{b}</div>
              <div className="role">
                {tagRel.find(y => y.id === x.project_tag_rel_id).project_tag_role}
              </div>
              {x.user_id === user.uid ? <Dropdown className="morebutton" align="end">
                <Dropdown.Toggle
                  id="dropdown"
                  className="dropdown-box"
                  as="span"
                >
                  <img src={More} alt="More" />
                  <Dropdown.Menu style={{ width: "80px" }}>
                    <Dropdown.Item eventKey="2" style={{ color: "red" }} onClick={() => DeleteMember(x.id)}>
                      ออก
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Toggle>
              </Dropdown> : null}

            </div>
            {role === "Owner" ? <div className="position-owner">{role}</div> : role === "Moderator" ? <div className="position-moderator">{role}</div> : <div className="position-member">{role}</div>}
          </div>
        )
      } else {    //  Card New member: CurrUser role Member
        return (
          <div className='card col-3 ms-4 cardNew mt-4' key={index}>
            <div className='infomation1'>
              <div className="img-box">
                <NavLink to={`/Profile/${x.user_id}`} style={{ color: "black", textDecoration: 'none' }}><Image className="img2" src={x.user_image_link} alt="img" roundedCircle /></NavLink>
              </div>
              <div className='name1'>{x.first_name} {x.last_name} </div>
              {x.user_id === user.uid ? <Dropdown className="morebutton" align="end">
                <Dropdown.Toggle
                  id="dropdown"
                  className="dropdown-box"
                  as="span"
                >
                  <img src={More} alt="More" />
                  <Dropdown.Menu style={{ width: "80px" }}>
                    <Dropdown.Item eventKey="2" style={{ color: "red" }} onClick={() => DeleteMember(x.id)}>
                      ออก
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Toggle>
              </Dropdown> : null}
              <img src={New} className='newmember1' />
            </div>
            {role === "Owner" ? <div className="position-owner">{role}</div> : role === "Moderator" ? <div className="position-moderator">{role}</div> : <div className="position-member">{role}</div>}
          </div>
        )
      }
    } else {                               //สำหรับ CurrUser เป็น owner, moderator
      if (x.project_tag_rel_id !== 191) {                                         //Card เต็ม
        let a = tagRel.find(y => y.id === x.project_tag_rel_id).project_tag_id;
        let b = projectTag.find(z => z.id === parseInt(a)).project_tag_name;

        return (
          <div className="card col-3 mt-4 ms-2" key={index}>
            <div className="infomation">
              <div className="img-box">
                <NavLink to={`/Profile/${x.user_id}`} style={{ color: "black", textDecoration: 'none' }}><Image className="img2" src={x.user_image_link} alt="img" roundedCircle /></NavLink>
              </div>
              <div className="name">{x.first_name} {x.last_name}</div>
              <div className="tag">{b}</div>
              <div className="role">
                {tagRel.find(y => y.id === x.project_tag_rel_id).project_tag_role}
              </div>
              <Dropdown
                className="morebutton1"
                align="end"
                autoClose="outside"
              >
                <Dropdown.Toggle as="span">
                  <img src={more} alt="More" />
                </Dropdown.Toggle>{" "}
                <Dropdown.Menu >
                  <Dropdown drop="start" className="box-drop mt-1" autoClose="outside" >
                    <Dropdown.Toggle as="div" className="custom-btn">แก้ไขตำแหน่ง</Dropdown.Toggle>
                    <Dropdown.Menu>
                      {tagRelElement}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown drop="start" className="box-drop mt-1" autoClose="outside">
                    {role === "Owner" ? null : <Dropdown.Toggle as="div" className="custom-btn">แก้ไขบทบาท</Dropdown.Toggle>}

                    <Dropdown.Menu>
                      {roleElement}
                    </Dropdown.Menu>
                  </Dropdown>
                  {role === "Owner" ? null : <Dropdown.Item className="de" onClick={() => DeleteMember(x.id)}>ลบ</Dropdown.Item>}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {role === "Owner" ? <div className="position-owner">{role}</div> : role === "Moderator" ? <div className="position-moderator">{role}</div> : <div className="position-member">{role}</div>}
          </div>
        )
      } else { //  Card New member: CurrUser role Owner, moderator
        return (
          <div className='card col-3 ms-2 cardNew mt-4' key={index}>
            <div className='infomation1'>
              <div className="img-box">
                <NavLink to={`/Profile/${x.user_id}`} style={{ color: "black", textDecoration: 'none' }}><Image className="img2" src={x.user_image_link} alt="img" roundedCircle /></NavLink>
              </div>
              <div className='name1'>{x.first_name} {x.last_name}</div>

              <Dropdown
                className="morebutton1"
                align="end"
                autoClose="outside"
              >
                <Dropdown.Toggle as="span">
                  <img src={more} alt="More" />
                </Dropdown.Toggle>{" "}
                <Dropdown.Menu >
                  <Dropdown drop="start" className="box-drop mt-1" autoClose="outside" >
                    <Dropdown.Toggle as="div" className="custom-btn">แก้ไขตำแหน่ง</Dropdown.Toggle>
                    <Dropdown.Menu>
                      {tagRelElement}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown drop="start" className="box-drop mt-1" autoClose="outside">
                    {role === "Owner" ? null : <Dropdown.Toggle as="div" className="custom-btn">แก้ไขบทบาท</Dropdown.Toggle>}
                    <Dropdown.Menu>
                      {roleElement}
                    </Dropdown.Menu>
                  </Dropdown>
                  {role === "Owner" ? null : <Dropdown.Item className="de" onClick={() => DeleteMember(x.id)}>ลบ</Dropdown.Item>}
                </Dropdown.Menu>
              </Dropdown>
              <img src={New} className='newmember1' />
            </div>
            <ModalEditCardPosition modalEditPosition={modalEditPosition} setModalEditPosition={setModalEditPosition} onHide={() => setModalEditPosition(false)} />
            <ModalEditRole modalEditRole={modalEditRole} setModalEditRole={setModalEditRole} onHide={() => setModalEditRole(false)} />
            {role === "Owner" ? <div className="position-owner">{role}</div> : role === "Moderator" ? <div className="position-moderator">{role}</div> : <div className="position-member">{role}</div>}
          </div>
        )
      }
    }
  })

  return (
    <Containerstyle>
      <Container fluid="lg" style={{ maxWidth: "1140px" }} className="pt-4 ">
        <Row>
          {memberElement}
        </Row>
      </Container>
    </Containerstyle>
  );
}

export default CardMember;
