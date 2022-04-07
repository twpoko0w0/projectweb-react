import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Dropdown, Image } from "react-bootstrap";
import styled from "styled-components";
import more from "../logo/more_horiz.svg";
import CardNewMember from "../Card/CardNewMember";
import More from "../logo/more_horiz_black_24dp.svg";
import New from '../logo/New.svg'


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
  top: 16px;
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
  top: 16px;
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
  margin; 0px ;
  float: right;
}
.dropdown-toggle::after {
  visibility: hidden;
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
  min-width:80px;
}
.dropdown-box {
  width: 24px;
  height: 24px;
  float: right;
}
`;

const findCardRole = [
  { id: 1, role: "Owner" },
  { id: 2, role: "Moderator" },
  { id: 3, role: "Member" },
]

function CardMember({ userReq, id, userData, member, tagRel, projectTag, currentUser, DeleteMember }) {

  // useEffect(() => {
  //   if (!currentUser) {
  //     return navigate({ pathname: '/Login' })
  //   }
  // }, [])
  // console.log("here: " + member[0].first_name)




  const memberElement = member.sort((a, b) => a.id - b.id).map(x => {
    const role = findCardRole.find(y => y.id === x.project_role_id).role
    const currentUserRole = member.find(z => z.user_id === currentUser.uid).project_role_id
    console.log("Here: " + currentUserRole)
    if (currentUserRole === 3) {                 //สำหรับ currUser เป็น member
      if (x.project_tag_rel_id !== 191) {
        let a = tagRel.find(y => y.id === x.project_tag_rel_id).project_tag_id;
        let b = projectTag.find(z => z.id === parseInt(a)).project_tag_name;

        return (
          <div className="card col-3 mt-4">
            <div className="infomation">
              <div className="img-box">
                <Image className="img2" src={x.user_image_link} alt="img" roundedCircle />
              </div>
              <div className="name">{x.first_name} {x.last_name} {currentUser.uid} {x.user_id}</div>
              <div className="tag">{b}</div>
              <div className="role">
                {tagRel.find(y => y.id === x.project_tag_rel_id).project_tag_role}
              </div>
              {x.user_id === currentUser.uid ? <Dropdown className="morebutton" align="end">
                <Dropdown.Toggle
                  id="dropdown"
                  className="dropdown-box"
                  as="span"
                >
                  <img src={More} alt="More" />
                  <Dropdown.Menu style={{ width: "80px" }}>
                    <Dropdown.Item
                      eventKey="1"
                    // onClick={() => handleEditTag(elem.id)}
                    >
                      แก้ไข
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2" style={{ color: "red" }}>
                      ออก
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Toggle>
              </Dropdown> : null}

            </div>
            {role === "Owner" ? <div className="position-owner">{role}</div> : role === "Moderator" ? <div className="position-moderator">{role}</div> : <div className="position-member">{role}</div>}
          </div>
        )
      } else {
        return (
          <div className='card col-3 ms-4 cardNew mt-4'>
            <div className='infomation1'>
              <div className="img-box">
                <Image className="img2" src={x.user_image_link} alt="img" roundedCircle />
              </div>
              <div className='name1'>{x.first_name} {x.last_name} </div>
              {x.user_id === currentUser.uid ? <Dropdown className="morebutton" align="end">
                <Dropdown.Toggle
                  id="dropdown"
                  className="dropdown-box"
                  as="span"
                >
                  <img src={More} alt="More" />
                  <Dropdown.Menu style={{ width: "80px" }}>
                    <Dropdown.Item
                      eventKey="1"
                    // onClick={() => handleEditTag(elem.id)}
                    >
                      แก้ไข
                    </Dropdown.Item>
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
    } else {
      if (x.project_tag_rel_id !== 191) {
        let a = tagRel.find(y => y.id === x.project_tag_rel_id).project_tag_id;
        let b = projectTag.find(z => z.id === parseInt(a)).project_tag_name;

        return (
          <div className="card col-3 mt-4 ms-2">
            <div className="infomation">
              <div className="img-box">
                <Image className="img2" src={x.user_image_link} alt="img" roundedCircle />
              </div>
              <div className="name">{x.first_name} {x.last_name}</div>
              <div className="tag">{b}</div>
              <div className="role">
                {tagRel.find(y => y.id === x.project_tag_rel_id).project_tag_role}
              </div>
              <Dropdown className="morebutton" align="end">
                <Dropdown.Toggle
                  id="dropdown"
                  className="dropdown-box"
                  as="span"
                >
                  <img src={More} alt="More" />
                  <Dropdown.Menu style={{ width: "80px" }}>
                    <Dropdown.Item
                      eventKey="1"
                    // onClick={() => handleEditTag(elem.id)}
                    >
                      แก้ไข
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2" style={{ color: "red" }}>
                      ลบ
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Toggle>
              </Dropdown>
            </div>
            {role === "Owner" ? <div className="position-owner">{role}</div> : role === "Moderator" ? <div className="position-moderator">{role}</div> : <div className="position-member">{role}</div>}
          </div>
        )
      } else {
        return (
          <div className='card col-3 ms-2 cardNew mt-4'>
            <div className='infomation1'>
              <div className="img-box">
                <Image className="img2" src={x.user_image_link} alt="img" roundedCircle />
              </div>
              <div className='name1'>{x.first_name} {x.last_name}</div>
              <Dropdown className="morebutton1" align="end">
                <Dropdown.Toggle
                  id="dropdown"
                  as="span"
                >
                  <img src={more} alt="More" />
                  <Dropdown.Menu style={{ width: "80px" }}>
                    <Dropdown.Item
                      eventKey="1"
                    // onClick={() => handleEditTag(elem.id)}
                    >
                      แก้ไข
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="2"
                      style={{ color: "red" }}
                    >
                      ลบ
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Toggle>
              </Dropdown>
              <img src={New} className='newmember1' />
            </div>
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
