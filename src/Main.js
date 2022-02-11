
import React, { useState,useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import './Main.css'
import axios from 'axios';

const baseURL = "https://jsonplaceholder.typicode.com/posts/1"
const startNote ={
    content: '', number:''
};

// https://jsonplaceholder.typicode.com/posts
function Main () {
    
    //state ของการจัดการแต่ละตัว
    const [note, setNote] = useState (startNote);
    const [editNote,setEditNote] =useState (null);
    const [allNotes,setAllNotes] = useState ([]);
    const [post, setPost] = useState ([]);

    //useeffect ทำการเรียก api
    useEffect (()=>{
        axios.get(baseURL).then((response) => {
            setPost(response.data);
            console.log(response.data);
        })
        
    },[])

    // function createPost() {
    //     axios.post (baseURL,{
    //         title: 'Hello',
    //         body: 'This is a new post'
    //     })
    //     .then ((response)=>{
    //         setPost(response.data);
    //     })
    // }

    // function updatePost() {
    //     axios.put(`${baseURL}/1`, {
    //         title : 'mama',
    //         body: 'This is an updated post.'
    //     })
    //     .then((response)=>{
    //         setPost(response.data);
    //     })
    // }

    // function deletePost(){
    //     axios.delete(`${baseURL}/1`)
    //     .then(() =>{
    //         alert("Post Delete");
    //         setPost(null);
    //     })
    // }
    if (!post) return "No post!";

    //fuction ของ input
    function onNoteValueChange (event) {
        const {name, value} = event.target;
        setNote((prevNote)=>{
            return{
                ...prevNote,
                [name]:value
            }
        });
    }
    function onEditNoteValueChange (event) {
        const {name, value} = event.target;
        setEditNote((prevNote)=>{
            return{
                ...prevNote,
                [name]:value
            }
        });
    }
    // fuction add,edit, Delete
    function onNoteSubmit (event) {
        event.preventDefault();
        setAllNotes((prevAllNotes)=>{
            const newNote ={...note};
            newNote.id = Date.now().toString();
            return [newNote,...prevAllNotes]
        });
        setNote(startNote);
    }

    function onEditNoteSubmit (event){
        event.preventDefault();

        setAllNotes((prevAllNotes)=>{
            return prevAllNotes.map((theNote)=>{
                if (theNote.id !== editNote.id)return theNote;
                return editNote;
            })
        })

        setEditNote(null);
    }

    function onNoteDelete(noteID){
        setAllNotes((prevAllNotes)=>{
            return prevAllNotes.filter(theNote=> theNote.id !== noteID);
        });
    }

    // Elements
    const noteElements = allNotes.map((theNote)=>{
        return (
            <div key={theNote.id}>
                <li>{theNote.content}<span>{theNote.number}</span>
                    <span className='bn'>
                    <button style={{color:"darkblue"}}
                    onClick={()=>{setEditNote(theNote)}}
                    >/</button>
                    {"  "}
                    <button style={{color:"darkblue"}}
                    onClick={()=>{onNoteDelete(theNote.id)}}
                     >x</button>

                    </span>
                </li>

            </div>
        )
    });

    let editNoteElement = null;


    if (!!editNote){
        editNoteElement = (
            <div className='edit-notes'>
                <Form onSubmit={onEditNoteSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>name</Form.Label>
                    <Form.Control 
                    type="text" placeholder="Name" name="content"
                      value={editNote.content} onChange={onEditNoteValueChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>number</Form.Label>
                    <Form.Control type="number" placeholder="Number" name= "number" 
                     value={editNote.number} onChange={onEditNoteValueChange}/>
                </Form.Group>
                <Button variant="primary" type ="submit">
                    Add
                </Button>
            </Form>
            </div>
        )
    }

    return (
        <div>
            <Container fluid ="xl" style={{maxwidth:"1140px"}}>
            <Form onSubmit={onNoteSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>name</Form.Label>
                    <Form.Control 
                    type="text" placeholder="Name" name="content"
                     onChange={onNoteValueChange} value={note.content}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>number</Form.Label>
                    <Form.Control type="number" placeholder="Number" name= "number" 
                    onChange={onNoteValueChange} value={note.number}/>
                </Form.Group>
                <Button variant="primary" type ="submit">
                    Add
                </Button>
            </Form>
            <div className='app-notes'>
                <ul className='item-list'>
                    {noteElements}
                </ul>
            </div>
            <div>
                <h1>{post.id}</h1>
                <p>{post.body}</p>
                {/* <button onClick={createPost}>create Post</button>
                <button onClick={updatePost}>Up Post</button>
                <button onClick={deletePost}>Delete Post</button> */}
            </div>
            </Container>
            {editNoteElement}
        </div>
        
    )
}

export default Main
