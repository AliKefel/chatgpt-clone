import { useState, useEffect, useRef } from 'react';
import ChatBox from '../components/ChatBox.jsx';
import InputBox from '../components/InputBox.jsx';

const Home = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I’m your stock investment analysis assistant. Ask me anything about stocks!' },
  ]);
  const [typingMessage, setTypingMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Generate a prompt based on user input for stock analysis
  const createPrompt = (userInput) => {
    if (userInput.includes("trend") || userInput.includes("analysis")) {
      return `Provide a detailed analysis of the stock ${userInput}`;
    } else if (userInput.includes("price")) {
      return `What is the current price of ${userInput}?`;
    } else {
      return `Act as a financial advisor. Help with investment advice on ${userInput}`;
    }
  };

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setIsTyping(true);

    // Use createPrompt to craft a more relevant query for stock analysis
    const prompt = createPrompt(text);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await response.json();
      simulateTypingEffect(data.reply);
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
    }
  };

  const simulateTypingEffect = (text) => {
    setTypingMessage('');
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypingMessage((prev) => prev + text.charAt(index));
      index += 1;
      if (index === text.length) {
        clearInterval(typingInterval);
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text },
        ]);
        setTypingMessage('');
        setIsTyping(false);
      }
    }, 50);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-gray-500 p-4">
      <div className="w-full max-w-md bg-black rounded-lg shadow-md overflow-hidden flex flex-col">
        <ChatBox messages={messages} typingMessage={typingMessage} />
        <div ref={chatEndRef} />
        <InputBox onSend={handleSend} />
      </div>
    </div>
  );
};

export default Home;
