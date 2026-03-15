// ============================================================================
// Supabase Database Types — Tapé Paraguay
// Mirrors the schema in supabase/migrations/001_init.sql
// ============================================================================

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          subject?: string;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          tour_slug: string | null;
          tour_title: string | null;
          segment: string | null;
          full_name: string;
          email: string;
          phone: string | null;
          preferred_date: string | null;
          group_size: number;
          message: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          tour_slug?: string | null;
          tour_title?: string | null;
          segment?: string | null;
          full_name: string;
          email: string;
          phone?: string | null;
          preferred_date?: string | null;
          group_size?: number;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          tour_slug?: string | null;
          tour_title?: string | null;
          segment?: string | null;
          full_name?: string;
          email?: string;
          phone?: string | null;
          preferred_date?: string | null;
          group_size?: number;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
          active: boolean;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
          active?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string;
          active?: boolean;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Convenience type aliases
export type Contact = Database["public"]["Tables"]["contacts"]["Row"];
export type ContactInsert = Database["public"]["Tables"]["contacts"]["Insert"];

export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];

export type NewsletterSubscriber =
  Database["public"]["Tables"]["newsletter_subscribers"]["Row"];
export type NewsletterSubscriberInsert =
  Database["public"]["Tables"]["newsletter_subscribers"]["Insert"];
