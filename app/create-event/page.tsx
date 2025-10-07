// // File: /app/create-event/page.tsx (NEW)

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function CreateEventPage() {
//   const router = useRouter();
//   const [creating, setCreating] = useState(false);
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     location: '',
//     date: '',
//     price: '',
//     bannerUrl: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.name || !formData.description || !formData.location || !formData.date || !formData.price) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     if (Number(formData.price) <= 0) {
//       setError('Price must be greater than 0');
//       return;
//     }

//     setCreating(true);

//     try {
//       const response = await fetch('/api/events', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...formData,
//           price: Number(formData.price)
//         })
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || 'Failed to create event');
//       }

//       const newEvent = await response.json();
//       router.push(`/event/${newEvent.id}`);
//     } catch (err: any) {
//       setError(err.message || 'Failed to create event. Please try again.');
//       setCreating(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-slate-900 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
//               Event Tickets
//             </Link>
//             <div className="flex gap-4">
//               <Link
//                 href="/verify"
//                 className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
//               >
//                 Verify Ticket
//               </Link>
//               <Link
//                 href="/"
//                 className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
//               >
//                 View Events
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="mb-8">
//           <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
//             ← Back to Events
//           </Link>
//           <h1 className="text-4xl font-bold text-slate-900 mb-2">
//             Create New Event
//           </h1>
//           <p className="text-gray-600">
//             Add a new event for attendees to purchase tickets
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Event Name *
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="e.g., Lagos International Air Show 2025"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Describe your upcoming event..."
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
//                   Location *
//                 </label>
//                 <input
//                   type="text"
//                   id="location"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="e.g., TBS Lagos"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
//                   Event Date *
//                 </label>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
//                   Ticket Price (₦) *
//                 </label>
//                 <input
//                   type="number"
//                   id="price"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   min="1"
//                   step="1"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="e.g., 2000"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="bannerUrl" className="block text-sm font-semibold text-gray-700 mb-2">
//                   Banner URL (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   id="bannerUrl"
//                   name="bannerUrl"
//                   value={formData.bannerUrl}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="/event-banner.jpg"
//                 />
//               </div>
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//                 {error}
//               </div>
//             )}

//             <div className="flex gap-4 pt-4">
//               <button
//                 type="button"
//                 onClick={() => router.push('/')}
//                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-slate-900 font-semibold py-3 rounded-lg transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={creating}
//                 className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
//               >
//                 {creating ? 'Creating Event...' : 'Create Event'}
//               </button>
//             </div>
//           </form>
//         </div>

//         <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
//           <p className="text-sm text-blue-800">
//             <strong>Note:</strong> In this demo, events are stored in memory and will be lost when the server restarts.
//             For production, you would use a persistent database.
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// }






















// File: /app/create-event/page.tsx (UPDATED)

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { availableBanners } from '@/lib/data';

export default function CreateEventPage() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    price: '',
    category: '',
    bannerUrl: availableBanners[0].url
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.description || !formData.location || !formData.date || !formData.price) {
      setError('Please fill in all required fields');
      return;
    }

    if (Number(formData.price) <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    setCreating(true);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price)
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create event');
      }

      const newEvent = await response.json();
      router.push(`/event/${newEvent.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create event. Please try again.');
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Event
          </h1>
          <p className="text-gray-600 text-lg">
            Add a new event for attendees to discover and purchase tickets
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Event Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="e.g., Tech Innovation Summit 2025"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Describe your event..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="e.g., Convention Center, Lagos"
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                  Ticket Price (₦) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="e.g., 15000"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Select category</option>
                  <option value="Conference">Conference</option>
                  <option value="Concert">Concert</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Expo">Expo</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Banner Image
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableBanners.map((banner) => (
                  <button
                    key={banner.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, bannerUrl: banner.url }))}
                    className={`relative aspect-video rounded-xl overflow-hidden border-4 transition-all ${
                      formData.bannerUrl === banner.url
                        ? 'border-blue-600 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold text-center px-2">
                        {banner.name}
                      </span>
                    </div>
                    {formData.bannerUrl === banner.url && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-slate-900 font-semibold py-4 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105"
              >
                {creating ? 'Creating Event...' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> In this demo, events are stored in memory and will be lost when the server restarts. 
            For production, you would use a persistent database.
          </p>
        </div>
      </main>
    </div>
  );
}