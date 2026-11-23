/**
 * Horizontal project scroller (Featured work).
 *
 * Expects, inside `root`:
 *   [data-track]  the scroll container (cards are its children)
 *   [data-prev] / [data-next]  buttons
 *   [data-thumb]  the progress bar thumb
 *
 * - Prev/next and ←/→ move exactly one card + gap.
 * - The progress thumb is visible/total wide and follows scrollLeft.
 * - Mouse drag-to-scroll (touch keeps native scrolling), snapping to the nearest card on release.
 *   A drag never triggers the card link.
 * - Smooth scrolling unless the visitor prefers reduced motion.
 */

const DRAG_THRESHOLD = 5; // px of movement before a press counts as a drag

export function initProjectScroller(root: HTMLElement): void {
  const track = root.querySelector<HTMLElement>('[data-track]');
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const thumb = root.querySelector<HTMLElement>('[data-thumb]');
  if (!track || !prev || !next || !thumb) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const behavior = (): ScrollBehavior => (reducedMotion.matches ? 'auto' : 'smooth');

  /** Width of one card plus the gap: the distance between snap points. */
  const step = (): number => {
    const card = track.firstElementChild as HTMLElement | null;
    if (!card) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  const maxScroll = (): number => Math.max(0, track.scrollWidth - track.clientWidth);

  const scrollToIndex = (index: number): void => {
    const left = Math.min(Math.max(0, Math.round(index) * step()), maxScroll());
    track.scrollTo({ left, behavior: behavior() });
  };

  /** Move by whole cards from the nearest snap point, so repeated clicks stay aligned. */
  const move = (direction: -1 | 1): void => {
    scrollToIndex(Math.round(track.scrollLeft / step()) + direction);
  };

  // ---- Progress bar + button state --------------------------------------------------
  let frame = 0;
  const update = (): void => {
    frame = 0;
    const max = maxScroll();
    const x = track.scrollLeft;
    const visible = track.scrollWidth > 0 ? Math.min(1, track.clientWidth / track.scrollWidth) : 1;
    const progress = max > 0 ? x / max : 0;

    thumb.style.width = `${visible * 100}%`;
    // translateX is relative to the thumb's own width: travel = (1 - visible) / visible thumb widths.
    thumb.style.transform = `translateX(${visible > 0 ? progress * ((1 - visible) / visible) * 100 : 0}%)`;

    prev.disabled = x <= 1;
    next.disabled = x >= max - 1;
  };
  const scheduleUpdate = (): void => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  track.addEventListener('scroll', scheduleUpdate, { passive: true });
  new ResizeObserver(scheduleUpdate).observe(track);
  update();

  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));

  // ---- Keyboard ------------------------------------------------------------------------
  track.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    move(event.key === 'ArrowLeft' ? -1 : 1);
  });

  // ---- Mouse drag-to-scroll -----------------------------------------------------------
  let pointerId: number | null = null;
  let startX = 0;
  let startScroll = 0;
  let dragged = false;

  const endDrag = (): void => {
    if (pointerId === null) return;
    if (track.hasPointerCapture(pointerId)) track.releasePointerCapture(pointerId);
    pointerId = null;
    if (!dragged) return;

    // The click that follows this pointerup is dispatched in the same task, so it still sees
    // `dragged` and gets blocked; reset afterwards so later clicks (or Enter on a link) work.
    window.setTimeout(() => {
      dragged = false;
    }, 0);

    // Snap to the nearest card, then re-enable CSS snapping once that scroll has finished.
    scrollToIndex(track.scrollLeft / step());
    let done = false;
    const restoreSnap = (): void => {
      if (done) return;
      done = true;
      track.classList.remove('is-dragging');
    };
    track.addEventListener('scrollend', restoreSnap, { once: true });
    window.setTimeout(restoreSnap, 600); // fallback for browsers without `scrollend`
  };

  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScroll = track.scrollLeft;
    dragged = false;
  });

  track.addEventListener('pointermove', (event) => {
    if (event.pointerId !== pointerId) return;
    const dx = event.clientX - startX;
    if (!dragged) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      dragged = true;
      track.setPointerCapture(event.pointerId);
      track.classList.add('is-dragging');
    }
    event.preventDefault();
    track.scrollLeft = startScroll - dx;
  });

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('lostpointercapture', endDrag);

  // A drag must not open the card it ended on (capture phase runs before the link).
  track.addEventListener(
    'click',
    (event) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    },
    true,
  );

  // Native link/image dragging would cancel our pointer stream.
  track.addEventListener('dragstart', (event) => event.preventDefault());
}
