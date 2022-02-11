import React from 'react'
import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'

const StyleDrop = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap');

body{
    font-family: 'Roboto', sans-serif;
}

[id ='Popular'].btn{
    width: 115px;
    height: 44px;
    padding: 10px auto;
    border-radius: 20px;
    border: 1px solid #DCDCDC;
}
`;

const Dropdown1 =() => {
    return (
        <StyleDrop>
             <div className ="popular" style ={{alignSelf:'center'}}>
                 <Dropdown>
                    <Dropdown.Toggle variant="light" id="Popular">
                    Popular
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </StyleDrop>
    )
}

export default Dropdown1