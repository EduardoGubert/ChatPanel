import axios from 'axios';

export class EvolutionApiService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = process.env.EVOLUTION_API_URL || '';
    this.apiKey = process.env.EVOLUTION_API_KEY || '';
  }

  public async sendMessage(contactId: string, message: string): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/send`, {
        contactId,
        message,
        apiKey: this.apiKey,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  public async sendBroadcast(contactIds: string[], message: string): Promise<any[]> {
    const promises = contactIds.map((contactId) => this.sendMessage(contactId, message));
    return Promise.all(promises);
  }

  public async getMessageStatus(messageId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/status/${messageId}`, {
        params: { apiKey: this.apiKey },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get status: ${error.message}`);
    }
  }

  public async scheduleMessage(contactId: string, message: string, sendAt: Date): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/schedule`, {
        contactId,
        message,
        sendAt,
        apiKey: this.apiKey,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to schedule message: ${error.message}`);
    }
  }
}
