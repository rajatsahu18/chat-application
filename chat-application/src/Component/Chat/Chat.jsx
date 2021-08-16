import React, { useState } from 'react'
import {user} from "../Join/Join"
import socketIo from "socket.io-client"
import "./Chat.css"
import sendLogo from "../images/send.png"
import { Message } from '../Message/Message'
import ReactScrollToBottom from "react-scroll-to-bottom"
import closeIcon from "../images/closeIcon.png"

let socket;

const ENDPOINT = "https://chalo-chat-kare.herokuapp.com/"

export const Chat = () => {
    const [id, setid] = React.useState("")
    const [messages, setMessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value
        socket.emit('message', {message, id})
        document.getElementById('chatInput').value = "";
    }
    
    console.log(messages)
    React.useEffect(() => {
        socket = socketIo(ENDPOINT, {transports : ['websocket']});

        socket.on('connect', () => {
            // alert("connected")
            setid(socket.id)
        })

        console.log(socket)
        socket.emit('joined', {user})

        socket.on('welcome', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message)
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message)
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message)
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [])

    React.useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message, data.id)
        })
        return () => {
            socket.off()
        }
    }, [messages])

    return (
        <div className = "chatPage">
            <div className = "chatContainer">
                <div className = "header">
                    <h2>{user}</h2>
                    <a href="/"><img src={closeIcon} alt="close" /></a>
                </div>
                <ReactScrollToBottom className = "chatBox">
                    {messages.map((item, i) => <Message user = {item.id === id ? '' : item.user} message = {item.message} classs = {item.id === id ? 'right' : 'left'} /> )}
                </ReactScrollToBottom>
                <div className = "inputBox">
                    <input onKeyPress = {(event) => event.key === "Enter" ? send() : null} type="text" id = "chatInput" placeholder = "Type your message..." />
                    <button onClick = {send} className = "sendBtn"> <img src= {sendLogo} alt="send" /> </button>
                </div>
            </div>
        </div>
    )
}
