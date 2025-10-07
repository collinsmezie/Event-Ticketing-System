// // File: /app/api/events/route.ts

// import { NextResponse } from 'next/server';
// import { events } from '@/lib/data';

// export async function GET() {
//   return NextResponse.json(events);
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const newEvent = {
//       id: String(events.length + 1),
//       ...body
//     };
//     events.push(newEvent);
//     return NextResponse.json(newEvent, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to create event' },
//       { status: 500 }
//     );
//   }
// }




// File: /app/api/events/route.ts (UPDATED)

import { NextResponse } from 'next/server';
import { events } from '@/lib/data';

export async function GET() {
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, location, date, price, bannerUrl } = body;

    // Validation
    if (!name || !description || !location || !date || !price) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (price <= 0) {
      return NextResponse.json(
        { error: 'Price must be greater than 0' },
        { status: 400 }
      );
    }

    const newEvent = {
      id: String(events.length + 1),
      name,
      description,
      location,
      date,
      price: Number(price),
      bannerUrl: bannerUrl || '/default-event.jpg'
    };

    events.push(newEvent);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}