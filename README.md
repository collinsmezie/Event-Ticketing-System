# File: /README.md

# Trade Fair Ticketing System

A full-stack Next.js demo application for managing trade fair event tickets.

## Features

- Browse upcoming trade fair events
- Purchase tickets (simulated payment)
- Generate unique QR-coded tickets
- Verify tickets at entry gates (QR scanner + manual entry)
- In-memory data storage (no database required)

## Installation

1. Install dependencies:
\`\`\bash
npm install
\`\`\`

2. Run the development server:
\`\`\bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Browse Events**: Visit the homepage to see all available trade fair events
2. **Buy Ticket**: Click on an event, fill in your details, and purchase a ticket
3. **View Ticket**: After purchase, view your ticket with QR code
4. **Verify Ticket**: Use the verify page to scan QR codes or enter ticket codes manually

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- QRCode generation
- HTML5 QR Scanner

## Demo Features

This is a demo application with:
- No authentication
- Simulated payments
- In-memory data storage
- Pre-seeded event data

## License

MIT