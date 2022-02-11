import React from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'


  const Test =(props)=> {

    const [name,setName] = useState('')
    const [amount,setAmount] = useState('')

    const inputName = (event)=>{
        setName(event.target.value)
    }
    const inputAmount = (event)=>{
        setAmount(event.target.value)
    }
    const saveData = (event) =>{
        event.preventDefault();
        const Data ={
            name:name,
            amount:Number(amount)
        }
        props.onAddItem(Data)
        setName('')
        setAmount('')
    }
    return (
        <div>
           
            <Form onSubmit={saveData}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>name</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={inputName} value={name}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>number</Form.Label>
                    <Form.Control type="number" placeholder="Number" onChange={inputAmount} value={amount}/>
                </Form.Group>
                <Button variant="primary" type ="submit">
                    Add
                </Button>
            </Form>
            
            
        </div>
    )
}

export default Test
