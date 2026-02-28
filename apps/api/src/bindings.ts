export interface Env {
  csdept_db: D1Database;
  csdept_assets: R2Bucket;
  JWT_SECRET: string;
  ADMIN_DEFAULT_USER?: string;
  ADMIN_DEFAULT_PASS?: string;
  CORS_ORIGIN?: string;
  /** Resend API key for newsletter and other transactional emails */
  RESEND_API_KEY?: string;
  /** From address for transactional emails (e.g. "CS Department <news@example.com>") */
  RESEND_FROM?: string;
}

export interface Variables {
  adminUser: string;
}
