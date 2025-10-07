// File: /app/ticket/[code]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate, formatCurrency } from '@/lib/utils';
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ticket...</p>
        </div>
      </div>
    );
  }

  if (!ticket || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ticket Not Found</h2>
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
              Event Tickets
            </Link>
            <Link
              href="/verify"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
            >
              Verify Ticket
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Ticket Purchased Successfully!
          </h1>
          <p className="text-gray-600">
            Your ticket has been generated. Save this page or take a screenshot.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
            <p className="opacity-90">{formatDate(event.date)}</p>
          </div>

          <div className="p-8">
            <div className="flex justify-center mb-8">
              {qrCode && (
                <div className="bg-white p-4 rounded-xl border-4 border-slate-900">
                  <img
                    src={qrCode}
                    alt="Ticket QR Code"
                    className="w-64 h-64"
                  />
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Ticket Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Ticket Code</p>
                  <p className="font-mono text-sm text-slate-900 break-all">{ticket.code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Buyer Name</p>
                  <p className="font-semibold text-slate-900">{ticket.buyerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-slate-900">{ticket.buyerEmail}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Event Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold text-slate-900">{event.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold text-slate-900">{formatDate(event.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(event.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-semibold ${ticket.used ? 'text-red-600' : 'text-green-600'}`}>
                    {ticket.used ? 'Used' : 'Valid'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> Present this QR code at the event entrance for verification.
                Each ticket can only be used once.
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-slate-900 text-center py-3 rounded-lg font-semibold transition"
              >
                Back to Events
              </Link>
              <button
                onClick={() => window.print()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
              >
                Print Ticket
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}