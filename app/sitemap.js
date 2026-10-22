import { blogsData } from "../utils/BlogData";
import { SITE, STATIC_PAGES, BLOG_LASTMOD_FLOOR } from "../utils/sitemapData";

/**
 * sitemap.xml, built from the data rather than hand-edited.
 *
 * The hand-written file had drifted: 6 of 99 URLs carried an October date while
 * the server was reporting Last-Modified 17 October, so Google had no reason to
 * recrawl anything that had actually changed. Worse, adding a post meant
 * remembering to edit two files, and the /blogs index — whose entire content is
 * the list of posts — was stale by three months before anyone noticed.
 *
 * The one rule this must never break: a lastmod may move forward, never back.
 * Telling Google a page just got older is worse than telling it nothing. So
 * every date is the LATEST of what we already published (the floor), the post's
 * publishedAt, and its updatedAt. Generating straight from publishedAt would
 * have dragged 33 posts months into the past — see utils/sitemapData.js.
 *
 * Adding a post now needs no sitemap edit at all: it brings its own publishedAt,
 * and /blogs follows it automatically. Editing a post means setting updatedAt on
 * it in BlogData.js, which is where that fact belongs anyway.
 */

// sitemap.js is a Route Handler under the hood, and `output: "export"` refuses
// to build one that has not declared itself static. Nothing here reads a
// request, so force-static is simply stating the truth.
export const dynamic = "force-static";

/** Latest of the given YYYY-MM-DD strings; ignores blanks. Lexical compare is
 *  safe here precisely because the format is zero-padded and fixed-width. */
const latest = (...dates) => {
  const real = dates.filter(Boolean).sort();
  return real[real.length - 1];
};

export default function sitemap() {
  const blogEntries = blogsData.map((post) => ({
    url: `${SITE}/blog/${post.id}`,
    lastModified: latest(
      BLOG_LASTMOD_FLOOR[post.id],
      post.publishedAt,
      post.updatedAt,
    ),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const newestPost = latest(...blogEntries.map((e) => e.lastModified));

  const staticEntries = STATIC_PAGES.map((page) => ({
    // The homepage is listed without a trailing slash, and that is not cosmetic:
    // .htaccess 301s every trailing-slash URL to the bare form, so emitting
    // "https://gopdfgo.com/" would put a redirect in our own sitemap.
    url: page.path === "/" ? SITE : `${SITE}${page.path}`,
    // /blogs renders every post, so publishing one genuinely changes it. This is
    // the edit that kept being forgotten.
    lastModified:
      page.path === "/blogs" ? latest(page.lastmod, newestPost) : page.lastmod,
    changeFrequency: page.changefreq,
    priority: Number(page.priority),
  }));

  return [...staticEntries, ...blogEntries];
}
