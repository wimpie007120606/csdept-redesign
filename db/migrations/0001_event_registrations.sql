-- Event registrations (separate from newsletter subscribers)
CREATE TABLE IF NOT EXISTS event_registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(event_id, email)
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
