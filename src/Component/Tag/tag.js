import React from 'react'
import bitbucket from './icons8-bitbucket.svg'
import gitlab from './icons8-gitlab.svg'
import './tag.css'



export default function tag() {
    return (
        <div className='G'>
            <button className='work'>Back-End</button>{'  '}
            <button className='work'>Front-end</button>{' '}
            <button className='work'>UX/UI</button>{''}
            <br/><br/>
            <button className ="lv_work">ผลงาน</button> {' '}
            <button className ="Lv_c">สร้างประสบการณ์</button> {' '}
            <br/><br/>
            <button className ="r1">เสร็จสิ้น</button> {' '}
            <button className ="r2">ระงับ</button> {' '}
            <button className ="r3">กำลังทำ</button> {' '}
            <br/><br/>
            <button className ="C1">Film & Video</button> {' '}
            <button className ="C1">Design</button> {' '}
            <button className ="C1">Technology</button> {' '}
            <br/><br/>
            <button className ="E1">MODERATOR</button> {' '}
            <button className ="E1">OWNER</button> {' '}
            <br/><br/>
            <button className ="P1"><img width="16" height="16"  src ={bitbucket} alt='bitbucket'/>Bitbucket</button> {' '}
            <button className ="P1"><img width="16" height="16"  src ={gitlab} alt='bitbucket'/>Gitlab</button> {' '}
        </div>
    )
}
