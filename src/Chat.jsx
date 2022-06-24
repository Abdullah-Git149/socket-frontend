import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom"
export const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("")
    const [msgList, setMsgList] = useState([])
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send__message", messageData)
            setMsgList((item) => [...item, messageData])
            setCurrentMessage("")
            console.log("list", msgList);
        }
    }
    useEffect(() => {
        socket.on("recieve__message", (data) => {
            console.log(data);
            setMsgList((item) => [...item, data])
      

        })
        setCurrentMessage("")
    }, [socket])

    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {
                        msgList.map((messageContent, key) => {
                            return (
                                <div key={key} className='message' id={username === messageContent.author ? "you" : "other"}>
                                    <div>
                                        <div className='message-content'>
                                            <p>{messageContent.message}</p>
                                        </div>
                                        <div className='message-meta'>
                                            <p id='time'>{messageContent.time}</p>
                                            <p id='author'>{messageContent.author}</p>

                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input type="text" placeholder='hey..'
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => { e.key === "Enter" && sendMessage() }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>

        </div>
    )
}

export default Chat