import React, { useEffect, useState } from "react";
import "./Skills.css"; // Reuse existing styles for consistency
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
      setMessages(messages.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/contact/${id}`, { method: "PUT" });
      setMessages(messages.map(m => m._id === id ? { ...m, isRead: true } : m));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="skills-container">
      <div className="page-header">
        <h2>Inbox Messages</h2>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="skills-content">
          {messages.length === 0 && <p>No messages found.</p>}

          {messages.map((msg) => (
            <div key={msg._id} className="skill-card" style={{ display: 'block', opacity: msg.isRead ? 0.7 : 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ color: '#F8FAFC', margin: 0 }}>{msg.name}</h4>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.9rem', marginBottom: '5px' }}>{msg.email}</p>
              <p style={{ color: '#E2E8F0', background: '#334155', padding: '10px', borderRadius: '8px' }}>
                {msg.message}
              </p>

              <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                {!msg.isRead && (
                  <button
                    onClick={() => markAsRead(msg._id)}
                    style={{ background: '#10B981', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg._id)}
                  style={{ background: '#EF4444', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactPage;