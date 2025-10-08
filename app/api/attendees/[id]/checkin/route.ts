// File: /app/api/attendees/[id]/checkin/route.ts (NEW)

import { NextRequest, NextResponse } from 'next/server';
import { attendees } from '@/lib/data';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  try {
    const attendee = attendees.find(a => a.id === resolvedParams.id);

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