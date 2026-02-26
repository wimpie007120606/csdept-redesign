#!/usr/bin/env node
/**
 * Seeds D1 with content data and creates admin user.
 * Requires: wrangler in PATH, and .dev.vars or env JWT_SECRET, ADMIN_DEFAULT_PASS.
 * Run from repo root: node scripts/seed.js
 * Or: JWT_SECRET=your-secret ADMIN_DEFAULT_PASS=admin123 node scripts/seed.js
 */

import { readFileSync, existsSync, writeFileSync, unlinkSync } from 'fs';
import { pbkdf2Sync } from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function loadDevVars() {
  const path = join(root, 'apps/api', '.dev.vars');
  if (!existsSync(path)) return {};
  const content = readFileSync(path, 'utf8');
  const out = {};
  for (const line of content.split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
  return out;
}

const env = { ...process.env, ...loadDevVars() };
const JWT_SECRET = env.JWT_SECRET || 'dev-secret-change-in-production';
const ADMIN_DEFAULT_PASS = env.ADMIN_DEFAULT_PASS || 'admin123';
const ADMIN_USER = env.ADMIN_DEFAULT_USER || 'admin';

// Match Worker's hash: PBKDF2 with secret.slice(0,16) as salt, 100000 iterations, SHA-256, 256 bits
function hashPassword(password, secret) {
  const salt = Buffer.from(secret.slice(0, 16), 'utf8');
  return pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString('hex');
}

const passwordHash = hashPassword(ADMIN_DEFAULT_PASS, JWT_SECRET);

function run(cmd) {
  execSync(cmd, { cwd: root, stdio: 'inherit' });
}

console.log('Seeding content data...');
run('npx wrangler d1 execute csdept_db --remote --config apps/api/wrangler.toml --file db/seed/seed.sql');

console.log('Creating admin user...');
const adminSql = `-- Admin user (password hashed with PBKDF2)
DELETE FROM admin_users WHERE username = '${ADMIN_USER.replace(/'/g, "''")}';
INSERT INTO admin_users (username, password_hash) VALUES ('${ADMIN_USER.replace(/'/g, "''")}', '${passwordHash}');
`;
const tmpFile = join(root, 'db', 'seed', '.seed-admin.sql');
writeFileSync(tmpFile, adminSql);
try {
  run(`npx wrangler d1 execute csdept_db --remote --config apps/api/wrangler.toml --file db/seed/.seed-admin.sql`);
} finally {
  unlinkSync(tmpFile);
}

console.log('Seed done. Admin:', ADMIN_USER);
console.log('Default dev password: admin123 (set ADMIN_DEFAULT_PASS in apps/api/.dev.vars or env)');
