"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiSend, FiX } from "react-icons/fi";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const welcomeMessageAdded = useRef(false); // Prevent duplicate welcome message

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!welcomeMessageAdded.current) {
      receiveMessage("👋 Hello! I'm your AI assistant. How can I help you today?");
      welcomeMessageAdded.current = true;
    }
  }, []);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    sendMessage(newMessage);
    setNewMessage("");
    setIsTyping(true);

    try {
      const userId = "tPAS3CycNiaMHk8DB6YvsBuClSA3";
      const response = await fetch(
        `https://1b1b-34-70-22-243.ngrok-free.app?$tag=${newMessage}&id=${userId}`,
        {
          method: "GET",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setIsTyping(false);
        receiveMessage(responseData.message);
      } else {
        setIsTyping(false);
        receiveMessage("Sorry, I'm having trouble connecting. Please try again.");
      }
    } catch (error) {
      setIsTyping(false);
      receiveMessage("Sorry, something went wrong. Please try again later.");
    }
  };

  const sendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, type: "user" }]);
  };

  const receiveMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, type: "bot" }]);
  };

  return (
    <div className="fixed bottom-4 right-4 w-[400px] h-[600px] bg-white rounded-xl shadow-2xl flex flex-col">
      <div className="bg-blue-600 p-4 rounded-t-xl flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <h2 className="text-white font-semibold">AI Assistant</h2>
        </div>
        <button onClick={onClose} className="text-white hover:bg-blue-700 p-2 rounded-full">
          <FiX size={20} />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${message.type === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-lg">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-400"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMessage}
            onChange={handleInputChange}
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700" disabled={isTyping}>
            <FiSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;