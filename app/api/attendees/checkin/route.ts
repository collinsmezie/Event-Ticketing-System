// File: /app/api/attendees/checkin/route.ts (NEW)

import { NextRequest, NextResponse } from 'next/server';
import { attendees, tickets } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticketCode } = body;

    if (!ticketCode) {
      return NextResponse.json(
        { error: 'Ticket code is required' },
        { status: 400 }
      );
    }

    const ticket = tickets.find(t => t.code === ticketCode);
    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    const attendee = attendees.find(a => a.ticketId === ticketCode);
    if (!attendee) {
      return NextResponse.json(
        { error: 'Attendee not found' },
        { status: 404 }
      );
    }

    // Mark ticket as used and attendee as checked in
    ticket.used = true;
    attendee.checkedIn = true;

    return NextResponse.json({
      success: true,
      attendee,
      ticket
    });
  } catch (error) {
    console.error('Error checking in attendee:', error);
    return NextResponse.json(
      { error: 'Failed to check in attendee' },
      { status: 500 }
    );
  }
}