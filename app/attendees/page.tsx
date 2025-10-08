// // File: /app/attendees/page.tsx (NEW)

// 'use client';

// import { useState, useEffect } from 'react';
// import Navigation from '@/components/Navigation';
// import { formatDateTime, formatCurrency } from '@/lib/utils';
// import { Attendee } from '@/lib/types';

// type AttendeeWithEvent = Attendee & {
//   eventName: string;
//   eventDate: string;
// };

// type Stats = {
//   totalEvents: number;
//   totalTickets: number;
//   totalCheckedIn: number;
//   totalRevenue: number;
//   eventStats: Array<{
//     eventId: string;
//     eventName: string;
//     totalTickets: number;
//     checkedIn: number;
//     revenue: number;
//   }>;
// };

// export default function AttendeesPage() {
//   const [attendees, setAttendees] = useState<AttendeeWithEvent[]>([]);
//   const [stats, setStats] = useState<Stats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [attendeesRes, statsRes] = await Promise.all([
//         fetch('/api/attendees'),
//         fetch('/api/stats')
//       ]);
//       const attendeesData = await attendeesRes.json();
//       const statsData = await statsRes.json();
//       setAttendees(attendeesData);
//       setStats(statsData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCheckIn = async (attendeeId: string) => {
//     try {
//       await fetch(`/api/attendees/${attendeeId}/checkin`, {
//         method: 'POST'
//       });
//       fetchData();
//     } catch (error) {
//       console.error('Error updating check-in:', error);
//     }
//   };

//   const filteredAttendees = filter === 'all' 
//     ? attendees 
//     : filter === 'checked-in'
//     ? attendees.filter(a => a.checkedIn)
//     : attendees.filter(a => !a.checkedIn);

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
//           <p className="text-gray-600 text-lg">Track ticket sales and check-ins</p>
//         </div>

//         {/* Stats Summary */}
//         {stats && (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
//               <div className="text-3xl mb-2">🎉</div>
//               <div className="text-3xl font-bold mb-1">{stats.totalEvents}</div>
//               <div className="text-blue-100">Total Events</div>
//             </div>
//             <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
//               <div className="text-3xl mb-2">🎫</div>
//               <div className="text-3xl font-bold mb-1">{stats.totalTickets}</div>
//               <div className="text-purple-100">Tickets Sold</div>
//             </div>
//             <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
//               <div className="text-3xl mb-2">✓</div>
//               <div className="text-3xl font-bold mb-1">{stats.totalCheckedIn}</div>
//               <div className="text-green-100">Checked In</div>
//             </div>
//             <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
//               <div className="text-3xl mb-2">💰</div>
//               <div className="text-3xl font-bold mb-1">{formatCurrency(stats.totalRevenue)}</div>
//               <div className="text-pink-100">Total Revenue</div>
//             </div>
//           </div>
//         )}

//         {/* Event Stats */}
//         {stats && stats.eventStats.length > 0 && (
//           <div className="bg-white rounded-2xl shadow-md p-6 mb-12">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Statistics</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b-2 border-gray-200">
//                     <th className="text-left py-3 px-4 font-semibold text-gray-700">Event Name</th>
//                     <th className="text-center py-3 px-4 font-semibold text-gray-700">Tickets Sold</th>
//                     <th className="text-center py-3 px-4 font-semibold text-gray-700">Checked In</th>
//                     <th className="text-right py-3 px-4 font-semibold text-gray-700">Revenue</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {stats.eventStats.map((stat) => (
//                     <tr key={stat.eventId} className="border-b border-gray-100 hover:bg-gray-50">
//                       <td className="py-4 px-4 font-medium text-gray-900">{stat.eventName}</td>
//                       <td className="py-4 px-4 text-center">
//                         <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
//                           {stat.totalTickets}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4 text-center">
//                         <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
//                           {stat.checkedIn}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4 text-right font-bold text-gray-900">
//                         {formatCurrency(stat.revenue)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Filter Buttons */}
//         <div className="flex gap-2 mb-6">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-4 py-2 rounded-xl font-medium transition-all ${
//               filter === 'all'
//                 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
//                 : 'bg-white text-gray-700 hover:shadow-md'
//             }`}
//           >
//             All Attendees
//           </button>
//           <button
//             onClick={() => setFilter('checked-in')}
//             className={`px-4 py-2 rounded-xl font-medium transition-all ${
//               filter === 'checked-in'
//                 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
//                 : 'bg-white text-gray-700 hover:shadow-md'
//             }`}
//           >
//             Checked In
//           </button>
//           <button
//             onClick={() => setFilter('pending')}
//             className={`px-4 py-2 rounded-xl font-medium transition-all ${
//               filter === 'pending'
//                 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
//                 : 'bg-white text-gray-700 hover:shadow-md'
//             }`}
//           >
//             Pending Check-in
//           </button>
//         </div>

//         {/* Attendees List */}
//         {filteredAttendees.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-md p-12 text-center">
//             <div className="text-6xl mb-4">👥</div>
//             <p className="text-gray-600 text-xl">No attendees found</p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-700">Event</th>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-700">Purchase Date</th>
//                     <th className="text-center py-4 px-6 font-semibold text-gray-700">Status</th>
//                     <th className="text-center py-4 px-6 font-semibold text-gray-700">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredAttendees.map((attendee) => (
//                     <tr key={attendee.id} className="border-b border-gray-100 hover:bg-gray-50">
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
//                       <td className="py-4 px-6 text-center">
//                         <button
//                           onClick={() => handleCheckIn(attendee.id)}
//                           className={`px-4 py-2 rounded-lg font-medium transition-all ${
//                             attendee.checkedIn
//                               ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                               : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
//                           }`}
//                         >
//                           {attendee.checkedIn ? 'Undo' : 'Check In'}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
















// File: /app/attendees/page.tsx (UPDATED)

'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import VerificationModal from '@/components/VerificationModal';
import { formatDateTime } from '@/lib/utils';
import { Attendee } from '@/lib/types';

type AttendeeWithEvent = Attendee & {
  eventName: string;
  eventDate: string;
};

export default function AttendeesPage() {
  const [attendees, setAttendees] = useState<AttendeeWithEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<AttendeeWithEvent | null>(null);

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await fetch('/api/attendees');
      const data = await response.json();
      setAttendees(data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckInClick = (attendee: AttendeeWithEvent) => {
    setSelectedAttendee(attendee);
    setVerificationModalOpen(true);
  };

  const handleCheckIn = async (ticketCode: string) => {
    try {
      const response = await fetch('/api/attendees/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketCode })
      });

      if (response.ok) {
        // Refresh attendees list
        await fetchAttendees();
      }
    } catch (error) {
      console.error('Error checking in attendee:', error);
    }
  };

  // Filter attendees based on tab
  const filteredByTab = filter === 'all' 
    ? attendees 
    : filter === 'checked-in'
    ? attendees.filter(a => a.checkedIn)
    : attendees.filter(a => !a.checkedIn);

  // Apply search filter
  const filteredAttendees = searchQuery.trim()
    ? filteredByTab.filter(a => 
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredByTab;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading attendees...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Attendee Management</h1>
          <p className="text-gray-600 text-lg">Manage ticket holders and check-ins</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search attendees by name..."
              className="w-full px-6 py-4 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-lg"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('pending')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'pending'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            Pending Check-in
            {attendees.filter(a => !a.checkedIn).length > 0 && (
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                filter === 'pending' ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-800'
              }`}>
                {attendees.filter(a => !a.checkedIn).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter('checked-in')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'checked-in'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            Checked In
            {attendees.filter(a => a.checkedIn).length > 0 && (
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                filter === 'checked-in' ? 'bg-white text-blue-600' : 'bg-green-100 text-green-800'
              }`}>
                {attendees.filter(a => a.checkedIn).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            All Attendees
            {attendees.length > 0 && (
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                filter === 'all' ? 'bg-white text-blue-600' : 'bg-gray-100 text-gray-800'
              }`}>
                {attendees.length}
              </span>
            )}
          </button>
        </div>

        {/* Attendees List */}
        {filteredAttendees.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">
              {searchQuery ? '🔍' : '👥'}
            </div>
            <p className="text-gray-600 text-xl">
              {searchQuery 
                ? `No attendees found matching "${searchQuery}"`
                : 'No attendees found in this category'
              }
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Event</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Purchase Date</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">Status</th>
                    {filter === 'pending' && (
                      <th className="text-center py-4 px-6 font-semibold text-gray-700">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendees.map((attendee) => (
                    <tr key={attendee.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-6 font-medium text-gray-900">{attendee.name}</td>
                      <td className="py-4 px-6 text-gray-600 text-sm">{attendee.email}</td>
                      <td className="py-4 px-6 text-gray-700">{attendee.eventName}</td>
                      <td className="py-4 px-6 text-gray-600 text-sm">
                        {formatDateTime(attendee.purchaseDate)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {attendee.checkedIn ? (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            ✓ Checked In
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Pending
                          </span>
                        )}
                      </td>
                      {filter === 'pending' && (
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => handleCheckInClick(attendee)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all transform hover:scale-105"
                          >
                            📷 Check In
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={verificationModalOpen}
        onClose={() => {
          setVerificationModalOpen(false);
          setSelectedAttendee(null);
        }}
        onCheckIn={handleCheckIn}
        attendeeName={selectedAttendee?.name}
      />
    </div>
  );
}