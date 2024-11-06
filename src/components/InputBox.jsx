import { useState } from 'react';

const InputBox = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="flex space-x-4 p-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow p-2 border rounded-lg focus:outline-none"
      />
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Send
      </button>
    </div>
  );
};

export default InputBox;
