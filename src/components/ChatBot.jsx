'use client';

import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export default function ChatBot() {
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  // Load or generate session ID
  useEffect(() => {
    const existing = localStorage.getItem('chat_session');
    if (existing) {
      setSessionId(existing);
    } else {
      const id = uuid();
      localStorage.setItem('chat_session', id);
      setSessionId(id);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { content: input, isBot: false };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, sessionId }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Response error:", errorText);
        setMessages((prev) => [
          ...prev,
          { content: "Something went wrong.", isBot: true },
        ]);
        return;
      }

      const data = await res.json();
      const botMsg = { content: data.response || "Hmm... I didn’t get that.", isBot: true };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages((prev) => [
        ...prev,
        { content: 'Server error. Please try again later.', isBot: true },
      ]);
    }

    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-['Press_Start_2P'] text-[10px] md:text-xs">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-3 rounded-full shadow-lg border-2 border-white"
        >
          💬
        </button>
      ) : (
        <div className="w-[320px] h-[440px] bg-[#1A1B2D] text-white rounded-lg shadow-2xl flex flex-col border-4 border-yellow-400">
          {/* Header */}
          <div className="bg-yellow-400 text-black p-3 flex justify-between items-center rounded-t-md text-sm">
            <span> Ask Me Anything</span>
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => setMessages([]), 100); 
              }}
              className="text-black hover:text-gray-700 text-lg"
            >
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 bg-[#1A1B2D] scroll-smooth">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-[85%] whitespace-pre-wrap ${
                  m.isBot
                    ? 'bg-yellow-700 text-left'
                    : 'bg-yellow-500 text-black text-right ml-auto'
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="p-2 bg-[#1A1B2D] border-t border-yellow-400">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="w-full p-2 rounded bg-[#1A1B2D] border-2 border-yellow-400 text-white placeholder:text-yellow-300 outline-none font-['Press_Start_2P'] text-[10px]"
                placeholder="Type your question.."
              />
              <button
                onClick={sendMessage}
                className="shrink-0 bg-yellow-400 text-black font-['Press_Start_2P'] text-[10px] px-3 py-2 rounded border border-black hover:bg-yellow-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
