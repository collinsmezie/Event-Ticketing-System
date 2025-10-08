# Event Ticketing System

A modern, full-stack Next.js application for managing event tickets with attendee tracking, QR code generation, and ticket verification.

## Features

### 🎫 Event Management
- Browse upcoming events across multiple categories (Conferences, Concerts, Workshops, Expos, Sports)
- Create new events with customizable details and banner selection
- Modern, responsive card-based event listings
- Category filtering and search

### 🎟️ Ticket Purchasing
- Simple ticket purchase flow with buyer information
- Automatic QR code generation for each ticket
- Unique ticket codes using UUID
- Instant ticket confirmation with printable view

### 👥 Attendee Management
- Comprehensive attendee dashboard with real-time stats
- Track total tickets sold, check-ins, and revenue
- Filter attendees by check-in status
- One-click check-in/undo functionality
- Event-specific statistics breakdown

### ✅ Ticket Verification
- QR code scanner using device camera
- Manual ticket code entry option
- Real-time validation with visual feedback
- Display ticket holder and event information
- Automatic check-in status updates

### 🎨 Modern UI/UX
- Beautiful gradient designs and smooth animations
- Mobile-first responsive layout
- Intuitive navigation with sticky header
- Card-based layouts with hover effects
- Consistent color scheme across all pages
- Print-friendly ticket views

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS with custom animations
- **QR Generation:** qrcode library
- **QR Scanning:** html5-qrcode
- **ID Generation:** uuid
- **Data Storage:** In-memory (demo purposes)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install