import { blogsData } from "../../../utils/BlogData";

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
    openGraph: {
      type: "article",
      title: post.seoTitle || post.title,
      description: post.excerpt,
      url: `https://gopdfgo.com/blog/${post.id}`,
      images: [{ url: post.imageUrl, width: 1200, height: 675, alt: post.title }],
      publishedTime: post.publishedAt || undefined,
    },
    twitter: {
      card: "summary_large_image",
      images: [post.imageUrl],
    },
  };
}

export default function BlogLayout({ children }) {
  return <>{children}</>;
}