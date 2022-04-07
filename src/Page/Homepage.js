import React, { useEffect, useState, useReducer } from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import Card1 from '../Component/Card/Card1'
import Card2 from '../Component/Card/Card2'
import Card3 from '../Component/Card/Card3'
import Footer from '../Component/Footer'
import NavBar from '../Component/Navbar'
import Navcat from '../Component/NavCat'
import axios from "axios";
import ProjectDetail from './ProjectDetail'
import firebase from 'firebase/compat/app';
import Spinner from '../Component/LoadingSpinner/Spinner'

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
    const [project, setProject] = useState([])
    const [items, setItems] = useState(project);
    const [currentUser, setCurrentUser] = useState([]);
    const props = { project, items, setItems, currentUser };
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/project")
            .then((res) => {
                const resProject = res.data;
                setProject(resProject)
                setItems(resProject)
                setIsLoading(true)
                // console.log(resProject)
            });

    }, [])

    function Check() {
        firebase.auth().onAuthStateChanged(user => {
            console.log(user.uid);
        })
    }

    function Logout() {
        firebase.auth().signOut()
    }
    // console.log("This Project: " + project);
    return (
        <div>
            {isLoading === false ? <Spinner /> : <div>
                <NavBar {...props} />
                <Container fluid="lg" style={{ maxWidth: "1140px" }}>
                    <H4>โปรเจคเด่น</H4>
                    <GridCard>
                        <Card1 />
                        <Card2 />
                    </GridCard>
                </Container>
                <Navcat {...props} />
                <div className="BgCard" style={{ background: "#F9F9F9" }}>
                    <Footer />
                </div>
            </div>}

        </div>
    )
}