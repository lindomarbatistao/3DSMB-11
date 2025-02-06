import React, {useState} from "react";
import './styles.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Login(){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')


    return(
        <div className="container_login">
            <h1>Login</h1>
            <input
                className="caixa"
                placeholder="User"    
                type="text"
            />

            <input
                className="caixa"
                placeholder="Password"
                type="password"
            
            />

            <button className="btn">
                Enter
            </button>
        </div>
    )
}