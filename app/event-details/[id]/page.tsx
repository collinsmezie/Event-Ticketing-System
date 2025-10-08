'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { formatDate, formatCurrency, getCategoryColor } from '@/lib/utils';
import { Event } from '@/lib/types';

type EventDetails = {
  event: Event;
  stats: {
    totalAttendees: number;
    checkedIn: number;
    pending: number;
  };
};

type CloseSummary = {
  totalAttendees: number;
  checkedIn: number;
  pending: number;
  revenue: number;
};

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [data, setData] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [closing, setClosing] = useState(false);
  const [closeSummary, setCloseSummary] = useState<CloseSummary | null>(null);

  const fetchEventDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/events/${params.id}`);
      if (response.ok) {
        const eventData = await response.json();
        setData(eventData);
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  const handleCloseEvent = async () => {
    setClosing(true);

    try {
      const response = await fetch(`/api/events/${params.id}/close`, {
        method: 'POST'
      });

      if (response.ok) {
        const result = await response.json();
        setCloseSummary(result.summary);
        setShowCloseConfirmation(false);
        await fetchEventDetails();
      }
    } catch (error) {
      console.error('Error closing event:', error);
      alert('Failed to close event. Please try again.');
    } finally {
      setClosing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading event details...</p>
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
            <div className="text-6xl mb-6">❌</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h2>
            <Link href="/dashboard" className="text-blue-600 hover:underline text-lg">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { event, stats } = data;
  const checkInRate = stats.totalAttendees > 0 
    ? ((stats.checkedIn / stats.totalAttendees) * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          href="/dashboard" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-6 hover:underline"
        >
          ← Back to Dashboard
        </Link>

        {/* Event Header */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="relative h-80 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                {event.category && (
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                )}
                {event.closed && (
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-800 text-white">
                    🔒 Closed
                  </span>
                )}
              </div>
              <h1 className="text-5xl font-bold mb-4 text-center">{event.name}</h1>
              <div className="flex items-center gap-6 text-lg">
                <span className="flex items-center">
                  <span className="mr-2">📍</span>
                  {event.location}
                </span>
                <span className="flex items-center">
                  <span className="mr-2">📅</span>
                  {formatDate(event.date)}
                </span>
                <span className="flex items-center">
                  <span className="mr-2">💰</span>
                  {formatCurrency(event.price)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {event.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/event/${event.id}`}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                📋 View Public Page
              </Link>
              <Link
                href={`/attendees`}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                👥 View Attendees
              </Link>
              {!event.closed && (
                <button
                  onClick={() => setShowCloseConfirmation(true)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
                >
                  🔒 Close Event
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl">🎫</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalAttendees}
            </div>
            <div className="text-gray-600 text-sm">Tickets Sold</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl">✓</div>
              <div className="text-sm text-gray-500">{checkInRate}%</div>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {stats.checkedIn}
            </div>
            <div className="text-gray-600 text-sm">Checked In</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl">⏳</div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {stats.pending}
            </div>
            <div className="text-gray-600 text-sm">Not Checked In</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl">💰</div>
              <div className="text-sm text-gray-500">Revenue</div>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {formatCurrency(stats.totalAttendees * event.price)}
            </div>
            <div className="text-gray-600 text-sm">Total Sales</div>
          </div>
        </div>

        {/* Check-in Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Check-in Progress</h3>
          <div className="relative">
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 flex items-center justify-end pr-4"
                style={{ width: `${checkInRate}%` }}
              >
                {parseFloat(checkInRate) > 10 && (
                  <span className="text-white font-bold text-sm">
                    {checkInRate}%
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-3 text-sm">
              <span className="text-gray-600">
                {stats.checkedIn} of {stats.totalAttendees} attendees checked in
              </span>
              <span className="text-gray-600">
                {stats.pending} pending
              </span>
            </div>
          </div>
        </div>

        {/* Event Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Event Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Event Name</div>
              <div className="font-semibold text-gray-900">{event.name}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Category</div>
              <div className="font-semibold text-gray-900">{event.category || 'N/A'}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Location</div>
              <div className="font-semibold text-gray-900">{event.location}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Date</div>
              <div className="font-semibold text-gray-900">{formatDate(event.date)}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Ticket Price</div>
              <div className="font-semibold text-gray-900">{formatCurrency(event.price)}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Status</div>
              <div className="font-semibold text-gray-900">
                {event.closed ? '🔒 Closed' : '✓ Active'}
              </div>
            </div>
            {event.closed && event.closedAt && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Closed On</div>
                <div className="font-semibold text-gray-900">
                  {new Date(event.closedAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Close Confirmation Modal */}
      {showCloseConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">⚠️</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center">Close Event?</h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 text-center mb-6">
                Are you sure you want to close this event? This action will:
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Prevent any further check-ins</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Mark the event as closed</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Generate a final summary report</span>
                </li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-yellow-800 text-sm font-semibold">
                  ⚠️ This action cannot be undone
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCloseConfirmation(false)}
                  disabled={closing}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCloseEvent}
                  disabled={closing}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:shadow-xl disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
                >
                  {closing ? 'Closing...' : 'Yes, Close Event'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Close Summary Modal */}
      {closeSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">✓</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center">Event Closed Successfully</h2>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4 text-center">
                Final Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="bg-blue-50 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total Attendees</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {closeSummary.totalAttendees}
                  </span>
                </div>
                <div className="bg-green-50 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Checked In</span>
                  <span className="text-2xl font-bold text-green-600">
                    {closeSummary.checkedIn}
                  </span>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Pending</span>
                  <span className="text-2xl font-bold text-yellow-600">
                    {closeSummary.pending}
                  </span>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total Revenue</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {formatCurrency(closeSummary.revenue)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setCloseSummary(null);
                  router.push('/dashboard');
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl text-white py-4 rounded-xl font-bold transition-all transform hover:scale-105"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}