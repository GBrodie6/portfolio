/**
 * Run non-critical setup after hydration, each call in its own task, so no
 * single task blocks the main thread. Returns a cancel function.
 */
export function afterIdle(cb: () => void, timeout = 1200): () => void {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(cb, 200);
  return () => window.clearTimeout(id);
}
