import React from 'react'
import Button from 'react-bootstrap/Button';
import './Styles/Button_Defaullt.css'

const Default1 = ()=><Button variant="primary">เพิ่มลงลิสต์</Button>
const Default2 = ()=><Button className = "mo" href ="#" variant="primary"><span>ค้นหาโปรเจค</span></Button>
const Default3 = ()=><Button className = "mo1" href ="#" variant="primary">สร้างโปรเจค</Button>
function Button_Default() {
    return (
        <div>
            <Default1/> {' '}
            <Default2/> {' '}
            <Default3/> {' '}
        </div>
    )
}
export default Button_Default