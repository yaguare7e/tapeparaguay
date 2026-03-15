-- ============================================================================
-- Tapé Paraguay — Initial Database Schema
-- Run this in the Supabase SQL Editor after creating your project.
-- ============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------------
-- Contacts table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contacts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_contacts_email ON contacts (email);
CREATE INDEX idx_contacts_created_at ON contacts (created_at DESC);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Service role can do everything; anon/authenticated have no access
CREATE POLICY "Service role full access on contacts"
  ON contacts
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ---------------------------------------------------------------------------
-- Bookings table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_slug       TEXT,
  tour_title      TEXT,
  segment         TEXT,
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  preferred_date  TEXT,
  group_size      INTEGER NOT NULL DEFAULT 1,
  message         TEXT,
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_bookings_email ON bookings (email);
CREATE INDEX idx_bookings_status ON bookings (status);
CREATE INDEX idx_bookings_created_at ON bookings (created_at DESC);
CREATE INDEX idx_bookings_tour_slug ON bookings (tour_slug);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on bookings"
  ON bookings
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ---------------------------------------------------------------------------
-- Newsletter subscribers table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  active        BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers (email);
CREATE INDEX idx_newsletter_active ON newsletter_subscribers (active) WHERE active = true;

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on newsletter_subscribers"
  ON newsletter_subscribers
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
