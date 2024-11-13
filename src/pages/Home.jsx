import { useState, useEffect, useRef } from 'react';
import ChatBox from '../components/ChatBox.jsx';
import InputBox from '../components/InputBox.jsx';

const Home = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I’m here to help you gather requirements for Coach Valerie’s volleyball team management app. Ask me anything about the app requirements!' },
  ]);
  const [typingMessage, setTypingMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Generate a specific response based on user input for requirements gathering
  const createResponse = (userInput) => {
    userInput = userInput.toLowerCase();
    
    if (userInput.includes("client needs") || userInput.includes("requirements")) {
      return "Coach Valerie needs an app to manage her volleyball team. It should list the best players, create scrimmage teams, and track player performance.";
    } else if (userInput.includes("players") && userInput.includes("team")) {
      return "The scrimmage teams should have six players each, and the number of players varies yearly. Currently, there are 15 players.";
    } else if (userInput.includes("data") || userInput.includes("stats")) {
      return "The app will have data on each player's blocking and attacking averages, updated after each match.";
    } else if (userInput.includes("platform") || userInput.includes("device")) {
      return "The app should work on both phones and laptops for ease of access.";
    } else if (userInput.includes("training") || userInput.includes("practice")) {
      return "The team practices 2 or 3 times a week, with a game each weekend. Scrimmage teams are created during each practice.";
    } else {
      return null; // Fallback to OpenAI if no specific response matches
    }
  };

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setIsTyping(true);

    // Check if we can create a direct response
    const directResponse = createResponse(text);
    
    if (directResponse) {
      simulateTypingEffect(directResponse);  // Show direct response
    } else {
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
      <h1 className='font-semibold text-md tracking-tight mb-14 text-stone-300' > Coach Valerie Design Requirements Chat </h1>
      <div className="w-full max-w-md bg-black rounded-lg shadow-md overflow-hidden flex flex-col">
        <ChatBox messages={messages} typingMessage={typingMessage} />
        <div ref={chatEndRef} />
        <InputBox onSend={handleSend} />
      </div>
    </div>
  );
};

export default Home;
