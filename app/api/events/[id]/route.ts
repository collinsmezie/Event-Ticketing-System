// File: /app/api/events/[id]/route.ts (NEW)

import { NextResponse } from 'next/server';
import { events, attendees } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  const event = events.find(e => e.id === resolvedParams.id);
  
  if (!event) {
    return NextResponse.json(
      { error: 'Event not found' },
      { status: 404 }
    );
  }

  const eventAttendees = attendees.filter(a => a.eventId === resolvedParams.id);
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