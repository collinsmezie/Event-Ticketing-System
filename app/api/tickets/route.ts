// // File: /app/api/tickets/route.ts

// import { NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';
// import { tickets, events } from '@/lib/data';
// import { generateQRCode } from '@/lib/utils';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { eventId, buyerName, buyerEmail } = body;

//     if (!eventId || !buyerName || !buyerEmail) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     const event = events.find(e => e.id === eventId);
//     if (!event) {
//       return NextResponse.json(
//         { error: 'Event not found' },
//         { status: 404 }
//       );
//     }

//     const ticketCode = uuidv4();
//     const qrCodeDataUrl = await generateQRCode(ticketCode);

//     const newTicket = {
//       code: ticketCode,
//       eventId,
//       buyerName,
//       buyerEmail,
//       used: false,
//       purchasedAt: new Date().toISOString()
//     };

//     tickets.push(newTicket);

//     return NextResponse.json({
//       ticket: newTicket,
//       qrCode: qrCodeDataUrl
//     }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating ticket:', error);
//     return NextResponse.json(
//       { error: 'Failed to create ticket' },
//       { status: 500 }
//     );
//   }
// }
















// File: /app/api/tickets/route.ts (UPDATED)

import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { tickets, events, attendees } from '@/lib/data';
import { generateQRCode } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, buyerName, buyerEmail } = body;

    if (!eventId || !buyerName || !buyerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const event = events.find(e => e.id === eventId);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    const ticketCode = uuidv4();
    const qrCodeDataUrl = await generateQRCode(ticketCode);
    const purchaseDate = new Date().toISOString();

    const newTicket = {
      code: ticketCode,
      eventId,
      buyerName,
      buyerEmail,
      used: false,
      purchasedAt: purchaseDate
    };

    tickets.push(newTicket);

    // Create attendee record
    const newAttendee = {
      id: uuidv4(),
      name: buyerName,
      email: buyerEmail,
      ticketId: ticketCode,
      eventId,
      purchaseDate,
      checkedIn: false
    };

    attendees.push(newAttendee);

    return NextResponse.json({
      ticket: newTicket,
      qrCode: qrCodeDataUrl
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}