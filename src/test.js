import React from 'react'
import styled from 'styled-components'

const Style = styled.div`
    margin : 10px ;
    h1 {
        padding: 10px 20px;
    }

`;

function test() {
  return (
    <Style>
        <h1 >test style in react</h1>
    </Style>
  )
}

export default test