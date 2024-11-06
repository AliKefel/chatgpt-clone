const Message = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`p-3 rounded-lg max-w-xs ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
        >
          {message.text}
        </div>
      </div>
    );
  };
  
  export default Message;
  