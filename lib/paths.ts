const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function detectBasePathFromPathname(pathname: string): string {
  const match = pathname.match(/^(.*?)(?:\/(en|zh))(?:\/|$)/);
  if (match) {
    return match[1] || '';
  }
  return '';
}

export function withBasePath(path: string): string {
  if (!path) return path;
  const runtimeBasePath =
    basePath ||
    (typeof window !== 'undefined'
      ? detectBasePathFromPathname(window.location.pathname)
      : '');
  if (!runtimeBasePath) return path;
  if (path.startsWith(runtimeBasePath)) return path;
  if (!path.startsWith('/')) {
    return `${runtimeBasePath}/${path}`.replace(/\/{2,}/g, '/');
  }
  return `${runtimeBasePath}${path}`.replace(/\/{2,}/g, '/');
}
