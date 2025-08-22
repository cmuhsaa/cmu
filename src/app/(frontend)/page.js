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
  const [{ events }, { galleries }, { notices }, { posts }, { students }] =
    await Promise.all([
      getPaginatedEvents({ page: 1, limit: 2 }),
      getPaginatedGalleries({ page: 1, limit: 2 }),
      getPaginatedNotices({ page: 1, limit: 7 }),
      getPaginatedPosts({ page: 1, limit: 2 }),
      getPaginatedStudents({
        page: 1,
        limit: 2,
        isActive: true,
        sortBy: "createDate",
        sortOrder: "desc",
      }),
    ]);

  return (
    <main className="shadow-xl bg-white/40 rounded-xl overflow-hidden">
      <HeroSection schoolName="সরকারি চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয়" />
      <EventsSection events={JSON.parse(JSON.stringify(events))} />
      <NoticeSection notices={JSON.parse(JSON.stringify(notices))} />
      <GallerySection gallery={JSON.parse(JSON.stringify(galleries))} />
      <PostsSection posts={JSON.parse(JSON.stringify(posts))} />
      <NewMemberSection members={JSON.parse(JSON.stringify(students))} />
    </main>
  );
}
