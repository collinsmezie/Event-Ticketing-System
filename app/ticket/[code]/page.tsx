'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { formatDate, formatCurrency, formatDateTime, getCategoryColor } from '@/lib/utils';
import { Ticket, Event } from '@/lib/types';

export default function TicketPage({ params }: { params: { code: string } }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [qrCode, setQrCode] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tickets/${params.code}`)
      .then(res => res.json())
      .then(data => {
        if (data.ticket) {
          setTicket(data.ticket);
          setEvent(data.event);
          setQrCode(data.qrCode);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [params.code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading ticket...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-6xl mb-6">❌</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ticket Not Found</h2>
            <Link href="/" className="text-blue-600 hover:underline text-lg">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 shadow-xl animate-bounce">
            <span className="text-4xl text-white">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Ticket Confirmed!
          </h1>
          <p className="text-gray-600 text-lg">
            Your ticket has been generated successfully
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
          {/* Event Header */}
          <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white">
            <div className="absolute top-6 right-6">
              {event.category && (
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-3">{event.name}</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-lg opacity-95">
              <span className="flex items-center">
                <span className="mr-2">📍</span>
                {event.location}
              </span>
              <span className="flex items-center">
                <span className="mr-2">📅</span>
                {formatDate(event.date)}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-10">
            {/* QR Code Section */}
            <div className="flex justify-center mb-10">
              {qrCode && (
                <div className="bg-white p-6 rounded-2xl border-4 border-gray-900 shadow-xl relative w-72 h-72">
                  <Image
                    src={qrCode}
                    alt="Ticket QR Code"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* Ticket Information */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-5 text-xl flex items-center">
                <span className="text-2xl mr-2">🎫</span>
                Ticket Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 font-medium">Ticket Code</span>
                  <span className="font-mono text-sm text-gray-900 break-all text-right max-w-xs bg-white px-3 py-1 rounded-lg">
                    {ticket.code}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600 font-medium">Buyer Name</span>
                  <span className="font-semibold text-gray-900">{ticket.buyerName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600 font-medium">Email</span>
                  <span className="text-gray-900 text-right break-all max-w-xs">{ticket.buyerEmail}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Purchase Date</span>
                  <span className="text-gray-900">{formatDateTime(ticket.purchasedAt)}</span>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-5 text-xl flex items-center">
                <span className="text-2xl mr-2">🎉</span>
                Event Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600 font-medium">Event Name</span>
                  <span className="font-semibold text-gray-900 text-right">{event.name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600 font-medium">Location</span>
                  <span className="text-gray-900 text-right">{event.location}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600 font-medium">Date</span>
                  <span className="text-gray-900">{formatDate(event.date)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600 font-medium">Ticket Price</span>
                  <span className="font-bold text-blue-600">{formatCurrency(event.price)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Status</span>
                  <span className={`font-semibold px-4 py-1 rounded-full ${
                    ticket.used 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {ticket.used ? '✗ Used' : '✓ Valid'}
                  </span>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 mb-6 text-white">
              <div className="flex items-start">
                <span className="text-3xl mr-4 flex-shrink-0">ℹ️</span>
                <div>
                  <p className="font-semibold text-lg mb-2">Important Instructions</p>
                  <ul className="space-y-1 text-blue-50 text-sm">
                    <li>• Present this QR code at the event entrance</li>
                    <li>• Each ticket can only be used once</li>
                    <li>• Save this page or take a screenshot</li>
                    <li>• Arrive at least 30 minutes before the event</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link 
                href="/"
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 text-center py-4 rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                Browse Events
              </Link>
              <Link 
                href="/verify"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl text-white text-center py-4 rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                Verify Ticket
              </Link>
              <button
                onClick={() => window.print()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl text-white py-4 rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                Print Ticket
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-gray-600">
            Need help? Contact{' '}
            <a href="mailto:support@eventtickets.com" className="text-blue-600 hover:underline font-semibold">
              support@eventtickets.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}