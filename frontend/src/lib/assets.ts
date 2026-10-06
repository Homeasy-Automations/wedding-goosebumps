const ASSET_BASE = "https://img.weddinggoosebumps.com";
export function r2(path: string) {
  const clean = path.replace(/^\/+/, "");
  // Let Next.js / the browser handle encoding; do not pre-encode to avoid %2520
  return `${ASSET_BASE}/${clean}`;
}
