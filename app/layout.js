import "./globals.css";
import Header from "../components/Header"; 
import Footer from "../components/Footer";
import Script from "next/script";

// Yeh function Google ko title, description aur base URL dega
export const metadata = {
  title: "GoPDFGo – Free PDF & Image Tools Online",
  description: "Secure, serverless, and free digital tools for everyone. We process your files locally in your browser.",
  metadataBase: new URL('https://gopdfgo.com'),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning 
    >
      <head>
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7106106075518883"
          crossOrigin="anonymous"
          strategy="afterInteractive" 
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GoPDFGo",
              url: "https://gopdfgo.com/",
            }),
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