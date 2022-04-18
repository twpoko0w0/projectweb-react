import React, { useRef, useState, useEffect } from "react"
import { Routes, Route } from 'react-router-dom';
import Login from './Page/Login'
import Homepage from './Page/Homepage';
import CreateStep1 from './Page/Register/CreateStep1';
import CreateStep2 from './Page/Register/CreateStep2';
import CreateStep3 from './Page/Register/CreateStep3';
import CreateStep4 from './Page/Register/CreateStep4';
import StartProjectMain from './Page/StartProjectMain';
import { StartProStep } from './Page/StartProject/StartProStep'
import ProjectDetail from './Page/ProjectDetail'
import { ProjectItem } from './Page/ProjectList/ProjectItem/ProjectItem'
import TabManage from './Component/Tab/TabManage';
import ProjectManager from './Page/ProjectManager';
import Signup from './Component/Signup';
import Profileuser from './Page/Profileuser'
import { Link, useNavigate } from "react-router-dom"
import firebase from 'firebase/compat/app';
import ProfileSetting from "./Page/ProfileSetting";
import LoginV2 from "./Page/LoginV2";
import PDPA from "./Page/PDPA"
import Forgotpassword from "./Page/Forgotpassword";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
    })
  }, [])

  const props = { currentUser }

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="Login" element={<LoginV2 />}></Route>
        <Route path="/Forgotpassword" element={<Forgotpassword />}></Route>
        <Route path="Logindo" element={<Login />}></Route>
        <Route path="Create" element={<CreateStep1 />}></Route>
        <Route path="PDPA" element={<PDPA />}></Route>
        <Route path="StartProject" element={<StartProjectMain />}></Route>
        <Route path="StartProject/Step" element={<StartProStep {...props} />} />
        <Route path="/ProjectDetail/:id" element={<ProjectDetail {...props} />}></Route>
        <Route path="/ProjectManager/:id" element={<ProjectManager {...props} />}></Route>
        <Route path="/Signup2" element={<Signup />}></Route>
        <Route path="/Signup" element={<CreateStep1 />}></Route>
        <Route path="/Signup/step2" element={<CreateStep2 />}></Route>
        <Route path="/Signup/step3" element={<CreateStep3 />}></Route>
        <Route path="/Signup/step4" element={<CreateStep4 />}></Route>
        <Route path="/Profile/:id" element={<Profileuser {...props} />}></Route>
        <Route path="/Profilesetting/:id" element={<ProfileSetting {...props} />}></Route>
      </Routes>
    </>
  );
}
export default App;
