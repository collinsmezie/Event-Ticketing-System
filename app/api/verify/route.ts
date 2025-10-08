// File: /app/api/verify/route.ts (UPDATED)

import { NextResponse } from 'next/server';
import { tickets, events } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, skipMarkAsUsed } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Ticket code is required' },
        { status: 400 }
      );
    }

    const ticket = tickets.find(t => t.code === code);

    if (!ticket) {
      return NextResponse.json({
        valid: false,
        message: 'Invalid ticket code',
        ticket: null,
        event: null
      });
    }

    if (ticket.used) {
      const event = events.find(e => e.id === ticket.eventId);
      return NextResponse.json({
        valid: false,
        message: 'Ticket has already been used',
        ticket,
        event
      });
    }

    const event = events.find(e => e.id === ticket.eventId);

    if (event?.closed) {
      return NextResponse.json({
        valid: false,
        message: 'This event has been closed',
        ticket,
        event
      });
    }

    // Only mark as used if not skipped (for check-in confirmation flow)
    if (!skipMarkAsUsed) {
      ticket.used = true;
    }

    return NextResponse.json({
      valid: true,
      message: skipMarkAsUsed ? 'Ticket is valid' : 'Ticket verified successfully',
      ticket,
      event
    });
  } catch (error) {
    console.error('Error verifying ticket:', error);
    return NextResponse.json(
      { error: 'Failed to verify ticket' },
      { status: 500 }
    );
  }
}