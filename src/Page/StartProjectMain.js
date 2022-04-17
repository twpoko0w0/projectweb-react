import React from 'react'
import { Link } from 'react-router-dom';
import Navbar1 from '../Component/Navbar';
import Footer from '../Component/Footer'
import { Button, Image } from 'react-bootstrap';
import CreateImg from '../All_Img/Creative team-pana 1.png'
import styled from 'styled-components';

const StyleBodyMain = styled.div`

.BG-Main{
  margin-top: 60px;
 
  height: 100vh;
  width: auto;
}
h1{
  display: flex;
  justify-content: center;
}
.style-btn{
  display: flex;
  justify-content: center;
  text-decoration: none;
}
.img-main {
  display: flex;
  justify-content: center;
}
`;

function StartProjectMain() {

  return (
    <>
      <Navbar1 />
      <StyleBodyMain>
        <div className="BG-Main">
          <h1>สร้างโปรเจค และหาทีมที่ใช่ !</h1>
          <Link className="style-btn" to="Step">
            <Button>สร้างโปรเจค</Button>
          </Link>
          <div className="img-main">
            <Image src={CreateImg} />
          </div>
        </div>
      </StyleBodyMain>
      <Footer />


    </>
  )
}

export default StartProjectMain