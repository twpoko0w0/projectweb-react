import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const StyleTabs =styled.div`
.bloc-tabs {
  display: flex;
}
.tabs {
  padding: 15px;
  text-align: center;
  width: 50%;
  background: rgba(128, 128, 128, 0.075);
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.274);
  box-sizing: content-box;
  position: relative;
  outline: none;
}
.tabs:not(:last-child){
  // border-right: 1px solid rgba(0, 0, 0, 0.274);
}

.active-tabs  {
  background: white;
  border-bottom: 1px solid transparent;
}

.active-tabs::before {
  content: "";
  display: block;
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% + 2px);
  height: 5px;
  background: rgb(88, 147, 241);
}

.content-tabs {
  flex-grow : 1;
}
.content {
  background: white;
  padding: 20px;
  width: 100%;
  height: 100%;
  display: none;
}
.content h2 {
  padding: 0px 0 5px 0px;
}
.content hr {
  width: 100px;
  height: 2px;
  background: #222;
  margin-bottom: 5px;
}
.content p {
  width: 100%;
  height: 100%;
}
.active-content {
  display: block;
}
`;

function Tab() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
  <StyleTabs>
    <div className="bloc-tabs">
        <div
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Tab 1
        </div>
        <div
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Tab 2
        </div>
        <div
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Tab 3
        </div>
      </div>
  <Container fluid="lg" style={{maxWidth:"1140px"}}>
      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>Content 1</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            praesentium incidunt quia aspernatur quasi quidem facilis quo nihil
            vel voluptatum?
          </p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Content 2</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Content 3</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
            nostrum rerum laudantium totam unde adipisci incidunt modi alias!
            Accusamus in quia odit aspernatur provident et ad vel distinctio
            recusandae totam quidem repudiandae omnis veritatis nostrum
            laboriosam architecto optio rem, dignissimos voluptatum beatae
            aperiam voluptatem atque. Beatae rerum dolores sunt.
          </p>
        </div>
      </div>
  </Container>

  </StyleTabs>
    )
  ;
}

export default Tab;
