import React from 'react'
import { Container, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import Icon from './more_horiz_black_24dp.svg'

const StyleList = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.list-group{
    width:736px;
    background: #fff;
    box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.176);
}
.list-group-item.hearder{
    padding: 30px;
   height: 95px;
   border-left: none;
   border-right: none ;
   border-top: none;
}
h6 {
    margin: 0;
    padding-top: 4px;
    font-family: 'Roboto' sans-serif;
    font-weight: bold;
    font-size: 20px;
}
.list-group-item.item{
    display: flex;
    justify-content: space-between;
    height: 48px;
    border-left: none;
    border-right: none ;
    
}
span {
    padding: 0;
    align-self:  center;
}
.name{
    margin: 0;
    align-self: center;
    color: #3082FE;
}
.material-icons{
    float: right;
    color: #000;
    margin-left: 20px;
}
`
const Transaction =()=>{
    return (
        <>
                <ListGroup.Item className = "hearder"><h6>หน้าที่ในลิสต์</h6></ListGroup.Item>
               <ListGroup.Item className = "item"><span>Ux Designer</span><p className ="name">1 ตำแหน่ง <img src ={Icon} alt='more'/></p></ListGroup.Item>
               <ListGroup.Item className = "item"><span>UX Writer</span><p className ="name">1 ตำแหน่ง <img src ={Icon} alt='more'/></p></ListGroup.Item>
               <ListGroup.Item className = "item"><span>Ui Designer</span><p className ="name">1 ตำแหน่ง <img src ={Icon} alt='more'/></p></ListGroup.Item>
               <ListGroup.Item className = "item"><span>Project Manager</span><p className ="name">1 ตำแหน่ง <img src ={Icon} alt='more'/></p></ListGroup.Item>
               <ListGroup.Item className = "item"><span>Back-end Developer</span><p className ="name">1 ตำแหน่ง <img src ={Icon} alt='more'/></p></ListGroup.Item>
               <ListGroup.Item className = "item"><span>QA (Quality Assurance)</span><p className ="name">1 ตำแหน่ง <img src ={Icon} alt='more'/></p></ListGroup.Item>
       </>
    );
}
 function List() {
    return (
        
            <StyleList style ={{margin:"30px"}}>
                 <ListGroup>
                
                <Transaction/>
            </ListGroup>
            </StyleList>
            
    )
}

export default List
