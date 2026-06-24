import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const siteUrl = "https://www.trustysignatures.com/";
const siteName = "Trusty Signature";
const description =
  "Review Ethereum wallet activity and uncover potentially dangerous signatures with Trusty Signature.";

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
      
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
