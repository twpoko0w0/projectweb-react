import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap');

button {
    margin: 0px;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    font-size: 14px;
    color:#fff;
    border-radius: 4px;
    position: relative;  
}
.Lv_c{
    background-color: #1AC3CC;
    border: 1px solid #1AC3CC;
}
`;
const ColorButton = styled.div`
.lvworkf{
    background-color: #FFA62B;
    border: 1px solid #FFA62B;
}
`;


const Card3data =[

    {
        id: 1 ,
        title :"Web blog Development" ,
        Tag0 : "Back-end" ,
        Tag01 :"Front-end",
        TagW : "OWNER",
        Tag1 : <ColorButton><Button className ="lvworkf">ผลงาน</Button></ColorButton> ,
        Cat : "Art",
        Img : "https://images.unsplash.com/photo-1567336144580-e439f43b680a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1304&q=80"
    
    },
    {
        id: 2 ,
        title :"LOL" ,
        Tag0 : "Front-end" ,
        Tag01 : "UX/UI" ,
        TagW : "MODERTOR",
        Tag1 : <Button className ="Lv_c">สร้างประสบการณ์</Button> ,
        Cat : "Art",
        Img : "https://images.unsplash.com/photo-1632373564214-5944ecde24bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
    
    },
    {
        id: 3 ,
        title :"DDDDDDDDDD" ,
        Tag0 : "UX/UI" ,
        Tag01 : "Back-end" ,
        TagW : "MEMBER",
        Tag1 : <Button className ="Lv_c">สร้างประสบการณ์</Button> ,
        Cat : "Craft",
        Img : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    
    },
    {
        id: 4 ,
        title :"DDDDDDDDDD" ,
        Tag0 : "UX/UI" ,
        Tag01 : "Back-end" ,
        TagW : "MEMBER",
        Tag1 : <ColorButton><Button className ="lvworkf">ผลงาน</Button></ColorButton> ,
        Cat : "Craft",
        Img : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    
    },
    {
        id: 5 ,
        title :"Kapapa" ,
        Tag0 : "UX/UI" ,
        Tag01 : "Back-end" ,
        TagW : "MEMBER",
        Tag1 : <ColorButton><Button className ="lvworkf">ผลงาน</Button></ColorButton> ,
        Cat : "Design",
        Img : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    
    },
    {
        id: 6 ,
        title :"ROBOX" ,
        Tag0 : "UX/UI" ,
        Tag01 : "Back-end" ,
        TagW : "MEMBER",
        Tag1 : <Button className ="Lv_c">สร้างประสบการณ์</Button> ,
        Cat : "Design",
        Img : "https://images.unsplash.com/photo-1567336144580-e439f43b680a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1304&q=80"
    
    },
    {
        id: 7 ,
        title :"Dis" ,
        Tag0 : "UX/UI" ,
        Tag01 : "Back-end" ,
        TagW : "MEMBER",
        Tag1 : <Button className ="Lv_c">สร้างประสบการณ์</Button> ,
        Cat : "Film & Video",
        Img : "https://images.unsplash.com/photo-1632373564214-5944ecde24bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
    
    },
    {
        id: 8 ,
        title :"Row" ,
        Tag0 : "UX/UI" ,
        Tag01 : "Back-end" ,
        TagW : "MEMBER",
        Tag1 : <Button className ="Lv_c">สร้างประสบการณ์</Button> ,
        Cat : "Film & Video",
        Img : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    
    },
    {
        id: 9 ,
        title :"Row" ,
        Tag0 : "UX/UI" ,
        Tag01 : "Back-end" ,
        TagW : "MEMBER",
        Tag1 : <Button className ="Lv_c">สร้างประสบการณ์</Button> ,
        Cat : "Games",
        Img : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    
    },
    {
        id: 10 ,
        title :"MMMMM" ,
        Tag0 : "UX/UI" ,
        Tag01 : "Front-end" ,
        TagW : "MEMBER",
        Tag1 : <ColorButton><Button className ="lvworkf">ผลงาน</Button></ColorButton> ,
        Cat : "Games",
        Img : "https://images.unsplash.com/photo-1632373564214-5944ecde24bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
    
    },
    {
        id: 11 ,
        title :"MMMMM" ,
        Tag0 : "UX/UI" ,
        Tag01 : "Front-end" ,
        TagW : "MEMBER",
        Tag1 : <ColorButton><Button className ="lvworkf">ผลงาน</Button></ColorButton> ,
        Cat : "Music",
        Img : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    
    },
    {
        id: 12 ,
        title :"MMMMM" ,
        Tag0 : "UX/UI" ,
        Tag01 : "Front-end" ,
        TagW : "MEMBER",
        Tag1 : <Button className ="Lv_c">สร้างประสบการณ์</Button> ,
        Cat : "Music",
        Img : "https://images.unsplash.com/photo-1632373564214-5944ecde24bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
    
    },
    {
        id: 13 ,
        title :"MMMMM" ,
        Tag0 : "UX/UI" ,
        Tag01 : "Front-end" ,
        TagW : "MEMBER",
        Tag1 : <ColorButton><Button className ="lvworkf">ผลงาน</Button></ColorButton> ,
        Cat : "Technology",
        Img : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    
    },
    {
        id: 14 ,
        title :"MMMMM" ,
        Tag0 : "UX/UI",
        Tag01 : "Front-end" ,
        TagW : "MEMBER",
        Tag1 : <ColorButton><Button className ="lvworkf">ผลงาน</Button></ColorButton> ,
        Cat : "Technology",
        Img : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    
    },
    {
        id: 15 ,
        title :"MMMMM" ,
        Tag0 : "UX/UI" ,
        Tag01 : "Front-end" ,
        TagW : "MEMBER",
        Tag1 : <Button className ="Lv_c">สร้างประสบการณ์</Button> ,
        Cat : "Ohter",
        Img : "https://images.unsplash.com/photo-1632373564214-5944ecde24bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
    
    }
]


export default Card3data