// File: /lib/types.ts (UPDATED)

export type Event = {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  price: number;
  bannerUrl: string;
  category?: string;
  closed?: boolean;
  closedAt?: string;
};

export type Ticket = {
  code: string;
  eventId: string;
  buyerName: string;
  buyerEmail: string;
  used: boolean;
  purchasedAt: string;
};

export type Attendee = {
  id: string;
  name: string;
  email: string;
  ticketId: string;
  eventId: string;
  purchaseDate: string;
  checkedIn: boolean;
};

export type EventStats = {
  eventId: string;
  eventName: string;
  totalTickets: number;
  checkedIn: number;
  revenue: number;
};

export type DashboardStats = {
  totalEvents: number;
  totalTickets: number;
  totalCheckedIn: number;
  totalRevenue: number;
  upcomingEvents: number;
  closedEvents: number;
};