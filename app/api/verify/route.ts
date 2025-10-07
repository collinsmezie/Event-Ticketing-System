// File: /app/api/verify/route.ts

import { NextResponse } from 'next/server';
import { tickets, events } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

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

    ticket.used = true;

    const event = events.find(e => e.id === ticket.eventId);

    return NextResponse.json({
      valid: true,
      message: 'Ticket verified successfully',
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