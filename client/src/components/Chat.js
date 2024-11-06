// client/src/components/Chat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [gif, setGif] = useState('');
  const [gifSearch, setGifSearch] = useState('');
  const [gifResults, setGifResults] = useState([]);
  const [showGifSearch, setShowGifSearch] = useState(false);
  const [gifButtonLabel, setGifButtonLabel] = useState('GIF');

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get('http://localhost:5000/api/chat');
      setMessages(res.data);
    };
    fetchMessages();

    socket.on('message', (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.post(
        'http://localhost:5000/api/chat',
        { content, gif },
        { headers: { Authorization: token } }
      );
      socket.emit('message', res.data);
      setContent('');
      setGif('');
      setGifButtonLabel('GIF');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleGifSearch = async (e) => {
    e.preventDefault();
    const apiKey = process.env.REACT_APP_GIPHY_API_KEY; // Load API key from environment variables
    try {
      const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifSearch}&limit=5`);
      setGifResults(res.data.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <p>
              <strong>{message.sender ? message.sender.username : 'Unknown'}</strong> [{new Date(message.createdAt).toLocaleTimeString()}]: {message.content}
              {message.gif && <img src={message.gif} alt="GIF" />}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          placeholder="Type a message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="button" onClick={() => setShowGifSearch(!showGifSearch)} className="gif-button">
          {gifButtonLabel}
        </button>
        <button type="submit">Send</button>
      </form>
      {showGifSearch && (
        <div className="gif-search-container">
          <form onSubmit={handleGifSearch}>
            <input
              type="text"
              placeholder="Search for GIFs"
              value={gifSearch}
              onChange={(e) => setGifSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <div className="gif-results">
            {gifResults.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                onClick={() => {
                  setGif(gif.images.fixed_height.url);
                  setShowGifSearch(false);
                  setGifButtonLabel('Added');
                }}
                style={{ cursor: 'pointer', margin: '5px' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;