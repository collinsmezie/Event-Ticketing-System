// File: /app/api/events/[id]/route.ts (NEW)

import { NextResponse } from 'next/server';
import { events, attendees } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const event = events.find(e => e.id === params.id);
  
  if (!event) {
    return NextResponse.json(
      { error: 'Event not found' },
      { status: 404 }
    );
  }

  const eventAttendees = attendees.filter(a => a.eventId === params.id);
  const checkedIn = eventAttendees.filter(a => a.checkedIn).length;

  return NextResponse.json({
    event,
    stats: {
      totalAttendees: eventAttendees.length,
      checkedIn,
      pending: eventAttendees.length - checkedIn
    }
  });
}