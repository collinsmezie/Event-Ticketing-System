// File: /app/api/tickets/[code]/route.ts

import { NextResponse } from 'next/server';
import { tickets, events } from '@/lib/data';
import { generateQRCode } from '@/lib/utils';

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  const ticket = tickets.find(t => t.code === code);
  
  if (!ticket) {
    return NextResponse.json(
      { error: 'Ticket not found' },
      { status: 404 }
    );
  }

  const event = events.find(e => e.id === ticket.eventId);
  
  if (!event) {
    return NextResponse.json(
      { error: 'Event not found' },
      { status: 404 }
    );
  }

  const qrCode = await generateQRCode(ticket.code);

  return NextResponse.json({
    ticket,
    event,
    qrCode
  });
}