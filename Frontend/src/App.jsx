import React from 'react'
import { Outlet } from 'react-router'
import ChatBotButton from "./components/ChatBotButton"

export default function App() {
  return (
    <div>
      <Outlet/>
      <ChatBotButton/>
    </div>
  )
}