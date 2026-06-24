import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const siteUrl = "https://www.trustysignatures.com/";
const siteName = "Trusty Signature";
const description =
  "Scan and remove malicious wallet signatures with Trusty Signatures. Stay protected by deathorizing hidden phishing contracts before they drain your assets.";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  keywords: [
    "Ethereum signature checker",
    "wallet security",
    "token approvals",
    "crypto security",
    "Trusty Signature",
    "malicious wallet signatures",
    "phishing contracts",
    "crypto asset protection",
    "signature scanner",
    "wallet safety",
    
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/logo.png", type: "image/png", sizes: "512x512" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: siteName,
    description,
    images: [
      {
        url: "/thumbnail2.png",
        width: 1200,
        height: 630,
        alt: `${siteName} wallet security checker`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/thumbnail2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>  
        <meta property="og:image" content="/thumbnail2.png" />
        <meta property="twitter:image" content="/thumbnail2.png" />
        <meta name="google-site-verification" content="t7gqPsg2K0ZbQjmLMwirZnYrRJBeU7m1ndUSWc4SGkQ" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
