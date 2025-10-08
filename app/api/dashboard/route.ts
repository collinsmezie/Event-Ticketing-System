// File: /app/api/dashboard/route.ts (NEW)

import { NextResponse } from 'next/server';
import { events, attendees } from '@/lib/data';

export async function GET() {
  const now = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) > now && !e.closed);
  const closedEvents = events.filter(e => e.closed);
  
  const totalCheckedIn = attendees.filter(a => a.checkedIn).length;
  const totalRevenue = attendees.reduce((sum, attendee) => {
    const event = events.find(e => e.id === attendee.eventId);
    return sum + (event?.price || 0);
  }, 0);

  const recentEvents = events
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map(event => {
      const eventAttendees = attendees.filter(a => a.eventId === event.id);
      return {
        id: event.id,
        name: event.name,
        date: event.date,
        totalAttendees: eventAttendees.length,
        checkedIn: eventAttendees.filter(a => a.checkedIn).length,
        revenue: eventAttendees.length * event.price,
        closed: event.closed || false
      };
    });

  return NextResponse.json({
    totalEvents: events.length,
    totalTickets: attendees.length,
    totalCheckedIn,
    totalRevenue,
    upcomingEvents: upcomingEvents.length,
    closedEvents: closedEvents.length,
    recentEvents
  });
}