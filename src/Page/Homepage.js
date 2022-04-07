import React from 'react'
import {  Container } from 'react-bootstrap'
import styled from 'styled-components'
import Card1 from '../Component/Card/Card1'
import Card2 from '../Component/Card/Card2'
import Card3 from '../Component/Card/Card3'
import Footer from '../Component/Footer'
import NavBar from '../Component/Navbar'
import Navcat from '../Component/NavCat'

const H4 = styled.h4`
margin-top: 87px;
margin-bottom: 0px ;
font-family: 'Roboto', sans-serif;
padding-bottom: 30px;
text-align: left;
`;
const GridCard = styled.div`
display: grid;
grid-template-columns: 641px auto ;

`;

export default function Homepage() {
    return (
        <div>
            <NavBar/>
            <Container fluid ="lg" style={{maxWidth:"1140px"}}>
                <H4>โปรเจคเด่น</H4>
                <GridCard>
                    <Card1/>
                    <Card2/>
                </GridCard>
            </Container>
            <Navcat/>
            <div className="BgCard" style ={{background:"#F9F9F9"}}>
            <Footer/>
            </div>  
        </div>
    )
}