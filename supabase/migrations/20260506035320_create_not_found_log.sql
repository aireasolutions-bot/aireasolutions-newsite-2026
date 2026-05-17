/*
  # Not Found Log

  Logs requests to pages that no longer exist on the new site. Used to identify
  legacy Google-indexed URLs and prioritize 301 redirect mappings.

  1. New Tables
    - `not_found_log`
      - `id` (uuid, primary key)
      - `path` (text, the 404 URL pathname)
      - `referrer` (text, document.referrer)
      - `user_agent` (text, browser UA)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow anonymous INSERT so public visitors can log 404s
    - No public SELECT (internal analytics only via service role)
*/

CREATE TABLE IF NOT EXISTS not_found_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL DEFAULT '',
  referrer text NOT NULL DEFAULT '',
  user_agent text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS not_found_log_path_idx ON not_found_log (path);
CREATE INDEX IF NOT EXISTS not_found_log_created_at_idx ON not_found_log (created_at DESC);

ALTER TABLE not_found_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can log 404s"
  ON not_found_log FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
