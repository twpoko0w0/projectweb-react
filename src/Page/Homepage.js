import React, { useEffect, useState, useReducer } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
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
    const [searchTerm, setSearchTerm] = useState("");
    const [projectTag, setProjectTag] = useState([]);
    const [nameTag, setNameTag] = useState("")      //เก็บค่า select 
    const [memberCountSelect, setMemberCountSelect] = useState([]);
    const [memberCount, setMemberCount] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const props = { project, items, setItems, currentUser, searchTerm, setSearchTerm, projectTag, setNameTag, nameTag, memberCountSelect, setMemberCountSelect, memberCount };
    console.log(nameTag)
    useEffect(() => {
        let isMounted = true;
        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/project")
            .then((res) => {
                const resProject = res.data;
                if (isMounted) {
                    const filterProject1 = resProject.filter(x => x.project_activated !== 0)
                    const filterProject2 = resProject.filter(x => x.project_activated !== 0)
                    if (isMounted) {
                        setProject(filterProject1)
                        setItems(filterProject2)
                        setIsLoading(true)
                    }
                }
                // console.log(resProject)
            });
        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/projecttag")    //ดึงของ Tagมาใช้
            .then((res) => {
                const projectTagIist = res.data;
                if (isMounted) {
                    setProjectTag(projectTagIist);
                    setIsLoading(true);
                }
                //   console.log(projectTagIist)
            });
        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/userprojectrel")    // สำหรับ หน้า project member
            .then((res) => {
                const resProjectRel = res.data;
                console.log(resProjectRel)
                const counts = {};
                resProjectRel.forEach(x => { counts[x.project_id] = (counts[x.project_id] || 0) + 1; });
                const countsLength = Object.keys(counts).length

                for (let i = 0; i < countsLength; i++) {
                    let newObj = {
                        project_id: Object.keys(counts)[i],
                        member: Object.values(counts)[i]
                    }
                    memberCount.push(newObj)
                }
            })
        return () => {
            isMounted = false;
        };
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
                    <Row>
                        <Col>
                            <Card1 {...props} />
                        </Col>
                        <Col>
                            <Card2 {...props} />
                        </Col>
                    </Row>
                </Container>
                <Navcat {...props} />
                <div className="BgCard" style={{ background: "#F9F9F9" }}>
                    <Footer />
                </div>
            </div>}

        </div>
    )
}