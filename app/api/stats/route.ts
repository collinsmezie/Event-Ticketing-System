// File: /app/api/stats/route.ts (NEW)

import { NextResponse } from 'next/server';
import { attendees, events } from '@/lib/data';
import { EventStats } from '@/lib/types';

export async function GET() {
  const stats: EventStats[] = events.map(event => {
    const eventAttendees = attendees.filter(a => a.eventId === event.id);
    const checkedInCount = eventAttendees.filter(a => a.checkedIn).length;
    
    return {
      eventId: event.id,
      eventName: event.name,
      totalTickets: eventAttendees.length,
      checkedIn: checkedInCount,
      revenue: eventAttendees.length * event.price
    };
  });

  const totalStats = {
    totalEvents: events.length,
    totalTickets: attendees.length,
    totalCheckedIn: attendees.filter(a => a.checkedIn).length,
    totalRevenue: stats.reduce((sum, stat) => sum + stat.revenue, 0),
    eventStats: stats
  };

  return NextResponse.json(totalStats);
}