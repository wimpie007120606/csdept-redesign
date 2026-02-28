/**
 * GET /api/health/news — Debug endpoint to verify news API is deployed and reachable.
 * Visit https://cs.vantondertech.dev/api/health/news → must return ok JSON.
 * Verification: curl -s https://cs.vantondertech.dev/api/health/news | jq
 */
export const onRequestGet = async () => {
  const hasEnv: Record<string, boolean> = {};
  try {
    if (typeof process !== 'undefined' && process.env) {
      hasEnv.NODE_ENV = !!process.env.NODE_ENV;
    }
  } catch {
    // Cloudflare Workers/Pages: no process.env
  }
  const body = {
    ok: true,
    runtime: 'cloudflare-pages',
    hasEnv,
    time: new Date().toISOString(),
  };
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
  });
};
