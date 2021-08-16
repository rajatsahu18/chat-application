import React from 'react'
import "./Join.css"
import logo from "../images/logo.png"
import { Link } from 'react-router-dom'

export let user;

const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = ""
}


export const Join = () => {

    const [name, setName] = React.useState("")    

    return (
        <div className = "JoinPage">
            <div className = "JoinContainer">
                <img src= {logo} alt="logo" />
                <h1>Let's Chat</h1>
                <input onChange = {(e) => setName(e.target.value)} type="text" placeholder = "Enter Your Name" id = "joinInput" />
                <Link onClick = {(e) => !name ? e.preventDefault() : null} to = "/chat" > <button onClick = {sendUser} className = "joinbtn">Login</button> </Link>
            </div>
        </div>
    )
}
