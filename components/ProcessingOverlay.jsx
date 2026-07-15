"use client";

import React from "react";

// Full-screen processing indicator. The visuals are pure CSS keyframes
// (transform/opacity only) defined in globals.css, so they keep animating
// on the compositor thread even while pdf-lib blocks the main thread —
// which is exactly when the page used to look frozen.
export default function ProcessingOverlay({ show, title }) {
  if (!show) return null;

  return (
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

        <p className="gpg-proc-title">{title || "Processing your file…"}</p>

        <div className="gpg-proc-bar" aria-hidden="true">
          <span />
        </div>

        <div className="gpg-proc-msgs" aria-hidden="true">
          <span>Running right here in your browser</span>
          <span>Nothing is uploaded — 100% private</span>
          <span>Almost done…</span>
        </div>
      </div>
    </div>
  );
}
