import axios from 'axios';

export class EvolutionApiService {
    private apiUrl: string;
    private apiKey: string;

    constructor() {
        this.apiUrl = process.env.EVOLUTION_API_URL || '';
        this.apiKey = process.env.EVOLUTION_API_KEY || '';
    }

    public async sendMessage(contactId: string, message: string): Promise<void> {
        try {
            const response = await axios.post(`${this.apiUrl}/send`, {
                contactId,
                message,
                apiKey: this.apiKey
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to send message: ${error.message}`);
        }
    }

    public async sendBroadcast(contactIds: string[], message: string): Promise<void[]> {
        const promises = contactIds.map(contactId => this.sendMessage(contactId, message));
        return Promise.all(promises);
    }
}