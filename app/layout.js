import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Yeh function Google ko title, description aur base URL dega
export const metadata = {
  title: "GoPDFGo – Free PDF & Image Tools Online",
  description: "Secure, serverless, and free digital tools for everyone. We process your files locally in your browser.",
  metadataBase: new URL('https://gopdfgo.com'),
  // Site-wide social cards. og:title/og:description automatically fall back to
  // each page's own title/description, so every page gets a proper card.
  openGraph: {
    siteName: "GoPDFGo",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/icon.png",
        width: 1200,
        height: 1200,
        alt: "GoPDFGo – Free, private PDF & image tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning 
    >
      <head>
        {/* Google AdSense — loaded AFTER window load so its managed-script
            injection can't shift <head> nodes mid-hydration (raw <script async>
            here caused React hydration mismatches, and next/script adds a
            data-nscript attribute AdSense's head-tag checker flags). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.addEventListener('load',function(){var s=document.createElement('script');s.async=true;s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7106106075518883';s.crossOrigin='anonymous';document.head.appendChild(s);});",
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "GoPDFGo",
                url: "https://gopdfgo.com",
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "GoPDFGo",
                url: "https://gopdfgo.com",
                logo: "https://gopdfgo.com/images/logo.webp",
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "contact.gopdfgo@gmail.com",
                  contactType: "customer support",
                },
              },
            ]),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <div id="root" className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
          <Header />
          
          <main className="grow">
            {children}
          </main>
          
          <Footer />
        </div>
      </body>
    </html>
  );
}