/*
  # Audit Requests

  1. New Tables
    - `audit_requests` - captures "Book Audit" submissions from the hero / contact CTAs.
      - id (uuid, PK)
      - name (text)
      - email (text)
      - company (text, optional)
      - message (text, optional)
      - source (text, default 'hero') - which CTA triggered the request
      - created_at (timestamptz)

  2. Security
    - RLS enabled.
    - Public (anon + authenticated) may INSERT submissions (public-facing form).
    - Only authenticated users may SELECT their own submissions by email match.
    - No UPDATE or DELETE policies (records are immutable).
*/

CREATE TABLE IF NOT EXISTS audit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT 'hero',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE audit_requests ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'audit_requests' AND policyname = 'Anyone can submit an audit request'
  ) THEN
    CREATE POLICY "Anyone can submit an audit request"
      ON audit_requests FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'audit_requests' AND policyname = 'Authenticated can view own by email'
  ) THEN
    CREATE POLICY "Authenticated can view own by email"
      ON audit_requests FOR SELECT
      TO authenticated
      USING (email = (auth.jwt() ->> 'email'));
  END IF;
END $$;
