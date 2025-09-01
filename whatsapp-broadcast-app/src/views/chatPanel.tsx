import React, { useState, useEffect } from 'react';
import { Contact } from '../models/contact';
import { EvolutionApiService } from '../services/evolutionApiService';
import { generateMessageVariations } from '../utils/messageVariation';

const ChatPanel: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        // Fetch contacts from the server or a local source
        const fetchContacts = async () => {
            // Replace with actual API call to fetch contacts
            const response = await fetch('/api/contacts');
            const data = await response.json();
            setContacts(data);
        };

        fetchContacts();
    }, []);

    const handleContactSelect = (contactId: number) => {
        setSelectedContacts(prevSelected => 
            prevSelected.includes(contactId) 
                ? prevSelected.filter(id => id !== contactId) 
                : [...prevSelected, contactId]
        );
    };

    const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const handleSend = async () => {
        setSending(true);
        const variations = generateMessageVariations(message);
        const apiService = new EvolutionApiService();

        for (const variation of variations) {
            await apiService.sendMessage(selectedContacts, variation);
            // Add delay to avoid spam detection
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        setSending(false);
        setMessage('');
        setSelectedContacts([]);
    };

    return (
        <div>
            <h1>Chat Panel</h1>
            <div>
                <h2>Select Contacts</h2>
                {contacts.map(contact => (
                    <div key={contact.id}>
                        <input 
                            type="checkbox" 
                            checked={selectedContacts.includes(contact.id)} 
                            onChange={() => handleContactSelect(contact.id)} 
                        />
                        {contact.name}
                    </div>
                ))}
            </div>
            <div>
                <h2>Compose Message</h2>
                <textarea 
                    value={message} 
                    onChange={handleMessageChange} 
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