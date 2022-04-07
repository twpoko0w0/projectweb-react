import React from 'react';
import { Form , Row, Col, Container,Button } from 'react-bootstrap';
import styled from 'styled-components';


const BodyStyle = styled.div`
.inFO{
  height: 100vh;
  background: linear-gradient(to right, #fff 65%, rgba(48, 130, 254, 0.05) 35%);
  );
}
`;
const Style = styled.div`
.FormCon{
  margin: 0 ;
  display: flex;
  justify-content: center;
}
.StyleForm{
  width:352px;
}
h1 {
  margin: 0 ;
  padding-top: 74px;
  padding-bottom: 47px;
  text-align: center;
}
.Textpassword{
  text-decoration: none;
  float: right;
};
้
`;
const StyleBtnLogin =styled.div`
.login {
  width: 352px;
  height: 48px;
  margin-top: 32px;
  padding: 12px 16px ;
  box-sizing: border-box;
}
`;
const Stylelol = styled.div`
display: flex;
justify-content: space-between;
margin:24px 0px;
hr{
  display: inline-block;
  width: 144px;
  background: #AFAFAF;
  align-self: center;
}
span{
  margin: 0px;
  padding: 0px;
  font-size: 13px;
  color: #AFAFAF;
  align-self: center;
  
}
`;
// const StylePO = styled.div`
// .Pogr{
//   background: rgba(48, 130, 254, 0.05);
// }
// `;

export default function Login() {
  return (
    <BodyStyle>
      <div className="inFO">
        <Style>
          
            <Row>
              <Col lg={8}>
                <div className="FormCon">
                <Form className="StyleForm" >
                  <h1>เข้าสู่ระบบ</h1>
                  <Form.Label  className="text_lable">อีเมล</Form.Label>
                    <Form.Control type="email" placeholder="" style ={{maxWidth:"352px" ,margin:"0"}} />
                  <Form.Label>รหัสผ่าน</Form.Label>
                    <Form.Control type="password" placeholder="" style ={{maxWidth:"352px" ,margin:"0"}} />
                    <div className="form-check" style={{paddingTop:"8px"}}>
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                    <label className="form-check-label" >
                      จดจำ
                    </label>
                    <a href="#" className = "Textpassword" >ลืมรหัสผ่าน?</a> {''}
                  </div>
                  <StyleBtnLogin>
                  <Button className = "login" href ="#" variant="primary">
                    เข้าสู่ระบบ
                  </Button>
                  </StyleBtnLogin>
                  <Stylelol>
                  <hr/><span>หรือ</span><hr/>
                  </Stylelol>
                </Form>
                </div>
              </Col>
              <Col  lg={4}>
                <div className="Pogr">11651</div>
              </Col>
            </Row>
          
        </Style>
    </div>
    </BodyStyle>
  )
}
