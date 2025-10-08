// // File: /app/event/[id]/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { formatDate, formatCurrency } from '@/lib/utils';
// import { Event } from '@/lib/types';

// export default function EventPage({ params }: { params: { id: string } }) {
// 	const router = useRouter();
// 	const [event, setEvent] = useState<Event | null>(null);
// 	const [loading, setLoading] = useState(true);
// 	const [purchasing, setPurchasing] = useState(false);
// 	const [buyerName, setBuyerName] = useState('');
// 	const [buyerEmail, setBuyerEmail] = useState('');
// 	const [error, setError] = useState('');

// 	useEffect(() => {
// 		fetch('/api/events')
// 			.then(res => res.json())
// 			.then((events: Event[]) => {
// 				const foundEvent = events.find(e => e.id === params.id);
// 				setEvent(foundEvent || null);
// 				setLoading(false);
// 			})
// 			.catch(() => {
// 				setLoading(false);
// 			});
// 	}, [params.id]);

// 	const handlePurchase = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		setError('');

// 		if (!buyerName.trim() || !buyerEmail.trim()) {
// 			setError('Please fill in all fields');
// 			return;
// 		}

// 		setPurchasing(true);

// 		try {
// 			const response = await fetch('/api/tickets', {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({
// 					eventId: params.id,
// 					buyerName: buyerName.trim(),
// 					buyerEmail: buyerEmail.trim()
// 				})
// 			});

// 			if (!response.ok) {
// 				throw new Error('Failed to purchase ticket');
// 			}

// 			const data = await response.json();
// 			router.push(`/ticket/${data.ticket.code}`);
// 		} catch (err) {
// 			setError('Failed to purchase ticket. Please try again.');
// 			setPurchasing(false);
// 		}
// 	};

// 	if (loading) {
// 		return (
// 			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
// 				<div className="text-center">
// 					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
// 					<p className="text-gray-600">Loading event...</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	if (!event) {
// 		return (
// 			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
// 				<div className="text-center">
// 					<h2 className="text-2xl font-bold text-slate-900 mb-4">Event Not Found</h2>
// 					<Link href="/" className="text-blue-500 hover:underline">
// 						Back to Events
// 					</Link>
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="min-h-screen bg-gray-50">
// 			<nav className="bg-slate-900 text-white shadow-lg">
// 				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// 					<div className="flex justify-between items-center">
// 						<Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
// 							Event Tickets
// 						</Link>
// 						<Link
// 							href="/verify"
// 							className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
// 						>
// 							Verify Ticket
// 						</Link>
// 					</div>
// 				</div>
// 			</nav>

// 			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
// 				<Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
// 					← Back to Events
// 				</Link>

// 				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
// 					<div className="h-64 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
// 						<div className="text-white text-center p-8">
// 							<h1 className="text-4xl font-bold mb-4">{event.name}</h1>
// 						</div>
// 					</div>

// 					<div className="p-8">
// 						<div className="mb-8">
// 							<h2 className="text-2xl font-bold text-slate-900 mb-4">Event Details</h2>
// 							<p className="text-gray-700 mb-6">{event.description}</p>

// 							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// 								<div className="bg-gray-50 p-4 rounded-lg">
// 									<p className="text-sm text-gray-600 mb-1">Location</p>
// 									<p className="font-semibold text-slate-900">📍 {event.location}</p>
// 								</div>
// 								<div className="bg-gray-50 p-4 rounded-lg">
// 									<p className="text-sm text-gray-600 mb-1">Date</p>
// 									<p className="font-semibold text-slate-900">📅 {formatDate(event.date)}</p>
// 								</div>
// 								<div className="bg-gray-50 p-4 rounded-lg">
// 									<p className="text-sm text-gray-600 mb-1">Price</p>
// 									<p className="font-semibold text-slate-900">💰 {formatCurrency(event.price)}</p>
// 								</div>
// 							</div>
// 						</div>

// 						<div className="border-t pt-8">
// 							<h2 className="text-2xl font-bold text-slate-900 mb-6">Purchase Ticket</h2>

// 							<form onSubmit={handlePurchase} className="space-y-4">
// 								<div>
// 									<label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
// 										Full Name
// 									</label>
// 									<input
// 										type="text"
// 										id="name"
// 										value={buyerName}
// 										onChange={(e) => setBuyerName(e.target.value)}
// 										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// 										placeholder="Enter your full name"
// 										required
// 									/>
// 								</div>

// 								<div>
// 									<label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
// 										Email Address
// 									</label>
// 									<input
// 										type="email"
// 										id="email"
// 										value={buyerEmail}
// 										onChange={(e) => setBuyerEmail(e.target.value)}
// 										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// 										placeholder="Enter your email address"
// 										required
// 									/>
// 								</div>

// 								{error && (
// 									<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
// 										{error}
// 									</div>
// 								)}

// 								<button
// 									type="submit"
// 									disabled={purchasing}
// 									className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-4 rounded-lg transition"
// 								>
// 									{purchasing ? 'Processing...' : `Buy Ticket - ${formatCurrency(event.price)}`}
// 								</button>

// 								<p className="text-sm text-gray-600 text-center">
// 									This is a demo. No actual payment will be processed.
// 								</p>
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</main>
// 		</div>
// 	);
// }































// File: /app/event/[id]/page.tsx (UPDATED - add Navigation and modernize UI)

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { formatDate, formatCurrency, getCategoryColor } from '@/lib/utils';
import { Event } from '@/lib/types';

export default function EventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then((events: Event[]) => {
        const foundEvent = events.find(e => e.id === params.id);
        setEvent(foundEvent || null);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [params.id]);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!buyerName.trim() || !buyerEmail.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setPurchasing(true);

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: params.id,
          buyerName: buyerName.trim(),
          buyerEmail: buyerEmail.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to purchase ticket');
      }

      const data = await response.json();
      router.push(`/ticket/${data.ticket.code}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to purchase ticket. Please try again.';
      setError(message);
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading event...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-6xl mb-6">❌</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h2>
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-80 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-white">
              {event.category && (
                <span className={`px-4 py-2 rounded-full text-sm font-semibold mb-4 ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
              )}
              <h1 className="text-5xl font-bold mb-4 text-center">{event.name}</h1>
              <div className="flex items-center gap-6 text-lg">
                <span>📍 {event.location}</span>
                <span>📅 {formatDate(event.date)}</span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                  <p className="text-sm text-blue-600 font-semibold mb-2">Location</p>
                  <p className="font-bold text-gray-900 text-lg">📍 {event.location}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
                  <p className="text-sm text-purple-600 font-semibold mb-2">Date</p>
                  <p className="font-bold text-gray-900 text-lg">📅 {formatDate(event.date)}</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl">
                  <p className="text-sm text-pink-600 font-semibold mb-2">Ticket Price</p>
                  <p className="font-bold text-gray-900 text-lg">💰 {formatCurrency(event.price)}</p>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-gray-100 pt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Purchase Ticket</h2>
              
              <form onSubmit={handlePurchase} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={purchasing}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-2xl disabled:opacity-50 text-white font-bold py-5 rounded-xl transition-all transform hover:scale-105 text-lg"
                >
                  {purchasing ? 'Processing...' : `Buy Ticket - ${formatCurrency(event.price)}`}
                </button>

                <p className="text-sm text-gray-600 text-center bg-blue-50 py-3 rounded-xl">
                  💡 This is a demo. No actual payment will be processed.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}