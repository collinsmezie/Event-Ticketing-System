// File: /app/api/attendees/route.ts (NEW)

import { NextResponse } from 'next/server';
import { attendees, events } from '@/lib/data';

export async function GET() {
  const attendeesWithEvents = attendees.map(attendee => {
    const event = events.find(e => e.id === attendee.eventId);
    return {
      ...attendee,
      eventName: event?.name || 'Unknown Event',
      eventDate: event?.date || '',
    };
  });

  return NextResponse.json(attendeesWithEvents);
}