// File: /app/api/events/[id]/close/route.ts (NEW)

import { NextResponse } from 'next/server';
import { events, attendees } from '@/lib/data';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = events.find(e => e.id === params.id);
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    if (event.closed) {
      return NextResponse.json(
        { error: 'Event is already closed' },
        { status: 400 }
      );
    }

    // Mark event as closed
    event.closed = true;
    event.closedAt = new Date().toISOString();

    // Get final stats
    const eventAttendees = attendees.filter(a => a.eventId === params.id);
    const checkedIn = eventAttendees.filter(a => a.checkedIn).length;

    return NextResponse.json({
      success: true,
      event,
      summary: {
        totalAttendees: eventAttendees.length,
        checkedIn,
        pending: eventAttendees.length - checkedIn,
        revenue: eventAttendees.length * event.price
      }
    });
  } catch (error) {
    console.error('Error closing event:', error);
    return NextResponse.json(
      { error: 'Failed to close event' },
      { status: 500 }
    );
  }
}