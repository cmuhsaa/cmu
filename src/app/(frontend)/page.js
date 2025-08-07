import { getPaginatedEvents } from "@/lib/getDatas";
import { getPaginatedGalleries } from "@/lib/getDatas";
import { getPaginatedNotices } from "@/lib/getDatas";
import { getPaginatedPosts } from "@/lib/getDatas";
import { getPaginatedStudents } from "@/lib/getDatas";

import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import NoticeSection from "@/components/NoticeSection";
import PostsSection from "@/components/PostsSection";
import NewMemberSection from "@/components/NewMemberSection";

export const dynamic = "force-static"; // Optional: forces static + ISR

export default async function Home() {
  const [
    { events, total: eventTotal },
    { galleries },
    { notices },
    { posts },
    { students, total },
  ] = await Promise.all([
    getPaginatedEvents({ page: 1, limit: 2 }),
    getPaginatedGalleries({ page: 1, limit: 2 }),
    getPaginatedNotices({ page: 1, limit: 7 }),
    getPaginatedPosts({ page: 1, limit: 2 }),
    getPaginatedStudents({ page: 1, limit: 2, isActive: true }),
  ]);

  return (
    <main className="shadow-xl rounded">
      <HeroSection
        total={total}
        eventTotal={eventTotal}
        schoolName="Chanchaitara Madla United High School"
      />
      <NoticeSection notices={JSON.parse(JSON.stringify(notices))} />
      <div className="w-full bg-[#faf9f6] relative">
        {/* Paper Texture */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
      `,
            backgroundSize: "8px 8px, 32px 32px, 32px 32px",
          }}
        />
        {/* Your Content/Components */}
        <EventsSection events={JSON.parse(JSON.stringify(events))} />
      </div>
      <GallerySection gallery={JSON.parse(JSON.stringify(galleries))} />
      <PostsSection posts={JSON.parse(JSON.stringify(posts))} />
      <NewMemberSection members={JSON.parse(JSON.stringify(students))} />
    </main>
  );
}
