-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  starts_at TEXT,
  ends_at TEXT,
  location TEXT,
  capacity INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, email)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id 
ON event_registrations(event_id);

CREATE INDEX IF NOT EXISTS idx_event_registrations_email 
ON event_registrations(email);
