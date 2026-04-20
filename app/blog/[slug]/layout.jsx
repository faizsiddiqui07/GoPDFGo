import { blogsData } from "../../../utils/BlogData"; // Path check kar lijiyega

// 1. YEH HAI WO MISSING FUNCTION (Jo saare URLs ki list Next.js ko dega)
export async function generateStaticParams() {
  return blogsData.map((post) => ({
    slug: post.id,
  }));
}

// 2. SEO Metadata (Jo humne pehle set kiya tha)
export async function generateMetadata({ params }) {
  const resolvedParams = await params; 
  const slug = resolvedParams.slug;

  const post = blogsData.find((p) => p.id === slug);
  
  if (!post) {
    return { title: "Post Not Found | GoPDFGo" };
  }

  return {
    title: post.seoTitle || `${post.title} | GoPDFGo`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `https://gopdfgo.com/blog/${post.id}`,
    },
  };
}

export default function BlogLayout({ children }) {
  return <>{children}</>;
}