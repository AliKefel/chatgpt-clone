import React from 'react';
import ReactMarkdown from 'react-markdown'; // Importing react-markdown

const ChatBox = ({ messages, typingMessage }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black text-white">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-start space-x-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
            {/* User and AI icons */}
            {message.sender === 'user' ? (
              <img src="/ai-icon.png" alt="User" className="w-full h-full object-cover" />
            ) : (
              <img src="/ai-icon.png" alt="AI" className="w-full h-full object-cover" />
            )}
          </div>
          <div
            className={`max-w-xs p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-right' : 'bg-gray-700'}`}
          >
            {/* Render the message as markdown */}
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        </div>
      ))}
      
      {/* Display typing message with Markdown */}
      {typingMessage && (
        <div className="flex items-start space-x-3 justify-start">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
            <img src="/path-to-ai-icon.png" alt="AI" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-xs p-3 bg-gray-700 rounded-lg">
            <ReactMarkdown>{typingMessage}</ReactMarkdown> {/* Render the typing message as markdown */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
