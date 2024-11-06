const ChatBox = ({ messages, typingMessage }) => {
  return (
    <div className="flex flex-col p-4 space-y-2 overflow-y-auto max-h-[70vh]">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.sender === 'ai' ? 'ai' : 'user'}`}
        >
          <p>{message.text}</p>
        </div>
      ))}
      {/* Display typing effect when AI is typing */}
      {typingMessage && (
        <div className="message ai">
          <p>{typingMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
