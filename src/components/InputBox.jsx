import { useState } from 'react';

const InputBox = ({ onSend, onEnterPress }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && text.trim()) {
      onSend(text);  // Send message
      setText(''); // Clear input field
    }
  };

  return (
    <div className="flex items-center p-4">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="flex-grow p-2 border rounded-md"
        placeholder="Type a message..."
      />
    </div>
  );
};

export default InputBox;
