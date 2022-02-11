import React from 'react';
import github from './icon-img/icons8-github.svg'
import gitlab from './icon-img/icons8-gitlab.svg'
import bitbucket from './icon-img/icons8-bitbucket.svg'
import jira from './icon-img/icons8-jira.svg'
import trello from './icon-img/icons8-trello 1.svg'
import styled from 'styled-components';


const Stylelogo = styled.div`
.git_item{
    display: flex;
    margin-top: 18px;
    justify-content: space-around;
}
a {
    display: inline-flex;
    margin: 4px;
    padding: 4px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #F0F0F0;
}
a.Progg{
    text-decoration: none;
    color: #000;
    justify-content: center; 
    float: right;
}
`;

function Logo() {
  return (
    <Stylelogo>
    <div className = "git_item">
    <a><img width="24" height="24"  src ={gitlab} alt='gitlab'/></a>
    <a><img width="24" height="24"  src ={github} alt='github'/></a>
    <a><img width="24" height="24"  src ={jira} alt='jira'/></a>
    <a><img width="24" height="24"  src ={bitbucket} alt='bitbucket'/></a>
    <a><img width="24" height="24"  src ={trello} alt='trello'/></a>
    <a className ="Progg">+5</a>
    </div>
    </Stylelogo>
  );
}

export default Logo;
