import { useState, useEffect, useRef } from 'react';
import ChatBox from '../components/ChatBox.jsx';
import InputBox from '../components/InputBox.jsx';

const Home = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! How can I help you today?' },
  ]);
  const [typingMessage, setTypingMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      simulateTypingEffect(data.reply);
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
    }
  };

  const simulateTypingEffect = (text) => {
    setTypingMessage('');  // Clear any previous typing message
    let index = 0;

    const typingInterval = setInterval(() => {
      setTypingMessage((prev) => prev + text.charAt(index));
      index += 1;

      if (index === text.length) {
        clearInterval(typingInterval);

        // Finalize the typing effect
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: text },
        ]);

        // Clear typing state
        setTypingMessage('');
        setIsTyping(false);
      }
    }, 50); // Adjust speed here (50ms per character)
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
