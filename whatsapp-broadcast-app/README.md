# WhatsApp Broadcast App

## Overview
The whatsapp-broadcast-app App is a web-based application that allows users to create and manage broadcast lists for sending messages to multiple contacts on WhatsApp. The application integrates with the Evolution API to facilitate message sending while ensuring compliance with WhatsApp's policies to avoid spam detection.

## Features
- Create and manage contact lists for broadcasting messages.
- Compose messages with the assistance of AI for better engagement.
- Generate message variations to prevent spam detection.
- Schedule message sending with customizable time intervals.
- User authentication for secure access.

## Technologies Used
- **Frontend**: React (TypeScript)
- **Backend**: Node.js (Express)
- **Database**: MongoDB (or any preferred database)
- **API Integration**: Evolution API for WhatsApp messaging
- **Environment Variables**: Managed via `.env` file

## Project Structure
```
whatsapp-broadcast-app
├── src
│   ├── controllers
│   │   └── contactsController.ts
│   ├── models
│   │   └── contact.ts
│   ├── routes
│   │   └── contacts.ts
│   ├── services
│   │   └── evolutionApiService.ts
│   ├── utils
│   │   └── messageVariation.ts
│   ├── views
│   │   └── chatPanel.tsx
│   └── app.ts
├── package.json
├── tsconfig.json
├── README.md
└── .env
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone https://github.com/EduardoGubert/ChatPanel.git
   ```
2. Navigate to the project directory:
   ```
   cd whatsapp-broadcast-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables (e.g., API keys, database connection strings).
5. Start the application:
   ```
   npm start
   ```

## Usage
- Access the application through your web browser.
- Log in with your credentials.
- Create a new broadcast list by selecting contacts and composing your message.
- Use the AI assistance feature to enhance your message.
- Send the broadcast and monitor the delivery status.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.