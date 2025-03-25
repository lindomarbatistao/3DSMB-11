import React, { useState, useEffect } from "react";
import Head from "../../components/head";
import Footer from "../../components/footer";
import './styles.css'

export default function Home() {
    return(
        <div className="container_home">
            <Head/>
                <div className="body_home">
                    <h1>Home</h1>
                </div>
            <Footer/>
        </div>
    )
}