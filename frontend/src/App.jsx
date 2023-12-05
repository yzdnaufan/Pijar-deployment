import { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {MainContainer, ChatContainer, MessageList, Message,MessageInput, TypingIndicator  } from '@chatscope/chat-ui-kit-react'

// const API_URL="http://localhost:8005"
const API_URL="https://bizbot-api.menkrepp.my.id"

function App() {
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      message: "Hai! aku chatbot bisnis, ada yang bisa ku bantu?",
      sender: "BizzBot"
    }
  ])

  const handleSend = async (message) => {
    
    const newMessage ={
      message: message,
      sender : "user",
      direction:'outgoing'
    }
    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    
    // set a typing indicator (Jawabot is typing)
    setTyping(true)
    // process message to Jawabot
    await processMessageToJawabot(newMessages)
  }

  async function processMessageToJawabot(chatMessages){
    console.log(chatMessages);
    await fetch(`${API_URL}/agent`,{
      method: 'POST',
      // mode: 'cors',
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({"message": chatMessages[chatMessages.length-1].message})
    }).then((response) => {
      return response.json()
    }).then((response)=>{
      setMessages([
        ...chatMessages, {
          message:response.message, 
          sender: "BizzBot"
        }
      ])
      setTyping(false)
    })
  }

  return (
    <>
      <div style={{ position:'relative', height:'800px', width:'700px'}}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content="BizzBot is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message}/>
              })}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handleSend}/>
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  )
}

export default App
