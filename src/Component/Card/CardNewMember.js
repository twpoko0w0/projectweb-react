import React from 'react';
import { Container, Row, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import New from '../logo/New.svg'
import more from '../logo/more_horiz.svg';



function CardMember() {
  return (


    <>
      <div className='card col-3 ms-4 cardNew'>
        <div className='infomation1'>
          <div className='img1'></div>
          <div className='name1'>Wiwatakon pookpoon</div>
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
        <div className='position1'>Member</div>
      </div>
    </>
  )
}

export default CardMember