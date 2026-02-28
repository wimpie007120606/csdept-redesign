-- Index for lookups by email (e.g. "already registered" checks)
CREATE INDEX IF NOT EXISTS idx_event_registrations_email ON event_registrations(email);
