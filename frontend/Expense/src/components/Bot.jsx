import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Generative AI model with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const Bot = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // Store conversation history
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      // Use the updated and recommended model name
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(input);
      const text = await result.response.text();
      
      setMessages([...newMessages, { role: "bot", text: text || "No response." }]);
    } catch (err) {
      console.error("API Error:", err);
      setError("Sorry, I couldn't process your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bot-popup shadow-lg rounded">
      <div className="bot-header d-flex justify-content-between align-items-center p-2 bg-dark text-white rounded-top">
        <span className="fw-bold">ExpenseEase AI</span>
        <button className="btn-close btn-close-white" onClick={onClose}></button>
      </div>

      <div className="bot-body p-3" style={{ height: '300px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded ${msg.role === 'user' ? 'bg-primary text-white ms-auto' : 'bg-dark text-light'}`} style={{ maxWidth: '80%' }}>
            {msg.text}
          </div>
        ))}
        {error && <div className="alert alert-danger p-2">{error}</div>}
      </div>

      <div className="bot-footer p-2 border-top">
        <form onSubmit={handleAsk} className="d-flex gap-2">
          <input
            className="form-control"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Ask"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Bot;