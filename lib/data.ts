// File: /lib/data.ts (UPDATED)

import { Event, Ticket, Attendee } from './types';

export const events: Event[] = [
  {
    id: "1",
    name: "Tech Innovation Summit 2025",
    description: "Join industry leaders and innovators for a day of inspiring talks and networking.",
    location: "Convention Center, Lagos",
    date: "2025-11-05",
    price: 15000,
    bannerUrl: "/banners/tech-summit.jpg",
    category: "Conference",
    closed: false
  },
  {
    id: "2",
    name: "Business Networking Expo 2025",
    description: "Connect with entrepreneurs, investors, and business leaders.",
    location: "Eagle Square, Abuja",
    date: "2025-12-10",
    price: 20000,
    bannerUrl: "/banners/business-expo.jpg",
    category: "Expo",
    closed: false
  },
  {
    id: "3",
    name: "Music Festival Live 2025",
    description: "Experience an unforgettable night with top artists and performers.",
    location: "National Stadium, Port Harcourt",
    date: "2025-10-20",
    price: 10000,
    bannerUrl: "/banners/music-festival.jpg",
    category: "Concert",
    closed: false
  }
];

export const tickets: Ticket[] = [];

export const attendees: Attendee[] = [];

export const availableBanners = [
  { id: 'tech-summit', url: '/banners/tech-summit.jpg', name: 'Tech Summit' },
  { id: 'business-expo', url: '/banners/business-expo.jpg', name: 'Business Expo' },
  { id: 'music-festival', url: '/banners/music-festival.jpg', name: 'Music Festival' },
  { id: 'conference', url: '/banners/conference.jpg', name: 'Conference' },
  { id: 'concert', url: '/banners/concert.jpg', name: 'Concert' },
  { id: 'workshop', url: '/banners/workshop.jpg', name: 'Workshop' },
  { id: 'sports', url: '/banners/sports.jpg', name: 'Sports Event' },
  { id: 'default', url: '/banners/default.jpg', name: 'Default' }
];