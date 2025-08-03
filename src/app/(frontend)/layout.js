import Sidebar from "@/components/Sidebar";

export default function BackgroundPage({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar />
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
