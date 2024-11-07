
import { useState, useEffect, useRef } from 'react';
import ChatBox from '../components/ChatBox.jsx';
import InputBox from '../components/InputBox.jsx';

const Home = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! How can I help you today?' },
  ]);
  const [isTyping, setIsTyping] = useState(false); // AI typing state
  const chatEndRef = useRef(null); // For auto-scrolling

  const handleSend = async (text) => {
    // Add the user's message
    setMessages((prev) => [...prev, { sender: 'user', text }]);

    setIsTyping(true); // Start typing effect for AI message

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      setIsTyping(false); // AI finished typing
      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Sorry, there was an error.' }]);
      setIsTyping(false);
    }
  };

  // Auto-scroll the chat box to the latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom whenever messages are updated
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-gray-500 p-4">
      <div className="w-full max-w-md bg-black rounded-lg shadow-md overflow-hidden flex flex-col">
        <ChatBox messages={messages} isTyping={isTyping} />
        <div ref={chatEndRef} /> {/* Empty div to enable scrolling */}
        <InputBox onSend={handleSend} />
      </div>
    </div>
  );
};

export default Home;
