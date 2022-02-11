import React from 'react'
import { Nav } from 'react-bootstrap'
import styled from 'styled-components'

const TextStyle = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap');
a.Text_a {
    font-family: 'Roboto', sans-serif;
    padding: 8px 16px;  
 }
`;

export default function NavcatITems({number,title}) {
    return (
        <TextStyle>
             <div className ="animation start-ALL"></div>
            <Nav.Link  style={{padding:"8px 16px"}} className ="Text_a"  eventKey={number}>{title}</Nav.Link>
            
        </TextStyle>
    )
}
