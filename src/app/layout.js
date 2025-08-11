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
  title:
    "Chanchaitara Madla United High School Alumni Association | চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয় এলামনাই অ্যাসোসিয়েশন",
  description:
    "Chanchaitara Madla United High School Alumni Association (চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয় প্রাক্তন শিক্ষার্থী সমিতি) brings together alumni, preserves memories, builds friendships, and supports community growth through events and social initiatives. প্রাক্তন ছাত্রছাত্রীদের মিলন, স্মৃতিচারণ, বন্ধুত্ব ও সমাজ উন্নয়ন একসাথে।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          property="og:title"
          content="Chanchaitara Madla United High School Alumni Association | চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয় এলামনাই অ্যাসোসিয়েশন"
        />
        <meta
          property="og:description"
          content="Chanchaitara Madla United High School Alumni Association (চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয় প্রাক্তন শিক্ষার্থী সমিতি) brings together alumni, preserves memories, builds friendships, and supports community growth through events and social initiatives. প্রাক্তন ছাত্রছাত্রীদের মিলন, স্মৃতিচারণ, বন্ধুত্ব ও সমাজ উন্নয়ন একসাথে।"
        />
        <meta
          property="og:image"
          content="https://www.cmu-alumni.com/og-image.jpg"
        />
        <meta property="og:url" content="https://www.cmu-alumni.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Chanchaitara Madla United High School Alumni Association | চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয় এলামনাই অ্যাসোসিয়েশন"
        />
        <meta
          name="twitter:description"
          content="Chanchaitara Madla United High School Alumni Association (চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয় প্রাক্তন শিক্ষার্থী সমিতি) brings together alumni, preserves memories, builds friendships, and supports community growth through events and social initiatives. প্রাক্তন ছাত্রছাত্রীদের মিলন, স্মৃতিচারণ, বন্ধুত্ব ও সমাজ উন্নয়ন একসাথে।"
        />
        <meta
          name="twitter:image"
          content="https://www.cmu-alumni.com/og-image.jpg"
        />
        <meta
          name="google-site-verification"
          content="IiHLaPPFMPq69YZrzoKYfBvJ20M63oT21KT4pX5df60"
        />
      </head>
      <StoreProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          style={{
            background: `
        /* Paper texture (on top) */
        radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
        
        /* Aurora gradient (underneath) */
        radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
            linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `,
            backgroundSize: `
      8px 8px, 32px 32px, 32px 32px, 
      auto, auto, auto, auto, auto
    `,
            backgroundAttachment: `
      fixed, fixed, fixed, 
      fixed, fixed, fixed, fixed, fixed
    `,
          }}
        >
          <Toast />
          <main className="mx-auto min-h-screen">{children}</main>
          <Footer />
        </body>
      </StoreProvider>
    </html>
  );
}

<div className="min-h-screen w-full relative">
  {/* Aurora Dream Corner Whispers */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: `
        radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
            linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `,
    }}
  />
  {/* Your content goes here */}
</div>;
