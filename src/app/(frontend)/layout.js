import Sidebar from "@/components/Sidebar";

export default function BackgroundPage({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto lg:px-4 px-0 lg:py-8 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 gap-0">
          <Sidebar />
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
