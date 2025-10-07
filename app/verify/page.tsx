// File: /app/verify/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useRef } from 'react';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Ticket, Event } from '@/lib/types';

export default function VerifyPage() {
  const [manualCode, setManualCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    message: string;
    ticket: Ticket | null;
    event: Event | null;
  } | null>(null);
  const [scannerMode, setScannerMode] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (scannerMode && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        'qr-reader',
        { fps: 10, qrbox: 250 },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          handleVerify(decodedText);
          if (scannerRef.current) {
            scannerRef.current.clear();
            scannerRef.current = null;
          }
          setScannerMode(false);
        },
        (error) => {
          // Ignore scan errors
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [scannerMode]);

  const handleVerify = async (code: string) => {
    setVerifying(true);
    setResult(null);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({
        valid: false,
        message: 'Failed to verify ticket. Please try again.',
        ticket: null,
        event: null
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleVerify(manualCode.trim());
    }
  };

  const handleStartScanner = () => {
    setResult(null);
    setScannerMode(true);
  };

  const handleStopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setScannerMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
              Event Tickets
            </Link>
            <Link 
              href="/"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
            >
              View Events
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Ticket Verification
          </h1>
          <p className="text-gray-600">
            Scan QR code or enter ticket code manually to verify entry
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleStartScanner}
              disabled={scannerMode}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                scannerMode
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Scan QR Code
            </button>
            {scannerMode && (
              <button
                onClick={handleStopScanner}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
              >
                Stop Scanner
              </button>
            )}
          </div>

          {scannerMode && (
            <div className="mb-6">
              <div id="qr-reader" className="rounded-lg overflow-hidden"></div>
            </div>
          )}

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <form onSubmit={handleManualVerify}>
            <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Ticket Code Manually
            </label>
            <input
              type="text"
              id="code"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              placeholder="Paste or type ticket code"
            />
            <button
              type="submit"
              disabled={verifying || !manualCode.trim()}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
            >
              {verifying ? 'Verifying...' : 'Verify Ticket'}
            </button>
          </form>
        </div>

        {result && (
          <div className={`rounded-xl shadow-lg overflow-hidden ${
            result.valid ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
          }`}>
            <div className={`p-6 ${result.valid ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              <div className="flex items-center justify-center mb-2">
                <span className="text-5xl">
                  {result.valid ? '✓' : '✗'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-center">
                {result.valid ? 'Valid Ticket' : 'Invalid Ticket'}
              </h2>
            </div>

            <div className="p-6">
              <div className={`mb-6 p-4 rounded-lg ${
                result.valid ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
              }`}>
                <p className={`text-center font-semibold ${
                  result.valid ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.message}
                </p>
              </div>

              {result.ticket && result.event && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-bold text-slate-900 mb-3">Event Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Event Name</span>
                        <span className="font-semibold text-slate-900 text-right">{result.event.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location</span>
                        <span className="font-semibold text-slate-900 text-right">{result.event.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="font-semibold text-slate-900">{formatDate(result.event.date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price</span>
                        <span className="font-semibold text-slate-900">{formatCurrency(result.event.price)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-bold text-slate-900 mb-3">Ticket Holder</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name</span>
                        <span className="font-semibold text-slate-900">{result.ticket.buyerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email</span>
                        <span className="font-semibold text-slate-900 text-right break-all">{result.ticket.buyerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className={`font-semibold ${result.ticket.used ? 'text-red-600' : 'text-green-600'}`}>
                          {result.ticket.used ? 'Used' : 'Valid'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setResult(null);
                  setManualCode('');
                }}
                className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition"
              >
                Verify Another Ticket
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}