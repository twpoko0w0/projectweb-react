import React, { useState } from "react";
import { Button, Image } from 'react-bootstrap'
import styled from 'styled-components'
import Time from '../logo/access_time_filled_black_24dp (1).svg'
import Add from '../logo/add_circle_black_24dp.svg'
import Email from '../logo/email_black_24dp (1).svg'
import facebookicon from '../logo/Vector.svg'
import Logo from './Logo'
import axios from "axios";
import { NavLink } from 'react-router-dom';

const StyleCardPro = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.BGJ{
    margin: 0px 0px;
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
    text-align: center;
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

.btn.owner{
    width: 254px;
    height: 47px;
    margin-top: 10px;
    text-align: center;
    padding: 10px 32px;
    background: #3082FE;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  } 

  
.btn.join{
    width: 254px;
    height: 47px;
    margin-top: 10px;
    text-align: center;
    padding: 10px 32px;
    border: 2px solid #DCDCDC;
    background: #fff;
    color:#28A745;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.btn.join-normal{
     width: 254px;
    height: 47px;
    margin-top: 10px;
    text-align: center;
    padding: 10px 32px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn.join-normal span.material-icons{
    padding-right: 8px;
}

.btn.owner span.material-icons{
    font-size: 24px;
    padding-right: 12px;
    margin: 0;
    color:#fff;
    
  }
.btn.join span.material-icons{
    font-size: 24px;
    padding-right: 12px;
    margin: 0;
    color:#28A745;
    
  }
  span.join_text{
    text-align: center;
    line-height: 27px;
  }
  .Text-time p{
    padding-left: 10px;
    padding-right: 20px;
  }
  .img-time{
    line-height: 40px;
  }
  p { 
      margin-bottom: 16px
  }
  .icon-add{
      float: left;
  }
`;

function CardProfile({ ownerProfile, projectDetail, currentUser, id, isUserJoin, isUserMember, user }) {
    console.log(projectDetail.duration)

    const [buttonChange, setButtonChange] = useState(0)
    function handleJoinRequest() {
        axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectjoinreq", {
            user_id: currentUser.uid,
            project_id: parseInt(id),
            date_time: new Date(),
        })
            .then(function (response) {
                setButtonChange(1);
            })
    }

    if (user) {
        return (
            <StyleCardPro>
                <div className="BGJ">
                    <div className="gridimg">
                        <Image className="Projoin"
                            src={ownerProfile.user_image_link ? ownerProfile.user_image_link : "https://pixabay.com/get/g6e45d739b05a66e3f2ed3a99f17e3026ffc28049968c3ebdcbc664be2af9211a8c32427f2150b389dbfb79b381488fa123bc79393be2b0f1b5ff851805f596f2d2b4b2c69fb2da2fe05213a61c521b11_640.png"}
                            roundedCircle />
                    </div>
                    <h4>{ownerProfile.first_name} {ownerProfile.last_name}</h4>
                    <div className="mt-2">
                        <div span className="Text-time d-flex">
                            <div><img className="img-time" src={Time} /></div>
                            <p> ระยะเวลาโพรเจคต์ {projectDetail.duration} วัน </p>
                            {/* <p>(9/09/64 - 10/10/65)</p>     */}
                        </div>
                        <div span className="Text-time d-flex">
                            <div><img className="img-time" src={Email} /></div>
                            <p>  {ownerProfile.email}</p>
                        </div>
                        <div span className="Text-time d-flex">
                            <div><img className="img-time" src={facebookicon} /></div>
                            <p>  {projectDetail.project_contact}</p>
                        </div>
                    </div>
                    <Logo />
                    {currentUser.uid === ownerProfile.id ?
                        <NavLink to={`/ProjectManager/${id}`} style={{ textDecoration: 'none' }} >
                            <Button className="owner" type="add_icon" variant="success">
                                <span class="material-icons">
                                    edit
                                </span>
                                จัดการโปรเจค</Button>
                        </NavLink>
                        :
                        // {isMember === -1} ถ้าจริงไปตัวล่างเลย ถ้าไม่จริง เป็นปุ่มไปที่โปรเจค
                        <>{isUserMember === -1 ?
                            <>
                                {isUserJoin === -1 ?
                                    <>
                                        {buttonChange === 0 ? <Button className="join-normal" type="add_icon" variant="success" onClick={() => handleJoinRequest()} >
                                            <span class="material-icons">
                                                add_circle
                                            </span>
                                            เข้าร่วม</Button> : <Button className="join" type="add_icon" variant="warning" >
                                            <span class="material-icons">
                                                check_circle
                                            </span>
                                            ขอเข้าร่วมแล้ว</Button>}
                                    </>

                                    : <Button className="join" type="add_icon" variant="warning" >
                                        <span class="material-icons">
                                            check_circle
                                        </span>
                                        ขอเข้าร่วมแล้ว</Button>
                                } </> :
                            <NavLink to={`/ProjectManager/${id}`} style={{ textDecoration: 'none' }} >
                                <Button className="owner" type="add_icon" variant="success">
                                    <span class="material-icons">
                                        edit
                                    </span>
                                    ไปที่โปรเจค</Button>
                            </NavLink>
                        } </>

                    }
                </div>
            </StyleCardPro>
        );
    } else {
        return (
            <StyleCardPro>
                <div className="BGJ">
                    <div className="gridimg">
                        <Image className="Projoin"
                            src={ownerProfile.user_image_link ? ownerProfile.user_image_link : "https://pixabay.com/get/g6e45d739b05a66e3f2ed3a99f17e3026ffc28049968c3ebdcbc664be2af9211a8c32427f2150b389dbfb79b381488fa123bc79393be2b0f1b5ff851805f596f2d2b4b2c69fb2da2fe05213a61c521b11_640.png"}
                            roundedCircle />
                    </div>
                    <h4>{ownerProfile.first_name} {ownerProfile.last_name}</h4>
                    <div className="mt-2">
                        <div span className="Text-time d-flex">
                            <div><img className="img-time" src={Time} /></div>
                            <p> ระยะเวลาโพรเจคต์ {projectDetail.duration} วัน </p>
                            {/* <p>(9/09/64 - 10/10/65)</p>     */}
                        </div>
                        <div span className="Text-time d-flex">
                            <div><img className="img-time" src={Email} /></div>
                            <p>  {ownerProfile.email}</p>
                        </div>
                        <div span className="Text-time d-flex">
                            <div><img className="img-time" src={facebookicon} /></div>
                            <p>  {projectDetail.project_contact}</p>
                        </div>
                    </div>
                    <Logo />
                    <NavLink to={`/Login`} style={{ textDecoration: 'none' }} >
                        <Button className="join-normal" type="add_icon" variant="success"  >
                            <span class="material-icons">
                                add_circle
                            </span>
                            เข้าร่วม</Button>
                    </NavLink>
                </div>
            </StyleCardPro>
        );
    }


}

export default CardProfile;
