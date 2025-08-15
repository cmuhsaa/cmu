import { Geist, Geist_Mono, Roboto_Condensed } from "next/font/google";
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

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-condensed",
});

export const metadata = {
  title:
    "Govt. Chachaitara Madla United High School Alumni Association | সরকারি চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয় এলামনাই অ্যাসোসিয়েশন",
  description:
    "Government Chachaitara Madla United High School Alumni Association ( সরকারি চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয় প্রাক্তন শিক্ষার্থী সমিতি) brings together alumni, preserves memories, builds friendships, and supports community growth through events and social initiatives. প্রাক্তন ছাত্রছাত্রীদের মিলন, স্মৃতিচারণ, বন্ধুত্ব ও সমাজ উন্নয়ন একসাথে।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          property="og:title"
          content="Chachaitara Madla United High School Alumni Association | চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয় এলামনাই অ্যাসোসিয়েশন"
        />
        <meta
          property="og:description"
          content="Chachaitara Madla United High School Alumni Association ( চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয় প্রাক্তন শিক্ষার্থী সমিতি ) brings together alumni, preserves memories, builds friendships, and supports community growth through events and social initiatives. প্রাক্তন ছাত্রছাত্রীদের মিলন, স্মৃতিচারণ, বন্ধুত্ব ও সমাজ উন্নয়ন একসাথে।"
        />
        <meta
          property="og:image"
          content="https://www.cmu-alumni.com/og-image.png"
        />
        <meta property="og:url" content="https://www.cmu-alumni.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Chachaitara Madla United High School Alumni Association | চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয় এলামনাই অ্যাসোসিয়েশন"
        />
        <meta
          name="twitter:description"
          content="Chachaitara Madla United High School Alumni Association ( চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয় প্রাক্তন শিক্ষার্থী সমিতি ) brings together alumni, preserves memories, builds friendships, and supports community growth through events and social initiatives. প্রাক্তন ছাত্রছাত্রীদের মিলন, স্মৃতিচারণ, বন্ধুত্ব ও সমাজ উন্নয়ন একসাথে।"
        />
        <meta
          name="twitter:image"
          content="https://www.cmu-alumni.com/og-image.png"
        />
        <meta
          name="google-site-verification"
          content="IiHLaPPFMPq69YZrzoKYfBvJ20M63oT21KT4pX5df60"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />
      </head>
      <StoreProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} antialiased`}
          style={{
            backgroundImage: "url('/1920.png')",
            backgroundPosition: "fixed",
            backgroundSize: "Cover",
            backgroundAttachment: "fixed",
          }}
        >
          <Toast />
          <main className="mx-auto min-h-screen backdrop-blur-[30px]">
            {children}
          </main>
          <Footer />
        </body>
      </StoreProvider>
    </html>
  );
}

//       style={{
//         background: `
//     /* Paper texture (on top) */
//     radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
//     repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
//     repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),

//     /* Aurora gradient (underneath) */
//     radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.31), transparent 60%),
//         radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
//         radial-gradient(ellipse 70% 60% at 15% 80%, rgba(100, 255, 221, 0.4), transparent 62%),
//         radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
//         linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
//   `,
//         backgroundSize: `
//   8px 8px, 32px 32px, 32px 32px,
//   auto, auto, auto, auto, auto
// `,
//         backgroundAttachment: `
//   fixed, fixed, fixed,
//   fixed, fixed, fixed, fixed, fixed
// `,
//       }}
