import React from 'react'
import { Nav } from 'react-bootstrap'
import styled from 'styled-components'

const TextStyle = styled.div`
display: flex;
  justify-content: ;
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap');
a.Text_a {
    font-family: 'Roboto', sans-serif;
    padding: 8px 16px;  
 }
`;

export default function NavcatITems({ filrerItems, setItems, items, project }) {
  return (
    <TextStyle >
      <div className="animation start-ALL"></div>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="0"
        onClick={() => setItems(project)}
      >
        All
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="1"
        onClick={() => filrerItems('Art')}
      >
        Art
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="2"
        onClick={() => filrerItems('Craft')}
      >
        Craft
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="3"
        onClick={() => filrerItems('Design')}
      >
        Design
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="4"
        onClick={() => filrerItems('Film & Video')}
      >
        Film & Video
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="5"
        onClick={() => filrerItems('Games')}
      >
        Game
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="5"
        onClick={() => filrerItems('Music')}
      >
        Music
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="5"
        onClick={() => filrerItems('Technology')}
      >
        Technology
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="5"
        onClick={() => filrerItems('Other')}
      >
        Other
      </Nav.Link>

    </TextStyle>
  )
}
