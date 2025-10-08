// // File: /app/dashboard/page.tsx (NEW)

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Navigation from '@/components/Navigation';
// import { formatCurrency, formatDate } from '@/lib/utils';

// type DashboardData = {
//   totalEvents: number;
//   totalTickets: number;
//   totalCheckedIn: number;
//   totalRevenue: number;
//   upcomingEvents: number;
//   closedEvents: number;
//   recentEvents: Array<{
//     id: string;
//     name: string;
//     date: string;
//     totalAttendees: number;
//     checkedIn: number;
//     revenue: number;
//     closed: boolean;
//   }>;
// };

// export default function DashboardPage() {
//   const [data, setData] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const response = await fetch('/api/dashboard');
//       const dashboardData = await response.json();
//       setData(dashboardData);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
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
//             <p className="text-gray-600 text-lg">Loading dashboard...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//         <Navigation />
//         <div className="flex items-center justify-center h-screen">
//           <div className="text-center">
//             <p className="text-gray-600 text-lg">Failed to load dashboard data</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const checkInRate = data.totalTickets > 0
//     ? ((data.totalCheckedIn / data.totalTickets) * 100).toFixed(1)
//     : '0';

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//       <Navigation />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header */}
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
//           <p className="text-gray-600 text-lg">Overview of your event ticketing system</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {/* Total Events */}
//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-4xl">🎉</div>
//               <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
//                 {data.upcomingEvents} upcoming
//               </div>
//             </div>
//             <div className="text-4xl font-bold mb-2">{data.totalEvents}</div>
//             <div className="text-blue-100 text-sm font-medium">Total Events</div>
//             <div className="mt-4 pt-4 border-t border-blue-400 text-sm">
//               <span className="text-blue-100">{data.closedEvents} closed</span>
//             </div>
//           </div>

//           {/* Total Tickets */}
//           <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-4xl">🎫</div>
//               <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
//                 Sales
//               </div>
//             </div>
//             <div className="text-4xl font-bold mb-2">{data.totalTickets}</div>
//             <div className="text-purple-100 text-sm font-medium">Tickets Sold</div>
//             <div className="mt-4 pt-4 border-t border-purple-400 text-sm">
//               <span className="text-purple-100">Across all events</span>
//             </div>
//           </div>

//           {/* Checked In */}
//           <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-4xl">✓</div>
//               <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
//                 {checkInRate}%
//               </div>
//             </div>
//             <div className="text-4xl font-bold mb-2">{data.totalCheckedIn}</div>
//             <div className="text-green-100 text-sm font-medium">Checked In</div>
//             <div className="mt-4 pt-4 border-t border-green-400 text-sm">
//               <span className="text-green-100">{data.totalTickets - data.totalCheckedIn} pending</span>
//             </div>
//           </div>

//           {/* Revenue */}
//           <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-4xl">💰</div>
//               <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
//                 Total
//               </div>
//             </div>
//             <div className="text-4xl font-bold mb-2">{formatCurrency(data.totalRevenue)}</div>
//             <div className="text-pink-100 text-sm font-medium">Total Revenue</div>
//             <div className="mt-4 pt-4 border-t border-pink-400 text-sm">
//               <span className="text-pink-100">From ticket sales</span>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <Link
//             href="/create-event"
//             className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-4xl">➕</div>
//               <div className="text-blue-600 group-hover:translate-x-1 transition-transform">→</div>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Create Event</h3>
//             <p className="text-gray-600 text-sm">Add a new event to the system</p>
//           </Link>

//           <Link
//             href="/attendees"
//             className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-4xl">👥</div>
//               <div className="text-purple-600 group-hover:translate-x-1 transition-transform">→</div>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Attendees</h3>
//             <p className="text-gray-600 text-sm">View and check in attendees</p>
//           </Link>

//           <Link
//             href="/verify"
//             className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-4xl">🔍</div>
//               <div className="text-green-600 group-hover:translate-x-1 transition-transform">→</div>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Tickets</h3>
//             <p className="text-gray-600 text-sm">Scan and verify ticket codes</p>
//           </Link>
//         </div>

//         {/* Recent Events Table */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6">
//             <h2 className="text-2xl font-bold text-white">Recent Events</h2>
//           </div>

//           {data.recentEvents.length === 0 ? (
//             <div className="p-12 text-center">
//               <div className="text-6xl mb-4">📅</div>
//               <p className="text-gray-600 text-lg mb-6">No events yet</p>
//               <Link
//                 href="/create-event"
//                 className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
//               >
//                 Create Your First Event
//               </Link>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-700">Event Name</th>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
//                     <th className="text-center py-4 px-6 font-semibold text-gray-700">Attendees</th>
//                     <th className="text-center py-4 px-6 font-semibold text-gray-700">Checked In</th>
//                     <th className="text-right py-4 px-6 font-semibold text-gray-700">Revenue</th>
//                     <th className="text-center py-4 px-6 font-semibold text-gray-700">Status</th>
//                     <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.recentEvents.map((event) => {
//                     const checkInPercentage = event.totalAttendees > 0
//                       ? ((event.checkedIn / event.totalAttendees) * 100).toFixed(0)
//                       : '0';

//                     return (
//                       <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
//                         <td className="py-4 px-6">
//                           <div className="font-semibold text-gray-900">{event.name}</div>
//                         </td>
//                         <td className="py-4 px-6 text-gray-600 text-sm">
//                           {formatDate(event.date)}
//                         </td>
//                         <td className="py-4 px-6 text-center">
//                           <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
//                             {event.totalAttendees}
//                           </span>
//                         </td>
//                         <td className="py-4 px-6 text-center">
//                           <div className="flex flex-col items-center">
//                             <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-1">
//                               {event.checkedIn}
//                             </span>
//                             <span className="text-xs text-gray-500">{checkInPercentage}%</span>
//                           </div>
//                         </td>
//                         <td className="py-4 px-6 text-right font-bold text-gray-900">
//                           {formatCurrency(event.revenue)}
//                         </td>
//                         <td className="py-4 px-6 text-center">
//                           {event.closed ? (
//                             <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
//                               Closed
//                             </span>
//                           ) : (
//                             <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
//                               Active
//                             </span>
//                           )}
//                         </td>
//                         <td className="py-4 px-6 text-center">
//                           <Link
//                             href={`/event-details/${event.id}`}
//                             className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline"
//                           >
//                             View Details →
//                           </Link>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {data.recentEvents.length > 0 && (
//             <div className="p-6 bg-gray-50 text-center">
//               <Link
//                 href="/events"
//                 className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
//               >
//                 View All Events →
//               </Link>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }























// File: /app/attendees/page.tsx (UPDATED)

// 'use client';

// import { useState, useEffect } from 'react';
// import Navigation from '@/components/Navigation';
// import VerificationModal from '@/components/VerificationModal';
// import { formatDateTime } from '@/lib/utils';
// import { Attendee } from '@/lib/types';

// type AttendeeWithEvent = Attendee & {
//   eventName: string;
//   eventDate: string;
// };

// export default function AttendeesPage() {
//   const [attendees, setAttendees] = useState<AttendeeWithEvent[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('pending');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [verificationModalOpen, setVerificationModalOpen] = useState(false);
//   const [selectedAttendee, setSelectedAttendee] = useState<AttendeeWithEvent | null>(null);

//   useEffect(() => {
//     fetchAttendees();
//   }, []);

//   const fetchAttendees = async () => {
//     try {
//       const response = await fetch('/api/attendees');
//       const data = await response.json();
//       setAttendees(data);
//     } catch (error) {
//       console.error('Error fetching attendees:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCheckInClick = (attendee: AttendeeWithEvent) => {
//     setSelectedAttendee(attendee);
//     setVerificationModalOpen(true);
//   };

//   const handleCheckIn = async (ticketCode: string) => {
//     try {
//       const response = await fetch('/api/attendees/checkin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ticketCode })
//       });

//       if (response.ok) {
//         // Refresh attendees list
//         await fetchAttendees();
//       }
//     } catch (error) {
//       console.error('Error checking in attendee:', error);
//     }
//   };

//   // Filter attendees based on tab
//   const filteredByTab = filter === 'all' 
//     ? attendees 
//     : filter === 'checked-in'
//     ? attendees.filter(a => a.checkedIn)
//     : attendees.filter(a => !a.checkedIn);

//   // Apply search filter
//   const filteredAttendees = searchQuery.trim()
//     ? filteredByTab.filter(a => 
//         a.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : filteredByTab;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//         <Navigation />
//         <div className="flex items-center justify-center h-screen">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600 text-lg">Loading attendees...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//       <Navigation />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Attendee Management</h1>
//           <p className="text-gray-600 text-lg">Manage ticket holders and check-ins</p>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-6">
//           <div className="relative">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search attendees by name..."
//               className="w-full px-6 py-4 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-lg"
//             />
//             <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
//               🔍
//             </div>
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Filter Tabs */}
//         <div className="flex gap-2 mb-6">
//           <button
//             onClick={() => setFilter('pending')}
//             className={`px-6 py-3 rounded-xl font-semibold transition-all ${
//               filter === 'pending'
//                 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
//                 : 'bg-white text-gray-700 hover:shadow-md'
//             }`}
//           >
//             Pending Check-in
//             {attendees.filter(a => !a.checkedIn).length > 0 && (
//               <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
//                 filter === 'pending' ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-800'
//               }`}>
//                 {attendees.filter(a => !a.checkedIn).length}
//               </span>
//             )}
//           </button>
//           <button
//             onClick={() => setFilter('checked-in')}
//             className={`px-6 py-3 rounded-xl font-semibold transition-all ${
//               filter === 'checked-in'
//                 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
//                 : 'bg-white text-gray-700 hover:shadow-md'
//             }`}
//           >
//             Checked In
//             {attendees.filter(a => a.checkedIn).length > 0 && (
//               <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
//                 filter === 'checked-in' ? 'bg-white text-blue-600' : 'bg-green-100 text-green-800'
//               }`}>
//                 {attendees.filter(a => a.checkedIn).length}
//               </span>
//             )}
//           </button>
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-6 py-3 rounded-xl font-semibold transition-all ${
//               filter === 'all'
//                 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
//                 : 'bg-white text-gray-700 hover:shadow-md'
//             }`}
//           >
//             All Attendees
//             {attendees.length > 0 && (
//               <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
//                 filter === 'all' ? 'bg-white text-blue-600' : 'bg-gray-100 text-gray-800'
//               }`}>
//                 {attendees.length}
//               </span>
//             )}
//           </button>
//         </div>

//         {/* Attendees List */}
//         {filteredAttendees.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//             <div className="text-6xl mb-4">
//               {searchQuery ? '🔍' : '👥'}
//             </div>
//             <p className="text-gray-600 text-xl">
//               {searchQuery 
//                 ? `No attendees found matching "${searchQuery}"`
//                 : 'No attendees found in this category'
//               }
//             </p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-700">Event</th>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-700">Purchase Date</th>
//                     <th className="text-center py-4 px-6 font-semibold text-gray-700">Status</th>
//                     {filter === 'pending' && (
//                       <th className="text-center py-4 px-6 font-semibold text-gray-700">Action</th>
//                     )}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredAttendees.map((attendee) => (
//                     <tr key={attendee.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
//                       <td className="py-4 px-6 font-medium text-gray-900">{attendee.name}</td>
//                       <td className="py-4 px-6 text-gray-600 text-sm">{attendee.email}</td>
//                       <td className="py-4 px-6 text-gray-700">{attendee.eventName}</td>
//                       <td className="py-4 px-6 text-gray-600 text-sm">
//                         {formatDateTime(attendee.purchaseDate)}
//                       </td>
//                       <td className="py-4 px-6 text-center">
//                         {attendee.checkedIn ? (
//                           <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
//                             ✓ Checked In
//                           </span>
//                         ) : (
//                           <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
//                             Pending
//                           </span>
//                         )}
//                       </td>
//                       {filter === 'pending' && (
//                         <td className="py-4 px-6 text-center">
//                           <button
//                             onClick={() => handleCheckInClick(attendee)}
//                             className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all transform hover:scale-105"
//                           >
//                             📷 Check In
//                           </button>
//                         </td>
//                       )}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Verification Modal */}
//       <VerificationModal
//         isOpen={verificationModalOpen}
//         onClose={() => {
//           setVerificationModalOpen(false);
//           setSelectedAttendee(null);
//         }}
//         onCheckIn={handleCheckIn}
//         attendeeName={selectedAttendee?.name}
//       />
//     </div>
//   );
// }

























// File: /app/dashboard/page.tsx (NEW)

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { formatCurrency, formatDate } from '@/lib/utils';

type DashboardData = {
  totalEvents: number;
  totalTickets: number;
  totalCheckedIn: number;
  totalRevenue: number;
  upcomingEvents: number;
  closedEvents: number;
  recentEvents: Array<{
    id: string;
    name: string;
    date: string;
    totalAttendees: number;
    checkedIn: number;
    revenue: number;
    closed: boolean;
  }>;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const dashboardData = await response.json();
      setData(dashboardData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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
            <p className="text-gray-600 text-lg">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Failed to load dashboard data</p>
          </div>
        </div>
      </div>
    );
  }

  const checkInRate = data.totalTickets > 0 
    ? ((data.totalCheckedIn / data.totalTickets) * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-lg">Overview of your event ticketing system</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Events */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">🎉</div>
              <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                {data.upcomingEvents} upcoming
              </div>
            </div>
            <div className="text-4xl font-bold mb-2">{data.totalEvents}</div>
            <div className="text-blue-100 text-sm font-medium">Total Events</div>
            <div className="mt-4 pt-4 border-t border-blue-400 text-sm">
              <span className="text-blue-100">{data.closedEvents} closed</span>
            </div>
          </div>

          {/* Total Tickets */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">🎫</div>
              <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                Sales
              </div>
            </div>
            <div className="text-4xl font-bold mb-2">{data.totalTickets}</div>
            <div className="text-purple-100 text-sm font-medium">Tickets Sold</div>
            <div className="mt-4 pt-4 border-t border-purple-400 text-sm">
              <span className="text-purple-100">Across all events</span>
            </div>
          </div>

          {/* Checked In */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">✓</div>
              <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                {checkInRate}%
              </div>
            </div>
            <div className="text-4xl font-bold mb-2">{data.totalCheckedIn}</div>
            <div className="text-green-100 text-sm font-medium">Checked In</div>
            <div className="mt-4 pt-4 border-t border-green-400 text-sm">
              <span className="text-green-100">{data.totalTickets - data.totalCheckedIn} pending</span>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">💰</div>
              <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                Total
              </div>
            </div>
            <div className="text-4xl font-bold mb-2">{formatCurrency(data.totalRevenue)}</div>
            <div className="text-pink-100 text-sm font-medium">Total Revenue</div>
            <div className="mt-4 pt-4 border-t border-pink-400 text-sm">
              <span className="text-pink-100">From ticket sales</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/create-event"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">➕</div>
              <div className="text-blue-600 group-hover:translate-x-1 transition-transform">→</div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Create Event</h3>
            <p className="text-gray-600 text-sm">Add a new event to the system</p>
          </Link>

          <Link
            href="/attendees"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">👥</div>
              <div className="text-purple-600 group-hover:translate-x-1 transition-transform">→</div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Attendees</h3>
            <p className="text-gray-600 text-sm">View and check in attendees</p>
          </Link>

          <Link
            href="/verify"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">🔍</div>
              <div className="text-green-600 group-hover:translate-x-1 transition-transform">→</div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Tickets</h3>
            <p className="text-gray-600 text-sm">Scan and verify ticket codes</p>
          </Link>
        </div>

        {/* Recent Events Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6">
            <h2 className="text-2xl font-bold text-white">Recent Events</h2>
          </div>

          {data.recentEvents.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-600 text-lg mb-6">No events yet</p>
              <Link
                href="/create-event"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                Create Your First Event
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Event Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">Attendees</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">Checked In</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">Revenue</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">Status</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentEvents.map((event) => {
                    const checkInPercentage = event.totalAttendees > 0
                      ? ((event.checkedIn / event.totalAttendees) * 100).toFixed(0)
                      : '0';

                    return (
                      <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-4 px-6">
                          <div className="font-semibold text-gray-900">{event.name}</div>
                        </td>
                        <td className="py-4 px-6 text-gray-600 text-sm">
                          {formatDate(event.date)}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {event.totalAttendees}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex flex-col items-center">
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-1">
                              {event.checkedIn}
                            </span>
                            <span className="text-xs text-gray-500">{checkInPercentage}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-gray-900">
                          {formatCurrency(event.revenue)}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {event.closed ? (
                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                              Closed
                            </span>
                          ) : (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Link
                            href={`/event-details/${event.id}`}
                            className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline"
                          >
                            View Details →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {data.recentEvents.length > 0 && (
            <div className="p-6 bg-gray-50 text-center">
              <Link
                href="/events"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                View All Events →
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}