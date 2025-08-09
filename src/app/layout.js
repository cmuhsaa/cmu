import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chanchaitara Madla United High School Alumni Association",
  description:
    "Chanchaitara Madla United High School Alumni Association connects former students, fosters lifelong friendships, shares memories, and supports community development through events and initiatives.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          property="og:title"
          content="Chanchaitara Madla United High School Alumni Association"
        />
        <meta
          property="og:description"
          content="Connecting past and present students of Chanchaitara Madla United High School."
        />
        <meta
          property="og:image"
          content="https://cmu-alumni.com/og-image.jpg"
        />
        <meta property="og:url" content="https://cmu-alumni.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Chanchaitara Madla United High School Alumni Association"
        />
        <meta
          name="twitter:description"
          content="Join the official alumni association and reconnect with old friends."
        />
        <meta
          name="twitter:image"
          content="https://cmu-alumni.com/og-image.jpg"
        />
      </head>
      <StoreProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
        >
          <Toast />
          <main className="mx-auto min-h-screen">{children}</main>
          <Footer />
        </body>
      </StoreProvider>
    </html>
  );
}
