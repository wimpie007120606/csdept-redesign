-- Admin users for simple password auth
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- People (faculty, staff, researchers)
CREATE TABLE IF NOT EXISTS people (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  title TEXT,
  role TEXT,
  division TEXT,
  email_primary TEXT,
  email_secondary TEXT,
  phone TEXT,
  office TEXT,
  bio TEXT,
  research_interests_json TEXT,
  qualifications TEXT,
  links_json TEXT,
  image_key TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Publications (linked to person; for timeline by year)
CREATE TABLE IF NOT EXISTS publications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  person_id INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  citation TEXT NOT NULL,
  venue TEXT,
  tags_json TEXT,
  url TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_publications_person_id ON publications(person_id);
CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(year);

-- News
CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  body_md TEXT,
  cover_image_key TEXT,
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  body_md TEXT,
  location TEXT,
  start_at TEXT NOT NULL,
  end_at TEXT,
  cover_image_key TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Programmes (e.g. BSc Computer Science)
CREATE TABLE IF NOT EXISTS programmes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  focal_area TEXT,
  admission_requirements_md TEXT,
  continued_study_md TEXT,
  notes_md TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Programme years (year 1, 2, 3...)
CREATE TABLE IF NOT EXISTS programme_years (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  programme_id INTEGER NOT NULL REFERENCES programmes(id) ON DELETE CASCADE,
  year_number INTEGER NOT NULL,
  min_credits INTEGER,
  max_credits INTEGER,
  notes_md TEXT
);

CREATE INDEX IF NOT EXISTS idx_programme_years_programme_id ON programme_years(programme_id);

-- Programme modules (per year, with group name for focal areas)
CREATE TABLE IF NOT EXISTS programme_modules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  programme_year_id INTEGER NOT NULL REFERENCES programme_years(id) ON DELETE CASCADE,
  group_name TEXT,
  module_code TEXT NOT NULL,
  module_name TEXT NOT NULL,
  credits INTEGER NOT NULL,
  is_compulsory INTEGER NOT NULL DEFAULT 1,
  notes_md TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_programme_modules_programme_year_id ON programme_modules(programme_year_id);
