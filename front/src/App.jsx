import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./pages/login";
import Home from "./pages/home";
import ModalProfessores from "./components/modals/teacher";
import ModalSubject from "./components/modals/subject";
import Teacher from "./pages/teacher";
import Subjects from "./pages/subjects";

export default function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/modal_teacher" element={<ModalProfessores />}/>
                <Route path="/modal_subject" element={<ModalSubject />}/>
                <Route path="/teacher" element={<Teacher />}/>
                <Route path="/subjects" element={<Subjects />}/>
            </Routes>
        </Router>
    )
}

