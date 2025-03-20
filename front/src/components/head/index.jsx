import React from "react";
import {ImExit} from 'react-icons/im'
import './styles.css';

export default function Head() {

    const logout = ()=>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href('/login')
    }


    return (
        <div className="container_header">
            <section className="body">
                <div className="title">
                    <h2>Professores</h2>
                </div>
                <div className="nav">
                    <span>Create</span>
                    <span>Read</span>
                    <span>Update</span>
                    <span>Delete</span>
                </div>
                <div className="exit">
                    <ImExit onClick={logout}/>
                </div>
            </section>
        </div>
    );
}
