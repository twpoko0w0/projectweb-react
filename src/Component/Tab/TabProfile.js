import React, { useState, useEffect, useReducer } from "react";
import { Container, Tab, Nav, Image, Row, Col, Button } from "react-bootstrap";
import Editicon from "../logo/edit_black_24dp.svg";
import styledComponents from "styled-components";
import Webicon from "../logo/language_black_24dp.svg";
import Blogicon from "../logo/article_black_24dp.svg";
import Workicon from "../logo/work_black_24dp.svg";
import Card3 from "../Card/CardProjectOwner";
import Card3ProjectJoin from "../Card/CardProjectJoin";
import ModalEditWebsite from "../Modal/ModalEditWebsite";
import ModalEditAbout from "../Modal/ModalEditAbout";

const StyleBox1 = styledComponents.div`
position: relative;
background: #ffff;
width: 356px ;
height: 230px ;
padding: 32px;
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
.box1{
position: absolute;
top: 32px;
right: 32px;
}
.cotant-Box{
    margin: 16px 0px;
}
.edit{
    cursor: pointer;
}
.cotant-Box img{
    padding-right: 20px;
}
. .content-box{
      padding: 21.5rem , 0rem;
    }
`;
const StyleBox2 = styledComponents.div`
    position: relative;
    background: #ffff;
    width: 736px ;
    height: 452px ;
    padding: 32px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    .cotant-Box{
        margin: 16px 0px;
        padding-right: 8rem;
    }
    .lable2{
        margin-top: 4rem;
    }
    .Tag-Box{
        margin: 2rem 0rem;
    }
    .box2{
    position: absolute;
    top: 32px;
    right: 32px;
    }
    .Tag-Skills{
        color:#696969;
        background: #F9F9F9; 
        padding: 8px 15px;
        border-radius: 20px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    }
    .edit{
        cursor: pointer;
    }
  
`;
const StyleBoxBtn = styledComponents.div`

display: flex;
justify-content: center;
background: #F9F9F9;    
.btnds{
 margin: 0px 4rem;  
}
  .content-boxbtn{
      padding: 21.5rem  0;
    }
`;
const StyleNav = styledComponents.div`

a {
    position: relative;
    height: 67px;
}
.nav a:hover{
    color: #3082FE;
    border-radius: 6%;
    background: #f9f9f9;
}
a:after{
    content: "";
    position: absolute;
    background: #3082FE;
    height:3px;
    width: 0;
    left: 0px;
    bottom: 0px;
    border-radius: 6%;
}
a:hover:after{
    width: 100%;
    
}

`;
function TabProfile({ userData, userSkill, userProjectData, userProjectDataAll, currentUser, UpdateWebsite, setUpdateUserWebsite,
  setUpdateUserBlog, setUpdateUserPortfolio, updateUserWebsite, updateUserBlog, updateUserPortfolio }) {

  const [modalShow, setModalShow] = useState(false);
  const [modalShowAbout, setModalShowAbout] = useState(false);

  const skillElement = userSkill.map(x => {
    return <button className="Tag-Skills">{x}</button>
  })


  const props = {
    userData, userSkill, userProjectData, modalShow, setModalShow, modalShowAbout,
    setModalShowAbout, userProjectDataAll, currentUser, UpdateWebsite, setUpdateUserWebsite, setUpdateUserBlog, setUpdateUserPortfolio
  }
  return (
    <Tab.Container defaultActiveKey="link-1">
      <Container fluid="lg">
        <StyleNav>
          <Nav style={{ height: "67px", background: "#fff" }}>
            <Nav.Item >
              <Nav.Link className="Items1" eventKey="link-1">
                เกี่ยวกับ
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="Items2" eventKey="link-2">
                {" "}
                ผลงาน
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="Items3" eventKey="link-3">
                {" "}
                โปรเจคของฉัน
              </Nav.Link>
            </Nav.Item>
            <div className="animation start-home"></div>
          </Nav>
        </StyleNav>
      </Container>

      <Tab.Content className="com-tab" style={{ background: "#f9f9f9" }}>
        <Tab.Pane eventKey="link-1">
          <Container fluid="lg">
            <div style={{ padding: "60px 0px 378px" }}>
              <Row>
                <Col>
                  <StyleBox1>
                    <div className="box-cardD">
                      <strong className="lable">WEBSITES</strong>
                      <div className="cotant-Box">

                        <Image src={Webicon} alt="" />
                        {/* {updateUserWebsite === "" ? <>{userData.user_website === "" ? <span className="text-secondary ">กรอกข้อมูลติดต่อ</span> : userData.user_website}</> : updateUserWebsite} */}
                        {userData.user_website === "" ? <span className="text-secondary ">กรอกข้อมูลติดต่อ</span> : userData.user_website}
                      </div>
                      <div className="cotant-Box">
                        <Image src={Blogicon} alt="" />
                        {userData.user_blog === "" ? <span className="text-secondary ">กรอกข้อมูลติดต่อ</span> : userData.user_blog}
                      </div>
                      <div className="cotant-Box">
                        <Image src={Workicon} alt="" />
                        {userData.user_portfolio === "" ? <span className="text-secondary ">กรอกข้อมูลติดต่อ</span> : userData.user_portfolio}
                      </div>
                    </div>
                    <div className="edit box1" onClick={() => setModalShow(true)}>
                      <Image src={Editicon} alt="Editicon" />
                    </div>
                    <ModalEditWebsite {...props} />
                  </StyleBox1>
                </Col>
                <Col>
                  <StyleBox2>
                    {" "}
                    <div className="box-cardD">
                      <strong className="lable1">ABOUT</strong>
                      <div className="cotant-Box">
                        {userData.user_about ? userData.user_about : <div className="text-secondary">คุณยังไม่ได้กรอกข้อมูลเกี่ยวกับตัวคุณ</div>}
                      </div>
                      <strong className="lable2">SKILLS</strong>
                      <div className="Tag-Box">
                        {userSkill[0] === "" ? <div className="text-secondary">คุณยังไม่ได้กรอกข้อมูลทักษะของคุณ</div> : skillElement}
                      </div>
                    </div>
                    <div className="edit box2" onClick={() => setModalShowAbout(true)}>
                      <Image src={Editicon} alt="Editicon" />
                    </div>
                    <ModalEditAbout {...props} />
                  </StyleBox2>
                </Col>
              </Row>
            </div>
          </Container>
        </Tab.Pane>
        <Tab.Pane eventKey="link-2">
          <StyleBoxBtn>
            {userProjectDataAll.length === 0 ?
              <div className="content-boxbtn">
                <h2>คุณยังไม่มีผลงาน</h2>
                <Button className="btnds">ค้นหาโปรเจค</Button>
              </div>
              :
              <Container fluid="lg" style={{ maxWidth: "1140px" }}>
                <Card3ProjectJoin {...props} />
              </Container>
            }
          </StyleBoxBtn>
        </Tab.Pane>
        <Tab.Pane eventKey="link-3">
          <StyleBoxBtn>
            {userProjectData.length === 0 ?
              <div className="content-boxbtn">
                <h2>คุณยังไม่มีโปรเจค</h2>
                <Button className="btnds">สร้างโปรเจค</Button>
              </div>
              :
              <Container fluid="lg" style={{ maxWidth: "1140px" }}>
                <Card3 {...props} />
              </Container>
            }
          </StyleBoxBtn>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}

export default TabProfile;
