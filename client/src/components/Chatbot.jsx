import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      content: "Hello! I am Aparous' Digital Architect. I help businesses design, build, and scale their premium web applications and cinematic video productions. What is the name of your business or project?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Dialogue state tracked on frontend and sent to backend
  const [leadState, setLeadState] = useState({
    step: 'ask_business',
    data: { name: '', email: '', businessName: '', projectDetails: '', budget: '' }
  });

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    if (!textToSend) {
      setInputText('');
    }

    // Add user message
    const updatedMessages = [...messages, { sender: 'user', content: text }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          leadState
        })
      });

      if (!response.ok) throw new Error('Chatbot response error');

      const data = await response.json();

      // Append bot response and update state
      setMessages((prev) => [...prev, { sender: 'bot', content: data.reply }]);
      if (data.nextState) {
        setLeadState(data.nextState);
      }
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [
        ...prev,
        { 
          sender: 'bot', 
          content: "Oops! I encountered an transmission issue. Feel free to use the main contact form at the bottom of the page or refresh to try again." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const selectQuickPrompt = (promptText) => {
    handleSendMessage(promptText);
  };

  return (
    <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 1000 }}>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(135deg, var(--accent-purple) 0%, #6f26d9 100%)',
            border: 'none',
            color: '#fff',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(161, 79, 255, 0.4), 0 0 15px rgba(0, 242, 254, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: 'scale(1)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) translateY(0)')}
        >
          <MessageSquare size={26} />
        </button>
      )}

      {/* Expanded Chat Box (White Background Theme) */}
      {isOpen && (
        <div
          style={{
            width: '380px',
            height: '520px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981', // green active indicator
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
                }}
              />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Aparous Digital Bot</h4>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Lead Qualification Architect</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0f172a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              background: '#f8fafc', // light off-white body background
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                {msg.sender === 'bot' && (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(124, 58, 237, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#7c3aed',
                      border: '1px solid rgba(124, 58, 237, 0.2)',
                    }}
                  >
                    <Bot size={14} />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    fontSize: '0.88rem',
                    lineHeight: '1.45',
                    background: msg.sender === 'user' ? 'var(--accent-purple)' : '#ffffff',
                    border: msg.sender === 'user' ? '1px solid rgba(161, 79, 255, 0.1)' : '1px solid #e2e8f0',
                    color: msg.sender === 'user' ? '#ffffff' : '#334155',
                    borderTopRightRadius: msg.sender === 'user' ? '2px' : '12px',
                    borderTopLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
                    boxShadow: msg.sender === 'bot' ? '0 1px 2px rgba(0, 0, 0, 0.02)' : 'none',
                  }}
                >
                  {msg.content}
                </div>
                {msg.sender === 'user' && (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(15, 23, 42, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#475569',
                      border: '1px solid rgba(15, 23, 42, 0.1)',
                    }}
                  >
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: '0.8rem' }}>Architect is designing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {leadState.step === 'complete' && (
            <div
              style={{
                padding: '10px 20px',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                background: '#f8fafc',
              }}
            >
              <button
                onClick={() => selectQuickPrompt("Tell me about website pricing.")}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  color: '#7c3aed',
                  borderRadius: '15px',
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                Pricing Structure
              </button>
              <button
                onClick={() => selectQuickPrompt("Show me details of recent works.")}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  color: '#7c3aed',
                  borderRadius: '15px',
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                Portfolio Info
              </button>
            </div>
          )}

          {/* Input Footer */}
          <div
            style={{
              padding: '15px 20px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              gap: '10px',
              background: '#ffffff',
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask a question..."
              disabled={isLoading}
              style={{
                flex: 1,
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '24px',
                padding: '10px 16px',
                color: '#0f172a',
                fontSize: '0.88rem',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#7c3aed';
                e.target.style.backgroundColor = '#ffffff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.backgroundColor = '#f1f5f9';
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputText.trim()}
              style={{
                background: 'var(--accent-purple)',
                color: '#fff',
                border: 'none',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                opacity: !inputText.trim() || isLoading ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (inputText.trim() && !isLoading) e.currentTarget.style.backgroundColor = '#6f26d9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-purple)';
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Embedded CSS animation for rotating spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
