// // File: /lib/utils.ts

// import QRCode from 'qrcode';

// export async function generateQRCode(text: string): Promise<string> {
//   try {
//     const qrDataUrl = await QRCode.toDataURL(text, {
//       width: 300,
//       margin: 2,
//       color: {
//         dark: '#0F172A',
//         light: '#FFFFFF'
//       }
//     });
//     return qrDataUrl;
//   } catch (err) {
//     console.error('Error generating QR code:', err);
//     throw new Error('Failed to generate QR code');
//   }
// }

// export function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', { 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric' 
//   });
// }

// export function formatCurrency(amount: number): string {
//   return `₦${amount.toLocaleString()}`;
// }












// File: /lib/utils.ts (UPDATED)

import QRCode from 'qrcode';

export async function generateQRCode(text: string): Promise<string> {
  try {
    const qrDataUrl = await QRCode.toDataURL(text, {
      width: 300,
      margin: 2,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF'
      }
    });
    return qrDataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw new Error('Failed to generate QR code');
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export function formatCurrency(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getCategoryColor(category?: string): string {
  const colors: Record<string, string> = {
    'Conference': 'bg-blue-100 text-blue-800',
    'Expo': 'bg-purple-100 text-purple-800',
    'Concert': 'bg-pink-100 text-pink-800',
    'Workshop': 'bg-green-100 text-green-800',
    'Sports': 'bg-orange-100 text-orange-800',
  };
  return colors[category || ''] || 'bg-gray-100 text-gray-800';
}