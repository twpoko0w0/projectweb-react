import React from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

export function ButtonRegister(props) {
    return (
        <div>
            <Button>
                {props.thisPageRegister}
            </Button>
        </div>

    )
}