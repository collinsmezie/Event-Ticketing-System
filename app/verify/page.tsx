// // File: /app/verify/page.tsx

// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import { useEffect, useRef } from 'react';
// import { formatDate, formatCurrency } from '@/lib/utils';
// import { Ticket, Event } from '@/lib/types';

// export default function VerifyPage() {
//   const [manualCode, setManualCode] = useState('');
//   const [verifying, setVerifying] = useState(false);
//   const [result, setResult] = useState<{
//     valid: boolean;
//     message: string;
//     ticket: Ticket | null;
//     event: Event | null;
//   } | null>(null);
//   const [scannerMode, setScannerMode] = useState(false);
//   const scannerRef = useRef<Html5QrcodeScanner | null>(null);

//   useEffect(() => {
//     if (scannerMode && !scannerRef.current) {
//       scannerRef.current = new Html5QrcodeScanner(
//         'qr-reader',
//         { fps: 10, qrbox: 250 },
//         false
//       );

//       scannerRef.current.render(
//         (decodedText) => {
//           handleVerify(decodedText);
//           if (scannerRef.current) {
//             scannerRef.current.clear();
//             scannerRef.current = null;
//           }
//           setScannerMode(false);
//         },
//         (error) => {
//           // Ignore scan errors
//         }
//       );
//     }

//     return () => {
//       if (scannerRef.current) {
//         scannerRef.current.clear();
//         scannerRef.current = null;
//       }
//     };
//   }, [scannerMode]);

//   const handleVerify = async (code: string) => {
//     setVerifying(true);
//     setResult(null);

//     try {
//       const response = await fetch('/api/verify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ code })
//       });

//       const data = await response.json();
//       setResult(data);
//     } catch (err) {
//       setResult({
//         valid: false,
//         message: 'Failed to verify ticket. Please try again.',
//         ticket: null,
//         event: null
//       });
//     } finally {
//       setVerifying(false);
//     }
//   };

//   const handleManualVerify = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (manualCode.trim()) {
//       handleVerify(manualCode.trim());
//     }
//   };

//   const handleStartScanner = () => {
//     setResult(null);
//     setScannerMode(true);
//   };

//   const handleStopScanner = () => {
//     if (scannerRef.current) {
//       scannerRef.current.clear();
//       scannerRef.current = null;
//     }
//     setScannerMode(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-slate-900 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
//               Event Tickets
//             </Link>
//             <Link 
//               href="/"
//               className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
//             >
//               View Events
//             </Link>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-slate-900 mb-2">
//             Ticket Verification
//           </h1>
//           <p className="text-gray-600">
//             Scan QR code or enter ticket code manually to verify entry
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
//           <div className="flex gap-4 mb-6">
//             <button
//               onClick={handleStartScanner}
//               disabled={scannerMode}
//               className={`flex-1 py-3 rounded-lg font-semibold transition ${
//                 scannerMode
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-500 hover:bg-blue-600 text-white'
//               }`}
//             >
//               Scan QR Code
//             </button>
//             {scannerMode && (
//               <button
//                 onClick={handleStopScanner}
//                 className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
//               >
//                 Stop Scanner
//               </button>
//             )}
//           </div>

//           {scannerMode && (
//             <div className="mb-6">
//               <div id="qr-reader" className="rounded-lg overflow-hidden"></div>
//             </div>
//           )}

//           <div className="relative mb-4">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-white text-gray-500">OR</span>
//             </div>
//           </div>

//           <form onSubmit={handleManualVerify}>
//             <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
//               Enter Ticket Code Manually
//             </label>
//             <input
//               type="text"
//               id="code"
//               value={manualCode}
//               onChange={(e) => setManualCode(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
//               placeholder="Paste or type ticket code"
//             />
//             <button
//               type="submit"
//               disabled={verifying || !manualCode.trim()}
//               className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
//             >
//               {verifying ? 'Verifying...' : 'Verify Ticket'}
//             </button>
//           </form>
//         </div>

//         {result && (
//           <div className={`rounded-xl shadow-lg overflow-hidden ${
//             result.valid ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
//           }`}>
//             <div className={`p-6 ${result.valid ? 'bg-green-500' : 'bg-red-500'} text-white`}>
//               <div className="flex items-center justify-center mb-2">
//                 <span className="text-5xl">
//                   {result.valid ? '✓' : '✗'}
//                 </span>
//               </div>
//               <h2 className="text-2xl font-bold text-center">
//                 {result.valid ? 'Valid Ticket' : 'Invalid Ticket'}
//               </h2>
//             </div>

//             <div className="p-6">
//               <div className={`mb-6 p-4 rounded-lg ${
//                 result.valid ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
//               }`}>
//                 <p className={`text-center font-semibold ${
//                   result.valid ? 'text-green-800' : 'text-red-800'
//                 }`}>
//                   {result.message}
//                 </p>
//               </div>

//               {result.ticket && result.event && (
//                 <div className="space-y-4">
//                   <div className="bg-white rounded-lg p-4 border border-gray-200">
//                     <h3 className="font-bold text-slate-900 mb-3">Event Information</h3>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Event Name</span>
//                         <span className="font-semibold text-slate-900 text-right">{result.event.name}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Location</span>
//                         <span className="font-semibold text-slate-900 text-right">{result.event.location}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Date</span>
//                         <span className="font-semibold text-slate-900">{formatDate(result.event.date)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Price</span>
//                         <span className="font-semibold text-slate-900">{formatCurrency(result.event.price)}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-white rounded-lg p-4 border border-gray-200">
//                     <h3 className="font-bold text-slate-900 mb-3">Ticket Holder</h3>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Name</span>
//                         <span className="font-semibold text-slate-900">{result.ticket.buyerName}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Email</span>
//                         <span className="font-semibold text-slate-900 text-right break-all">{result.ticket.buyerEmail}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Status</span>
//                         <span className={`font-semibold ${result.ticket.used ? 'text-red-600' : 'text-green-600'}`}>
//                           {result.ticket.used ? 'Used' : 'Valid'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <button
//                 onClick={() => {
//                   setResult(null);
//                   setManualCode('');
//                 }}
//                 className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition"
//               >
//                 Verify Another Ticket
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }






















// File: /app/verify/page.tsx (UPDATED)

'use client';

import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { formatDate, formatCurrency, formatDateTime, getCategoryColor } from '@/lib/utils';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <span className="text-4xl text-white">🔍</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Ticket Verification
          </h1>
          <p className="text-gray-600 text-lg">
            Scan QR code or enter ticket code to verify entry
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          {/* Scanner Toggle */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleStartScanner}
              disabled={scannerMode}
              className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                scannerMode
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
              }`}
            >
              📷 Scan QR Code
            </button>
            {scannerMode && (
              <button
                onClick={handleStopScanner}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                ✕ Stop Scanner
              </button>
            )}
          </div>

          {/* QR Scanner */}
          {scannerMode && (
            <div className="mb-8">
              <div id="qr-reader" className="rounded-2xl overflow-hidden shadow-lg"></div>
            </div>
          )}

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-6 py-2 bg-white text-gray-500 font-semibold rounded-full">
                OR ENTER MANUALLY
              </span>
            </div>
          </div>

          {/* Manual Entry Form */}
          <form onSubmit={handleManualVerify}>
            <label htmlFor="code" className="block text-sm font-bold text-gray-700 mb-3">
              Enter Ticket Code
            </label>
            <input
              type="text"
              id="code"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6 text-lg"
              placeholder="Paste or type ticket code"
            />
            <button
              type="submit"
              disabled={verifying || !manualCode.trim()}
              className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:shadow-xl disabled:opacity-50 text-white font-bold py-5 rounded-xl transition-all transform hover:scale-105 text-lg"
            >
              {verifying ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Verifying...
                </span>
              ) : (
                '🔍 Verify Ticket'
              )}
            </button>
          </form>
        </div>

        {/* Verification Result */}
        {result && (
          <div className={`rounded-3xl shadow-2xl overflow-hidden animate-fade-in ${
            result.valid 
              ? 'bg-gradient-to-br from-green-50 to-green-100 border-4 border-green-500' 
              : 'bg-gradient-to-br from-red-50 to-red-100 border-4 border-red-500'
          }`}>
            {/* Result Header */}
            <div className={`p-8 ${result.valid ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'} text-white`}>
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                  <span className="text-5xl">
                    {result.valid ? '✓' : '✗'}
                  </span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-center mb-2">
                {result.valid ? 'Valid Ticket' : 'Invalid Ticket'}
              </h2>
              <p className="text-center text-lg opacity-95">
                {result.message}
              </p>
            </div>

            {/* Ticket Details */}
            {result.ticket && result.event && (
              <div className="p-8">
                {/* Event Information */}
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-xl flex items-center">
                      <span className="text-2xl mr-2">🎉</span>
                      Event Information
                    </h3>
                    {result.event.category && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(result.event.category)}`}>
                        {result.event.category}
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Event Name</span>
                      <span className="font-semibold text-gray-900 text-right max-w-xs">{result.event.name}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Location</span>
                      <span className="text-gray-900 text-right">{result.event.location}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Date</span>
                      <span className="text-gray-900">{formatDate(result.event.date)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Ticket Price</span>
                      <span className="font-bold text-blue-600">{formatCurrency(result.event.price)}</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Holder Information */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-gray-900 mb-4 text-xl flex items-center">
                    <span className="text-2xl mr-2">👤</span>
                    Ticket Holder
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Name</span>
                      <span className="font-semibold text-gray-900">{result.ticket.buyerName}</span>
                    </div>
                    <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Email</span>
                      <span className="text-gray-900 text-right break-all max-w-xs">{result.ticket.buyerEmail}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Purchase Date</span>
                      <span className="text-gray-900 text-sm">{formatDateTime(result.ticket.purchasedAt)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Check-in Status</span>
                      <span className={`font-semibold px-4 py-1 rounded-full ${
                        result.ticket.used 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {result.ticket.used ? '✗ Already Used' : '✓ Valid for Entry'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    setResult(null);
                    setManualCode('');
                  }}
                  className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl text-white py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                >
                  Verify Another Ticket
                </button>
              </div>
            )}

            {/* No Details Available */}
            {!result.ticket && !result.event && (
              <div className="p-8">
                <button
                  onClick={() => {
                    setResult(null);
                    setManualCode('');
                  }}
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:shadow-xl text-white py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}