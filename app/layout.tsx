import "./globals.css"
import "./global-fixes.css"
import { Inter } from "next/font/google"
import type { Metadata, Viewport } from "next"
import { LoaderWrapper } from "@/components/LoaderWrapper"
import Script from "next/script"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  themeColor: '#FFD700',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://gafadichat.com'),
  title: "GAFADI CHAT",
  description: "GAFADI CHAT - The official anonymous chat platform for Trinity International College, Nepal. Created by Saksham Jaiswal, this secure messaging app connects college students for private and verified communication.",
  generator: 'v0.dev',
  manifest: '/manifest.json',
  keywords: [
    'Trinity International College',
    'Trinity College Nepal',
    'GAFADI CHAT',
    'Saksham Jaiswal',
    'College Chat App',
    'Nepal College Communication',
    'Anonymous College Chat',
    'Trinity College Chat',
    'Gafadi Chat',
    'Gafadi Chat Saksham Jaiswal',
    'Gafadi Chat Saksham',
    'Gafadi Chat Trinity',
    'College Messaging App',
    'Nepal Student Platform'
  ].join(', '),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GAFADI CHAT',
  },
  icons: {
    icon: '/images/gafadi-logo.webp',
    apple: '/images/gafadi-logo.webp',
  },
  openGraph: {
    title: 'GAFADI CHAT - Official Chat Platform for Trinity International College | Saksham Jaiswal',
    description: 'GAFADI CHAT - The official anonymous chat platform for Trinity International College, Nepal. Created by Saksham Jaiswal, this secure messaging app connects college students for private and verified communication.',
    url: 'https://gafadichat.com',
    siteName: 'GAFADI CHAT - Trinity International College',
    images: [
      {
        url: '/images/gafadi-logo.webp',
        width: 512,
        height: 512,
        alt: 'GAFADI CHAT - Trinity International College Official Chat Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GAFADI CHAT - Official Chat Platform for Trinity International College | Saksham Jaiswal',
    description: 'GAFADI CHAT - The official anonymous chat platform for Trinity International College, Nepal. Created by Saksham Jaiswal, this secure messaging app connects college students for private and verified communication.',
    images: ['/images/gafadi-logo.webp'],
  },
  alternates: {
    canonical: 'https://gafadichat.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFD700" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GAFADI CHAT" />
        <link rel="apple-touch-icon" href="/images/gafadi-logo.webp" />
        <meta name="google-site-verification" content="JSx6inUKwIHj8rav44pIU_b9jzCjJ7-kwzTU0x0yUeY" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/KOMIKAX_.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/images/gafadi-logo.webp" as="image" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//static.hotjar.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://static.hotjar.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Saksham Jaiswal" />
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Kathmandu" />
        <meta name="geo.position" content="27.7172;85.3240" />
        <meta name="ICBM" content="27.7172, 85.3240" />
        
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "GAFADI CHAT - Trinity International College Official Chat Platform",
              "description": "The official anonymous chat platform for Trinity International College Students. Created by Saksham Jaiswal, this secure messaging app connects college students for private and verified communication.",
              "url": "https://gafadichat.com",
              "applicationCategory": "CommunicationApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Anonymous Chatting",
                "Private Messaging",
                "Verified Users",
                "Real-time Communication"
              ],
              "author": {
                "@type": "Person",
                "name": "Saksham Jaiswal",
                "url": "https://sakshamjaiswal.com.np",
                "image": "https://gafadichat.com/images/saksham-jaiswal.webp",
                "jobTitle": "Creator",
                "affiliation": {
                  "@type": "Organization",
                  "name": "Trinity International College"
                }
              },
              "publisher": {
                "@type": "Organization",
                "name": "Trinity International College",
                "url": "https://trinity.edu.np"
              },
              "location": {
                "@type": "Place",
                "name": "Trinity International College",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "Nepal",
                  "addressLocality": "Kathmandu"
                }
              },
              "keywords": [
                "Trinity International College",
                "Trinity College Nepal",
                "GAFADI CHAT",
                "Saksham Jaiswal",
                "College Chat App",
                "Nepal College Communication",
                "Anonymous College Chat",
                "Trinity College Chat",
                "College Messaging App",
                "Nepal Student Platform"
              ]
            })
          }}
        />

        {/* Additional Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Trinity International College",
              "url": "https://trinity.edu.np",
              "logo": "/images/gafadi-logo.webp",
              "sameAs": [
                "https://trinity.edu.np",
                "https://sakshamjaiswal.com.np"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+977-9840580295",
                "contactType": "customer service",
                "areaServed": "NP",
                "availableLanguage": ["English", "Nepali"]
              }
            })
          }}
        />

        {/* Schema.org Person markup for Saksham Jaiswal */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Saksham Jaiswal",
              "url": "https://sakshamjaiswal.com.np",
              "image": "https://gafadichat.com/images/saksham-jaiswal.webp",
              "jobTitle": "Creator of GAFADI CHAT",
              "affiliation": {
                "@type": "Organization",
                "name": "Trinity International College"
              },
              "sameAs": [
                "https://github.com/sakriki", 
                "https://youtube.com/@techrikiyt" 
                // Add other social media or portfolio links here
              ]
            })
          }}
        />

        {/* Hotjar Tracking Code for https://gafadichat.com */}
        <Script id="hotjar-6457827" strategy="lazyOnload">
          {`(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6457827,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>

        <meta name="google-adsense-account" content="ca-pub-9719198394780450" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9719198394780450"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        
      </head>
      <body className={inter.className}>
        <LoaderWrapper>
          {children}
        </LoaderWrapper>
      </body>
    </html>
  )
}
