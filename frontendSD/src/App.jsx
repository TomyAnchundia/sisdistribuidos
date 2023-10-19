import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
const socket = io("/");

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Yo'
    }
    setMessages([...messages, newMessage11])
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', reciveMessage);
    return () => {
      socket.off('message', reciveMessage);
    }
  }, [])

  const reciveMessage = (message) => 
    setMessages((state) => [...state, message])

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder='Escriba un mensaje'
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>enviar</button>
      </form>

      <ul>
        {
          messages.map((message, i) => (
            <li key={i} >
              {message.from}:{message.body}
              </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App