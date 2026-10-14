import React from "react";

/**
 * Sticky right rail, the way iLovePDF lays a tool out.
 *
 * The page keeps scrolling while the rail — options, the action button, the
 * download button — stays pinned beside the preview, and the moment the preview
 * column runs out the rail scrolls away with it so the prose underneath reads
 * exactly as it did before. That is `position: sticky`, not `fixed`: a sticky
 * box is bounded by its own parent, so it releases at the end of the row for
 * free, with no scroll listener and no measuring.
 *
 * Two things make or break it here, both verified in a real browser against the
 * built site rather than reasoned about:
 *
 *   1. Sticky latches onto the NEAREST SCROLL CONTAINER. Every ancestor between
 *      this component and <body> must leave overflow alone. The tool card used
 *      to carry `overflow-hidden` purely to clip its own rounded corners, and
 *      that one token was enough to make the rail scroll away like static
 *      content. It is gone now, and the children that actually touch the card's
 *      corners carry the radius instead.
 *
 *   2. Sticky needs TRAVEL. The rail can only pin for as long as its parent row
 *      is taller than the rail itself, and the row is as tall as the preview
 *      column. Short preview, no pinning — which is correct, not a bug: there is
 *      nothing to scroll past yet.
 *
 * `rail` only ever swaps className strings; the tree shape is identical either
 * way. Switching between a fragment and a wrapper would remount the preview
 * subtree on the 0 -> 1 file transition and throw away loaded thumbnails.
 *
 * `action` renders exactly once. An earlier design mirrored it into a phone-only
 * bottom bar, but the action slot owns `resultRef` and the component scrolls to
 * it after a job finishes — duplicating it would give that ref two targets.
 * Below `lg` the rail simply stacks under the preview, which is what the tool
 * did before this component existed.
 */
const ToolShell = ({ rail = true, preview, controls, action }) => (
  <div className={rail ? "lg:flex lg:items-start lg:gap-8" : ""}>
    {/* min-w-0 is load-bearing: a flex item defaults to min-width:auto, so one
        wide thumbnail grid would push the rail off the card instead of
        shrinking. */}
    <div className={rail ? "min-w-0 flex-1" : ""}>{preview}</div>

    <aside
      className={
        rail
          ? // max-h + overflow-y-auto keep a tall rail from outgrowing the
            // viewport — a sticky box taller than the screen can never finish
            // scrolling into view. Per spec, setting one overflow axis makes the
            // other compute to `auto` too, so the inner padding is what keeps the
            // CTA's drop shadow from being shaved off: do not drop lg:p-5.
            "mt-6 w-full lg:mt-0 lg:w-80 xl:w-96 lg:shrink-0 lg:self-start " +
            "lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto " +
            "lg:overscroll-contain lg:rounded-2xl lg:border lg:border-slate-200 " +
            "lg:bg-slate-50/60 lg:p-5 lg:shadow-sm"
          : ""
      }
    >
      {controls}
      {action}
    </aside>
  </div>
);

/* The header is `sticky top-0` with an h-20 (80px) bar, so anything that pins
   below it needs to clear 80px. top-24 is 96px, leaving a 16px gutter. Exported
   so the image editor pins at exactly the same offset as the PDF editor. */
export const STICKY_TOP = "lg:top-24";

export default ToolShell;
