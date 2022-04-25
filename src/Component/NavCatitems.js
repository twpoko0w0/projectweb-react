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

export default function NavcatITems({ filrerItems, setItems, items, project, handleCategory }) {
  return (
    <TextStyle >
      <div className="animation start-ALL"></div>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="0"
        onClick={() => handleCategory("All")}
      >
        All
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="1"
        onClick={() => handleCategory('Art')}
      >
        Art
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="2"
        onClick={() => handleCategory('Craft')}
      >
        Craft
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="3"
        onClick={() => handleCategory('Design')}
      >
        Design
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="4"
        onClick={() => handleCategory('Film & Video')}
      >
        Film & Video
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="5"
        onClick={() => handleCategory('Games')}
      >
        Game
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="5"
        onClick={() => handleCategory('Music')}
      >
        Music
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="5"
        onClick={() => handleCategory('Technology')}
      >
        Technology
      </Nav.Link>
      <Nav.Link
        style={{ padding: "8px 16px" }}
        className="Text_a"
        eventKey="5"
        onClick={() => handleCategory('Other')}
      >
        Other
      </Nav.Link>

    </TextStyle>
  )
}
