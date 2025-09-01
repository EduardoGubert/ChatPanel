import React, { useState, useEffect } from 'react';
import { EvolutionApiService } from '../services/evolutionApiService';
import { generateMessageVariations } from '../utils/messageVariation';

interface Contact {
  _id: string;
  name: string;
  phone: string;
}

const ChatPanel: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!loggedIn) return;
    const fetchContacts = async () => {
      const response = await fetch('/api/contacts', {
        headers: {
          Authorization: 'Basic ' + btoa(`${username}:${password}`),
        },
      });
      const data = await response.json();
      setContacts(data);
    };
    fetchContacts();
  }, [loggedIn, username, password]);

  const handleContactSelect = (contactId: string) => {
    setSelectedContacts((prevSelected) =>
      prevSelected.includes(contactId)
        ? prevSelected.filter((id) => id !== contactId)
        : [...prevSelected, contactId]
    );
  };

  const handleSend = async () => {
    setSending(true);
    const variations = generateMessageVariations(message);
    const apiService = new EvolutionApiService();
    for (const variation of variations) {
      await apiService.sendBroadcast(selectedContacts, variation);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    setSending(false);
    setMessage('');
    setSelectedContacts([]);
  };

  if (!loggedIn) {
    return (
      <div>
        <h2>Login</h2>
        <input placeholder="User" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setLoggedIn(true)}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Chat Panel</h1>
      <div>
        <h2>Select Contacts</h2>
        {contacts.map((contact) => (
          <div key={contact._id}>
            <input
              type="checkbox"
              checked={selectedContacts.includes(contact._id)}
              onChange={() => handleContactSelect(contact._id)}
            />
            {contact.name}
          </div>
        ))}
      </div>
      <div>
        <h2>Compose Message</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
      </div>
      <button onClick={handleSend} disabled={sending || selectedContacts.length === 0}>
        {sending ? 'Sending...' : 'Send Broadcast'}
      </button>
    </div>
  );
};

export default ChatPanel;
