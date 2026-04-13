const BASE = import.meta.env.VITE_VIDEO_BASE ?? '';

export function videoSrc(path: string): string {
  return `${BASE}${path}`;
}
