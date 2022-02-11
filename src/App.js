import React, { useState } from 'react'

import { Routes , Route } from 'react-router-dom';

import Login  from './Page/Login'
import Homepage from './Page/Homepage';
import CreateStep1 from './Page/CreateStep1';
import Navbar1 from './Component/Navbar';
import StartProject from './Page/StartProject';
import ProjectDetail from './Page/ProjectDetail'

function App() {
 
  return (
    <>
    <Routes>
         <Route path="/" element ={<Homepage/>}></Route>
         <Route path="/Login" element ={<Login/>}></Route>
         <Route path="/Create" element ={<CreateStep1/>}></Route>
         <Route path="/StartProject" element={<StartProject/>}></Route>
         <Route path="/ProjectDetail" element={<ProjectDetail/>}></Route>
    </Routes>
    </>
  );
}
export default App;
