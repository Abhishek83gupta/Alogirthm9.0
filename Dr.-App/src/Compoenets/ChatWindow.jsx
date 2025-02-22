"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiSend, FiX } from "react-icons/fi";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const welcomeMessageAdded = useRef(false);

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
      const userId = "tPAS3CycNiaMHk8DB6YvsBuClSA3"; // Keep this if required
      const response = await fetch("http://127.0.0.1:5000/predict/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
          userId: userId,
          question: newMessage,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setIsTyping(false);

        // Check if the response is just a list of questions or unrelated content
        if (isIrrelevantResponse(responseData.answer)) {
          receiveMessage("I am a healthcare chatbot. Please ask questions related to healthcare.");
        } else {
          receiveMessage(responseData.answer);
        }
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

  // Function to detect irrelevant responses
  const isIrrelevantResponse = (response) => {
    const irrelevantKeywords = [
      "General Information",
      "Recommendations and Guidelines",
      "What is", "How can", "Are certain people",
      "spread", "prevention", "treatment", "infection", "patients",
      "top of page", "more images", "search", "library"
    ];

    // Convert response to lowercase and check if it contains multiple irrelevant keywords
    const responseLower = response.toLowerCase();
    let count = 0;
    
    irrelevantKeywords.forEach((keyword) => {
      if (responseLower.includes(keyword.toLowerCase())) count++;
    });

    return count > 3; // If more than 3 irrelevant keywords are found, reject the response
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
            className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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