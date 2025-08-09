import Committee from "@/components/Committee";
import Sidebar from "@/components/Sidebar";

export default function BackgroundPage({ children }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto xl:px-4 px-0 xl:py-8 py-0 max-w-[1440px] mx-auto ">
        <div className="grid grid-cols-1 xl:grid-cols-5 xl:gap-8 gap-0">
          <Sidebar />
          <div className="xl:col-span-3">{children}</div>
          <div className="xl:col-span-1">
            <Committee />
          </div>
        </div>
      </div>
    </div>
  );
}
