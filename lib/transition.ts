// Bridges a view transition and the App Router: TransitionLink starts the
// transition and pushes the route; RouteEvents resolves it once the new page
// has committed, so the browser captures the new state.
let pending: (() => void) | null = null;

export function waitForRoute(): Promise<void> {
  return new Promise((resolve) => {
    pending = resolve;
    // Never hold the page if the route does not change for some reason.
    window.setTimeout(() => routeDone(), 1500);
  });
}

export function routeDone() {
  const r = pending;
  pending = null;
  r?.();
}
