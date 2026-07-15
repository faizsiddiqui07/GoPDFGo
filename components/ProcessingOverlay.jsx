"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Full-screen processing indicator.
 *
 * Rendered through a PORTAL into <body> on purpose: the tool pages are wrapped
 * in `animate-fade-in-up`, and a transformed ancestor becomes the containing
 * block for position:fixed — which would drop this into the middle of the tall
 * page instead of the viewport. Portalling out of that subtree makes
 * position:fixed mean "the viewport" again, so it is always perfectly centred
 * on any screen size and for any card height.
 *
 * Every animation is transform/opacity only, so it keeps running on the
 * compositor thread while pdf-lib / canvas block the main thread.
 *
 * @param progress  0..100 for a real determinate bar, or null for indeterminate
 * @param subtitle  small line under the title, e.g. "Image 3 of 8"
 * @param note      reassurance line, e.g. "Saved 4.2 MB so far"
 */
export default function ProcessingOverlay({
  show,
  title,
  subtitle = null,
  note = null,
  progress = null,
  eta = 0,
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Lock background scrolling while the overlay is up. The padding swap keeps
  // the page from jumping sideways when the scrollbar is removed.
  useEffect(() => {
    if (!show) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [show]);

  if (!show || !mounted) return null;

  const determinate = typeof progress === "number" && !Number.isNaN(progress);
  const pct = determinate ? Math.max(0, Math.min(100, Math.round(progress))) : 0;

  return createPortal(
    <div
      className="gpg-proc-overlay"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="gpg-proc-card">
        <div className="gpg-proc-stage" aria-hidden="true">
          <div className="gpg-proc-orbit">
            <span className="gpg-proc-dot" />
            <span className="gpg-proc-dot gpg-proc-dot2" />
          </div>
          <div className="gpg-proc-doc">
            <span className="gpg-proc-line w1" />
            <span className="gpg-proc-line w2" />
            <span className="gpg-proc-line w3" />
            <span className="gpg-proc-scan" />
          </div>
        </div>

        {/* the filename can be long — clamp it rather than stretch the card */}
        <p className="gpg-proc-title gpg-proc-name">
          {title || "Processing your file…"}
        </p>
        {subtitle && <p className="gpg-proc-sub">{subtitle}</p>}

        {determinate ? (
          <>
            <div className="gpg-proc-bar" aria-hidden="true">
              {/* scaleX keeps the fill on the compositor — no layout on each tick */}
              <span
                className="gpg-proc-fill"
                style={{ transform: `scaleX(${pct / 100})` }}
              />
            </div>
            <div className="gpg-proc-meta" aria-hidden="true">
              <span>{pct}%</span>
              {eta > 0 && <span>~{eta}s left</span>}
            </div>
            {note && <p className="gpg-proc-note">{note}</p>}
          </>
        ) : (
          <>
            <div className="gpg-proc-bar" aria-hidden="true">
              <span className="gpg-proc-indet" />
            </div>
            <div className="gpg-proc-msgs" aria-hidden="true">
              <span>Running right here in your browser</span>
              <span>Nothing is uploaded — 100% private</span>
              <span>Almost done…</span>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
