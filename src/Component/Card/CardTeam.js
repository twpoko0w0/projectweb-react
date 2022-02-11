import React, { useState } from "react";
import { Image } from "react-bootstrap";
import img from "./icon-img/13e9b391de1953810fbd9a8559c3c4c4.jpg";
import styled from "styled-components";
import CardRandom from "./Card3data";

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
  .e1 {
    background-color: #424242;
    border: 1px solid #424242;
  }
`;

function CardTeam() {
  const [teams, setTeams] = useState(CardRandom);
  return (
    <StyleBg>
      <div className="BGT">
        <h4 className="Text-teams">ทีมปัจจุบัน</h4>
        {teams.map((elem,idex) => {
          const { Tag0, TagW } = elem ;
          return (
            <StyleElem key={idex}>
              <div className="gridItems" >
                <div className="ItemsAll">
                  <Image className="ProTeam" src={img} roundedCircle />
                  <div className="TextTeam">
                    <span className="text">พรรยู่ษา </span> <br />
                    <button className="work">{Tag0}</button>{" "}
                  </div>
                </div>
                <div className="tag">
                  <button className="e1">{TagW}</button>{" "}
                </div>
              </div>
              <hr className="Hr-Teams" />
            </StyleElem>
          );
        })}
       
      </div>
    </StyleBg>
  );
}

export default CardTeam;
