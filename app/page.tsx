// // File: /app/page.tsx

// import Link from 'next/link';
// import { events } from '@/lib/data';
// import { formatDate, formatCurrency } from '@/lib/utils';

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-slate-900 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold">Trade Fair Tickets</h1>
//             <Link 
//               href="/verify" 
//               className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
//             >
//               Verify Ticket
//             </Link>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-slate-900 mb-4">
//             Upcoming Trade Fairs
//           </h2>
//           <p className="text-lg text-gray-600">
//             Browse and purchase tickets for upcoming trade fair events
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {events.map((event) => (
//             <div 
//               key={event.id} 
//               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
//             >
//               <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
//                 <div className="text-white text-center p-6">
//                   <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <p className="text-gray-600 mb-4 line-clamp-2">
//                   {event.description}
//                 </p>
                
//                 <div className="space-y-2 mb-4">
//                   <div className="flex items-center text-sm text-gray-700">
//                     <span className="font-semibold mr-2">📍</span>
//                     {event.location}
//                   </div>
//                   <div className="flex items-center text-sm text-gray-700">
//                     <span className="font-semibold mr-2">📅</span>
//                     {formatDate(event.date)}
//                   </div>
//                   <div className="flex items-center text-sm text-gray-700">
//                     <span className="font-semibold mr-2">💰</span>
//                     {formatCurrency(event.price)}
//                   </div>
//                 </div>

//                 <Link 
//                   href={`/event/${event.id}`}
//                   className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-lg font-semibold transition"
//                 >
//                   View Event & Buy Ticket
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       <footer className="bg-slate-900 text-white mt-20 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <p>&copy; 2025 Trade Fair Ticketing System. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

























// File: /app/page.tsx (UPDATED)

// import Link from 'next/link';
// import { events } from '@/lib/data';
// import { formatDate, formatCurrency } from '@/lib/utils';

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-slate-900 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold">R E C U D</h1>
//             <div className="flex gap-4">
//               <Link 
//                 href="/create-event" 
//                 className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
//               >
//                 Create Event
//               </Link>
//               <Link 
//                 href="/verify" 
//                 className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
//               >
//                 Verify Ticket
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-slate-900 mb-4">
//             Latest Upcoming Events
//           </h2>
//           <p className="text-lg text-gray-600 mb-6">
//             Browse and purchase tickets for upcoming events
//           </p>
//           <Link 
//             href="/create-event"
//             className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
//           >
//             + Create New Event
//           </Link>
//         </div>

//         {events.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg mb-6">No events available yet.</p>
//             <Link 
//               href="/create-event"
//               className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
//             >
//               Create Your First Event
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {events.map((event) => (
//               <div 
//                 key={event.id} 
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
//               >
//                 <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
//                   <div className="text-white text-center p-6">
//                     <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   <p className="text-gray-600 mb-4 line-clamp-2">
//                     {event.description}
//                   </p>
                  
//                   <div className="space-y-2 mb-4">
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-semibold mr-2">📍</span>
//                       {event.location}
//                     </div>
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-semibold mr-2">📅</span>
//                       {formatDate(event.date)}
//                     </div>
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-semibold mr-2">💰</span>
//                       {formatCurrency(event.price)}
//                     </div>
//                   </div>

//                   <Link 
//                     href={`/event/${event.id}`}
//                     className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-lg font-semibold transition"
//                   >
//                     View Event & Buy Ticket
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       <footer className="bg-slate-900 text-white mt-20 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <p>&copy; 2025 RECUD Event Ticketing System. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }




















// File: /app/page.tsx (UPDATED)

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { formatDate, formatCurrency } from '@/lib/utils';
// import { Event } from '@/lib/types';

// export default function HomePage() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch('/api/events');
//       const data = await response.json();
//       setEvents(data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading events...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-slate-900 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold">Trade Fair Tickets</h1>
//             <div className="flex gap-4">
//               <Link 
//                 href="/create-event" 
//                 className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
//               >
//                 Create Event
//               </Link>
//               <Link 
//                 href="/verify" 
//                 className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
//               >
//                 Verify Ticket
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-slate-900 mb-4">
//             Upcoming Trade Fairs
//           </h2>
//           <p className="text-lg text-gray-600 mb-6">
//             Browse and purchase tickets for upcoming trade fair events
//           </p>
//           <Link 
//             href="/create-event"
//             className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
//           >
//             + Create New Event
//           </Link>
//         </div>

//         {events.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg mb-6">No events available yet.</p>
//             <Link 
//               href="/create-event"
//               className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
//             >
//               Create Your First Event
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {events.map((event) => (
//               <div 
//                 key={event.id} 
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
//               >
//                 <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
//                   <div className="text-white text-center p-6">
//                     <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   <p className="text-gray-600 mb-4 line-clamp-2">
//                     {event.description}
//                   </p>
                  
//                   <div className="space-y-2 mb-4">
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-semibold mr-2">📍</span>
//                       {event.location}
//                     </div>
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-semibold mr-2">📅</span>
//                       {formatDate(event.date)}
//                     </div>
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-semibold mr-2">💰</span>
//                       {formatCurrency(event.price)}
//                     </div>
//                   </div>

//                   <Link 
//                     href={`/event/${event.id}`}
//                     className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-lg font-semibold transition"
//                   >
//                     View Event & Buy Ticket
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       <footer className="bg-slate-900 text-white mt-20 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <p>&copy; 2025 Trade Fair Ticketing System. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }
















// File: /app/page.tsx (UPDATED)

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Navigation from '@/components/Navigation';
// import { formatDate, formatCurrency, getCategoryColor } from '@/lib/utils';
// import { Event } from '@/lib/types';

// export default function HomePage() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch('/api/events');
//       const data = await response.json();
//       setEvents(data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//         <Navigation />
//         <div className="flex items-center justify-center h-screen">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600 text-lg">Loading events...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//       <Navigation />

//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
//             Discover Amazing Events
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 text-blue-100">
//             Book tickets for concerts, conferences, workshops, and more
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link 
//               href="/events"
//               className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
//             >
//               Browse Events
//             </Link>
//             <Link 
//               href="/create-event"
//               className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
//             >
//               Create Event
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Featured Events */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex justify-between items-center mb-12">
//           <div>
//             <h2 className="text-4xl font-bold text-gray-900 mb-2">
//               Upcoming Events
//             </h2>
//             <p className="text-gray-600 text-lg">
//               Find the perfect event for you
//             </p>
//           </div>
//           <Link 
//             href="/events"
//             className="hidden md:block text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline"
//           >
//             View All →
//           </Link>
//         </div>

//         {events.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
//             <div className="text-6xl mb-6">🎫</div>
//             <p className="text-gray-600 text-xl mb-8">No events available yet.</p>
//             <Link 
//               href="/create-event"
//               className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
//             >
//               Create Your First Event
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {events.slice(0, 6).map((event) => (
//               <Link 
//                 key={event.id}
//                 href={`/event/${event.id}`}
//                 className="group"
//               >
//                 <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300">
//                   <div className="relative h-56 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
//                     <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
//                     <div className="relative z-10 h-full flex items-center justify-center p-6">
//                       <h3 className="text-2xl font-bold text-white text-center line-clamp-2">
//                         {event.name}
//                       </h3>
//                     </div>
//                     {event.category && (
//                       <div className="absolute top-4 right-4 z-20">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
//                           {event.category}
//                         </span>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="p-6">
//                     <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
//                       {event.description}
//                     </p>
                    
//                     <div className="space-y-2 mb-6">
//                       <div className="flex items-center text-sm text-gray-700">
//                         <span className="mr-2 text-lg">📍</span>
//                         <span className="line-clamp-1">{event.location}</span>
//                       </div>
//                       <div className="flex items-center text-sm text-gray-700">
//                         <span className="mr-2 text-lg">📅</span>
//                         <span>{formatDate(event.date)}</span>
//                       </div>
//                       <div className="flex items-center text-sm font-bold text-blue-600">
//                         <span className="mr-2 text-lg">💰</span>
//                         <span>{formatCurrency(event.price)}</span>
//                       </div>
//                     </div>

//                     <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold group-hover:shadow-lg transition-all">
//                       View Details
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}

//         {events.length > 6 && (
//           <div className="text-center mt-12">
//             <Link 
//               href="/events"
//               className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
//             >
//               View All Events
//             </Link>
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white mt-20 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">EventTickets</h3>
//               <p className="text-gray-400">Your gateway to unforgettable experiences</p>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Quick Links</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><Link href="/events" className="hover:text-white transition">Browse Events</Link></li>
//                 <li><Link href="/create-event" className="hover:text-white transition">Create Event</Link></li>
//                 <li><Link href="/verify" className="hover:text-white transition">Verify Ticket</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Contact</h4>
//               <p className="text-gray-400">support@eventtickets.com</p>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
//             <p>&copy; 2025 EventTickets. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }




























// File: /app/page.tsx (UPDATED - add dashboard link)

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { formatDate, formatCurrency, getCategoryColor } from '@/lib/utils';
import { Event } from '@/lib/types';

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data.filter((e: Event) => !e.closed));
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Discover Amazing Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Book tickets for concerts, conferences, workshops, and more
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/events"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Browse Events
            </Link>
            <Link 
              href="/dashboard"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Events */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Upcoming Events
            </h2>
            <p className="text-gray-600 text-lg">
              Find the perfect event for you
            </p>
          </div>
          <Link 
            href="/events"
            className="hidden md:block text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline"
          >
            View All →
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-6">🎫</div>
            <p className="text-gray-600 text-xl mb-8">No events available yet.</p>
            <Link 
              href="/create-event"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 6).map((event) => (
              <Link 
                key={event.id}
                href={`/event/${event.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300">
                  <div className="relative h-56 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                    <div className="relative z-10 h-full flex items-center justify-center p-6">
                      <h3 className="text-2xl font-bold text-white text-center line-clamp-2">
                        {event.name}
                      </h3>
                    </div>
                    {event.category && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="mr-2 text-lg">📍</span>
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="mr-2 text-lg">📅</span>
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-sm font-bold text-blue-600">
                        <span className="mr-2 text-lg">💰</span>
                        <span>{formatCurrency(event.price)}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold group-hover:shadow-lg transition-all">
                      View Details
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {events.length > 6 && (
          <div className="text-center mt-12">
            <Link 
              href="/events"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              View All Events
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EventTickets</h3>
              <p className="text-gray-400">Your gateway to unforgettable experiences</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/events" className="hover:text-white transition">Browse Events</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
                <li><Link href="/create-event" className="hover:text-white transition">Create Event</Link></li>
                <li><Link href="/verify" className="hover:text-white transition">Verify Ticket</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">support@eventtickets.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EventTickets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}