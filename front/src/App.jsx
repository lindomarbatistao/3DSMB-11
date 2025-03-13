import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./pages/login";
import Home from "./pages/home";
import Modal from "./components/modal";
import Teacher from "./pages/teacher";

export default function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/modal" element={<Modal />}/>
                <Route path="/teacher" element={<Teacher />}/>
            </Routes>
        </Router>
    )
}

