export interface Env {
  csdept_db: D1Database;
  csdept_assets: R2Bucket;
  JWT_SECRET: string;
  ADMIN_DEFAULT_USER?: string;
  ADMIN_DEFAULT_PASS?: string;
  CORS_ORIGIN?: string;
}

export interface Variables {
  adminUser: string;
}
