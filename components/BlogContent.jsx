"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Wraps the server-rendered article body and keeps its links client-side.
 *
 * Blog bodies are raw HTML injected with dangerouslySetInnerHTML, so their
 * internal <a> tags are plain anchors that Next's router does not know about —
 * clicking one would trigger a full page reload. This intercepts those clicks
 * and routes them instead.
 *
 * It exists as its own client component so the page itself can stay a server
 * component: the article HTML is rendered on the server and passed in as
 * children, which keeps the entire blogsData module out of the client bundle.
 */
export default function BlogContent({ children }) {
  const router = useRouter();
  const contentRef = useRef(null);

  useEffect(() => {
    const handleLinkClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      // Internal links only. Anything external, or an anchor with no href,
      // keeps the browser's default behaviour.
      if (href && href.startsWith("/")) {
        e.preventDefault();
        router.push(href);
        window.scrollTo(0, 0);
      }
    };

    const container = contentRef.current;
    if (container) container.addEventListener("click", handleLinkClick);
    return () => {
      if (container) container.removeEventListener("click", handleLinkClick);
    };
  }, [router]);

  return <div ref={contentRef}>{children}</div>;
}
