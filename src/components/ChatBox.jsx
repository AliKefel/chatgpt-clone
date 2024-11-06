import Message from './Message';

const ChatBox = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 h-[80vh] overflow-y-auto bg-gray-100 rounded-lg">
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
  );
};

export default ChatBox;
