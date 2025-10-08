// // File: /components/VerificationModal.tsx (NEW)

// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import { Ticket, Event } from '@/lib/types';

// type VerificationModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onCheckIn: (ticketCode: string) => void;
//   attendeeName?: string;
// };

// type VerificationResult = {
//   valid: boolean;
//   message: string;
//   ticket?: Ticket;
//   event?: Event;
// } | null;

// export default function VerificationModal({
//   isOpen,
//   onClose,
//   onCheckIn,
//   attendeeName
// }: VerificationModalProps) {
//   const [manualCode, setManualCode] = useState('');
//   const [verifying, setVerifying] = useState(false);
//   const [verificationResult, setVerificationResult] = useState<VerificationResult>(null);
//   const [scannerActive, setScannerActive] = useState(false);
//   const scannerRef = useRef<Html5QrcodeScanner | null>(null);

//   const stopScanner = useCallback(() => {
//     if (scannerRef.current) {
//       scannerRef.current.clear().catch(() => { });
//       scannerRef.current = null;
//     }
//     setScannerActive(false);
//   }, []);

//   const handleVerify = useCallback(async (code: string) => {
//     setVerifying(true);

//     try {
//       const response = await fetch('/api/verify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ code, skipMarkAsUsed: true })
//       });

//       const data = await response.json();
//       setVerificationResult(data);
//       stopScanner();
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to verify ticket. Please try again.';
//       setVerificationResult({
//         valid: false,
//         message: errorMessage
//       });
//     } finally {
//       setVerifying(false);
//     }
//   }, [stopScanner]);

//   const startScanner = useCallback(() => {
//     if (scannerRef.current) return;

//     setScannerActive(true);

//     setTimeout(() => {
//       scannerRef.current = new Html5QrcodeScanner(
//         'verification-qr-reader',
//         {
//           fps: 10,
//           qrbox: 250,
//           aspectRatio: 1.0
//         },
//         false
//       );

//       scannerRef.current.render(
//         (decodedText) => {
//           handleVerify(decodedText);
//         },
//         () => {
//           // Ignore scan errors
//         }
//       );
//     }, 100);
//   }, [handleVerify]);

//   useEffect(() => {
//     if (isOpen && !scannerActive) {
//       // Auto-start scanner when modal opens
//       startScanner();
//     }

//     return () => {
//       stopScanner();
//     };
//   }, [isOpen, scannerActive, startScanner, stopScanner]);

//   const handleManualVerify = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (manualCode.trim()) {
//       handleVerify(manualCode.trim());
//     }
//   };

//   const handleConfirmCheckIn = () => {
//     if (verificationResult?.valid && verificationResult?.ticket) {
//       onCheckIn(verificationResult.ticket.code);
//       handleClose();
//     }
//   };

//   const handleClose = () => {
//     stopScanner();
//     setManualCode('');
//     setVerificationResult(null);
//     setScannerActive(false);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-3xl">
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold mb-1">Verify Ticket</h2>
//               {attendeeName && (
//                 <p className="text-blue-100">Checking in: {attendeeName}</p>
//               )}
//             </div>
//             <button
//               onClick={handleClose}
//               className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition"
//             >
//               ✕
//             </button>
//           </div>
//         </div>

//         <div className="p-6">
//           {!verificationResult ? (
//             <>
//               {/* QR Scanner */}
//               <div className="mb-6">
//                 <div id="verification-qr-reader" className="rounded-2xl overflow-hidden"></div>
//               </div>

//               {/* Manual Entry */}
//               <div className="relative mb-4">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t-2 border-gray-200"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-4 py-2 bg-white text-gray-500 font-semibold rounded-full">
//                     OR ENTER MANUALLY
//                   </span>
//                 </div>
//               </div>

//               <form onSubmit={handleManualVerify}>
//                 <input
//                   type="text"
//                   value={manualCode}
//                   onChange={(e) => setManualCode(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
//                   placeholder="Enter ticket code"
//                 />
//                 <button
//                   type="submit"
//                   disabled={verifying || !manualCode.trim()}
//                   className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all"
//                 >
//                   {verifying ? 'Verifying...' : 'Verify Ticket'}
//                 </button>
//               </form>
//             </>
//           ) : (
//             <div>
//               {/* Verification Result */}
//               <div className={`rounded-2xl p-6 mb-6 ${verificationResult.valid
//                   ? 'bg-green-50 border-2 border-green-500'
//                   : 'bg-red-50 border-2 border-red-500'
//                 }`}>
//                 <div className="flex items-center justify-center mb-4">
//                   <div className={`w-16 h-16 rounded-full flex items-center justify-center ${verificationResult.valid ? 'bg-green-500' : 'bg-red-500'
//                     }`}>
//                     <span className="text-4xl text-white">
//                       {verificationResult.valid ? '✓' : '✗'}
//                     </span>
//                   </div>
//                 </div>
//                 <h3 className={`text-2xl font-bold text-center mb-2 ${verificationResult.valid ? 'text-green-800' : 'text-red-800'
//                   }`}>
//                   {verificationResult.valid ? 'Valid Ticket' : 'Invalid Ticket'}
//                 </h3>
//                 <p className={`text-center ${verificationResult.valid ? 'text-green-700' : 'text-red-700'
//                   }`}>
//                   {verificationResult.message}
//                 </p>
//               </div>

//               {verificationResult.valid && verificationResult.ticket && verificationResult.event && (
//                 <div className="space-y-4 mb-6">
//                   <div className="bg-gray-50 rounded-xl p-4">
//                     <h4 className="font-bold text-gray-900 mb-3">Ticket Holder</h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Name</span>
//                         <span className="font-semibold">{verificationResult.ticket.buyerName}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Email</span>
//                         <span className="text-right break-all max-w-xs">{verificationResult.ticket.buyerEmail}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 rounded-xl p-4">
//                     <h4 className="font-bold text-gray-900 mb-3">Event Details</h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Event</span>
//                         <span className="font-semibold text-right">{verificationResult.event.name}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Location</span>
//                         <span className="text-right">{verificationResult.event.location}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => {
//                     setVerificationResult(null);
//                     setManualCode('');
//                     startScanner();
//                   }}
//                   className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-xl font-semibold transition"
//                 >
//                   Scan Another
//                 </button>
//                 {verificationResult.valid && (
//                   <button
//                     onClick={handleConfirmCheckIn}
//                     className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-xl text-white py-3 rounded-xl font-semibold transition"
//                   >
//                     ✓ Confirm Check-in
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






















'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Ticket, Event } from '@/lib/types';

type VerificationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCheckIn: (ticketCode: string) => void;
  attendeeName?: string;
};

type VerificationResult = {
  valid: boolean;
  message: string;
  ticket?: Ticket;
  event?: Event;
} | null;

export default function VerificationModal({
  isOpen,
  onClose,
  onCheckIn,
  attendeeName
}: VerificationModalProps) {
  const [manualCode, setManualCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult>(null);
  const [scannerActive, setScannerActive] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const stopScanner = useCallback(() => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(() => {});
      scannerRef.current = null;
    }
    setScannerActive(false);
  }, []);

  const handleVerify = useCallback(async (code: string) => {
    setVerifying(true);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, skipMarkAsUsed: true })
      });

      const data = await response.json();
      setVerificationResult(data);
      stopScanner();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to verify ticket. Please try again.';
      setVerificationResult({
        valid: false,
        message: errorMessage
      });
    } finally {
      setVerifying(false);
    }
  }, [stopScanner]);

  const startScanner = useCallback(() => {
    if (scannerRef.current) return; // already running

    setScannerActive(true);

    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        'verification-qr-reader',
        {
          fps: 10,
          qrbox: 250,
          aspectRatio: 1.0
        },
        false
      );

      scanner.render(
        (decodedText) => {
          handleVerify(decodedText);
        },
        () => {
          // ignore scan errors
        }
      );

      scannerRef.current = scanner;
    }, 200); // slight delay ensures DOM ready
  }, [handleVerify]);

  // 🔧 Fixed lifecycle: only start scanner once when modal opens, stop only when closing
  useEffect(() => {
    if (isOpen) {
      if (!scannerRef.current) startScanner();
    } else {
      stopScanner();
    }
    // Cleanup only when modal unmounts or closes
    return () => {
      if (!isOpen) stopScanner();
    };
  }, [isOpen, startScanner, stopScanner]);

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleVerify(manualCode.trim());
    }
  };

  const handleConfirmCheckIn = () => {
    if (verificationResult?.valid && verificationResult?.ticket) {
      onCheckIn(verificationResult.ticket.code);
      handleClose();
    }
  };

  const handleClose = () => {
    stopScanner();
    setManualCode('');
    setVerificationResult(null);
    setScannerActive(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-1">Verify Ticket</h2>
              {attendeeName && (
                <p className="text-blue-100">Checking in: {attendeeName}</p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {!verificationResult ? (
            <>
              {/* QR Scanner */}
              <div className="mb-6">
                <div
                  id="verification-qr-reader"
                  key={scannerActive ? 'active' : 'inactive'} // prevents DOM reuse flicker
                  className="rounded-2xl overflow-hidden"
                ></div>
              </div>

              {/* Manual Entry Divider */}
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 py-2 bg-white text-gray-500 font-semibold rounded-full">
                    OR ENTER MANUALLY
                  </span>
                </div>
              </div>

              {/* Manual Entry Form */}
              <form onSubmit={handleManualVerify}>
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                  placeholder="Enter ticket code"
                />
                <button
                  type="submit"
                  disabled={verifying || !manualCode.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all"
                >
                  {verifying ? 'Verifying...' : 'Verify Ticket'}
                </button>
              </form>
            </>
          ) : (
            <div>
              {/* Verification Result */}
              <div
                className={`rounded-2xl p-6 mb-6 ${
                  verificationResult.valid
                    ? 'bg-green-50 border-2 border-green-500'
                    : 'bg-red-50 border-2 border-red-500'
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      verificationResult.valid ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    <span className="text-4xl text-white">
                      {verificationResult.valid ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
                <h3
                  className={`text-2xl font-bold text-center mb-2 ${
                    verificationResult.valid ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {verificationResult.valid ? 'Valid Ticket' : 'Invalid Ticket'}
                </h3>
                <p
                  className={`text-center ${
                    verificationResult.valid ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {verificationResult.message}
                </p>
              </div>

              {/* Ticket + Event Details */}
              {verificationResult.valid &&
                verificationResult.ticket &&
                verificationResult.event && (
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-bold text-gray-900 mb-3">Ticket Holder</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name</span>
                          <span className="font-semibold">
                            {verificationResult.ticket.buyerName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email</span>
                          <span className="text-right break-all max-w-xs">
                            {verificationResult.ticket.buyerEmail}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-bold text-gray-900 mb-3">Event Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Event</span>
                          <span className="font-semibold text-right">
                            {verificationResult.event.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location</span>
                          <span className="text-right">
                            {verificationResult.event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setVerificationResult(null);
                    setManualCode('');
                    startScanner();
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-xl font-semibold transition"
                >
                  Scan Another
                </button>
                {verificationResult.valid && (
                  <button
                    onClick={handleConfirmCheckIn}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-xl text-white py-3 rounded-xl font-semibold transition"
                  >
                    ✓ Confirm Check-in
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
