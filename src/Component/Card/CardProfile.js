import React from 'react'
import { Image,Button } from 'react-bootstrap'
import styled from 'styled-components'
import img from './icon-img/13e9b391de1953810fbd9a8559c3c4c4.jpg'
import Logo from './Logo'

const StyleCardPro = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.BGJ{
    margin: 20px 0px;
    padding: 32px;
    width: 316px;
    height: 464px;
    background-color: #fff;
    box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.176);
}
.gridimg{
    display: flex;
    justify-content: center;
}
h4{
    margin-top: 20px;
    margin-bottom: 0;
    padding: 0px;
    font-size: 28px;
    font-family: 'Roboto', sans-serif;
}
.Projoin {
    width: 80px;
    height: 80px;
    object-fit: cover;
}
span {
    align-items: center;
   margin: 0px;
   padding:0px;
   padding-top: 10px;
}
.material-icons{
    padding: 0;
    margin: 0;
    float: left;
    padding-right: 20px;
}
.bi {
    font-size: 24px;
    padding-right: 20px;
    color: #000;
}
.btn.join{
    width: 254px;
    height: 47px;
    margin-top: 10px;
    padding: 10px 76px;
  }
.btn span.material-icons{
    font-size: 24px;
    float: left;
    padding: 0;
    margin: 0;
    padding-top: 2px;
    color:#fff;
    
  }
  span.join_text{
    text-align: center;
    line-height: 27px;
  }
`;

function CardProfile() {
  return (
    <StyleCardPro>
        <div className ="BGJ">
    <div className ="gridimg">
    <Image className ="Projoin" src={img}  roundedCircle />
    </div>
    <h4>พรรอษา ก้องวัฒนะกุล</h4>
    <div className ="TextItems">
        <span>
        <span className="material-icons">access_time_filled</span>
            ระยะเวลา 1 ปี 1 เดือน 
            <span style ={{margin:"0",paddingLeft:"40px"}}>(9/09/64 - 10/10/65)</span>
        </span>
        <span>
            <span className="material-icons">email</span>
        Greentuan69@tawan.com</span>
        <br/>   
        <span><i className="bi bi-facebook"></i>พรรษา ก้องวัฒนะกุล</span>
    </div>
    <Logo/>
    <Button className = "join" type="add_icon" variant="success"><span  className="material-icons">add_circle</span><span className ="join_text">เข้าร่วม</span></Button> {''}
    
    </div>
    </StyleCardPro>
  );
}

export default CardProfile;
