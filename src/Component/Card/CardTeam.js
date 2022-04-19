import React, { useState } from "react";
import { Image } from "react-bootstrap";
import img from "./icon-img/13e9b391de1953810fbd9a8559c3c4c4.jpg";
import styled from "styled-components";
import CardRandom from "./Card3data";
import { NavLink } from 'react-router-dom';

const StyleBg = styled.div`
  .BGT {
    background-color: #ffff;
    box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.176);
    width: 316px;
    height: 456px;
    padding: 32px;
  }
  .Text-teams {
    margin: 0;
    text-align: left;
  }
  .Hr-Teams {
    margin: 10px 0;
  }
`;
const StyleElem = styled.div`
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap");
  .gridItems {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ItemsAll {
    display: flex;
    align-items: center;
  }
  .ProTeam {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
  .TextTeam {
    margin-left: 20px;
  }
  .text {
    padding: 0px;
    margin: 0px;
  }
  button {
    margin: 0px;
    font-family: "Roboto", sans-serif;
    cursor: pointer;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    position: relative;
  }
  .work {
    background-color: #3082fe;
    border: 1px solid #3082fe;
    color: #fff;

    height: 16px;
    line-height: 14px;
    border-radius: 6px;
    margin: 0px;
    padding: 0px 2px;
    font-size: 14px;
  }
  .e1owner {
    background-color: #FFA62B;
    border: 1px solid #424242;
  }

  .e1moderator {
    background-color: #5961F9;
    border: 1px solid #424242;
  }

  .e1member {
    background-color: #424242;
    border: 1px solid #424242;
  }
`;

const findCardRole = [
  { id: 1, role: "Owner" },
  { id: 2, role: "Moderator" },
  { id: 3, role: "Member" },
]

function CardTeam({ member, tagRel, projectTag }) {
  const [teams, setTeams] = useState(CardRandom);

  console.log(member)

  const memberElement = member.sort((a, b) => a.id - b.id).map(x => {
    const role = findCardRole.find(y => y.id === x.project_role_id).role

    if (x.project_tag_rel_id !== 191) {
      let a = tagRel.find(y => y.id === x.project_tag_rel_id).project_tag_id;
      let b = projectTag.find(z => z.id === parseInt(a)).project_tag_name;

      return (
        <StyleElem >
          <div className="gridItems mt-4" >
            <div className="ItemsAll">
              <NavLink to={`/Profile/${x.user_id}`} style={{ color: "black", textDecoration: 'none' }}>
                <Image className="ProTeam" src={x.user_image_link ? x.user_image_link : "https://cdn-icons-png.flaticon.com/512/847/847969.png"} roundedCircle />
              </NavLink>
              <div className="TextTeam">
                <span className="text">{x.first_name}</span> <br />
                <button className="work">{b}</button>{" "}
              </div>
            </div>
            <div className="tag">
              <button className="e1member">{role}</button>

            </div>
          </div>
          <hr className="Hr-Teams" />
        </StyleElem>
      )
    } else {
      return (
        <StyleElem >
          <div className="gridItems mt-4" >
            <div className="ItemsAll">
              <NavLink to={`/Profile/${x.user_id}`} style={{ color: "black", textDecoration: 'none' }}>
                <Image className="ProTeam" src={x.user_image_link ? x.user_image_link : "https://cdn-icons-png.flaticon.com/512/847/847969.png"} roundedCircle />
              </NavLink>
              <div className="TextTeam">
                <span className="text">{x.first_name}</span> <br />

              </div>
            </div>
            <div className="tag">
              <button className="e1member">{role}</button>

            </div>
          </div>
          <hr className="Hr-Teams" />
        </StyleElem>
      )
    }

  })

  return (
    <StyleBg>
      <div className="BGT">
        <h4 className="Text-teams">ทีมปัจจุบัน</h4>
        {memberElement}
      </div>
    </StyleBg>
  )
}

export default CardTeam;
