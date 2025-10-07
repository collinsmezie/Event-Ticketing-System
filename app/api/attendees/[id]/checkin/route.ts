// File: /app/api/attendees/[id]/checkin/route.ts (NEW)

import { NextResponse } from 'next/server';
import { attendees } from '@/lib/data';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const attendee = attendees.find(a => a.id === params.id);

    if (!attendee) {
      return NextResponse.json(
        { error: 'Attendee not found' },
        { status: 404 }
      );
    }

    attendee.checkedIn = !attendee.checkedIn;

    return NextResponse.json(attendee);
  } catch (error) {
    console.error('Error updating check-in status:', error);
    return NextResponse.json(
      { error: 'Failed to update check-in status' },
      { status: 500 }
    );
  }
}